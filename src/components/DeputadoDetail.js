import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, AppBar, Toolbar, Typography, Slide, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Link, Avatar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PieChartIcon from '@material-ui/icons/PieChart';
import Alert from '@material-ui/lab/Alert';

import PieDialog from './PieDialog'
import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    avatar: {
        borderRadius: '50%',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function DeputadoDetail({ deputadoId, setDeputadoId, deputados }) {

    const classes = useStyles()

    const [isLoading, setIsLoading] = useState(false)
    const [erro, setErro] = useState('')
    const [gastos, setGastos] = useState([])
    const [escolhido, setEscolhido] = useState('')
    const [isPlot, setIsPlot] = useState(false)

    useEffect(() => { // executa busca na api sempre que deputadoId mudar

        getGastosAPI(deputadoId)

    }, [deputadoId])

    async function getGastosAPI(deputadoId) { // busca os gastos do deputadoId

        if (deputadoId === '') {
            return
        }
        else {

            setIsLoading(true)
            setErro('')

            let anos = `ano=2020` //&ano=2019&ano=2018&ano=2017
            let deputadoIdUrl = `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/despesas?${anos}&ordem=DESC&ordenarPor=ano`

            await fetch(deputadoIdUrl)
                .then(async response => {
                    await response.json().then(data => {
                        setGastos(data.dados) // gastos do deputadoId
                        let esc = deputados.filter(dep => dep.id === deputadoId)[0] // deputadoId em questão
                        setEscolhido(esc)
                    })
                })
                .catch(function (err) { setErro(err.message) })

            setIsLoading(false)

        }

    }

    function handleClose() { // limpa

        setDeputadoId('')
        setEscolhido('')

    }

    function showPie(){
        setIsPlot(!isPlot)
    }

    return (

        // só abre o Dialog caso deputadoId seja alterado para um valor diferente de vazio

        <div>

            <Dialog fullScreen open={(deputadoId !== '') ? true : false} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Cota parlamentar
                        </Typography>
                        <Avatar alt={escolhido.nome} src={escolhido.urlFoto} className={classes.avatar} />
                        <Typography variant="h6" className={classes.title}>
                            {escolhido.nome} ({escolhido.siglaUf}) - {escolhido.siglaPartido}
                        </Typography>
                        {
                            !isLoading && 
                            <Button autoFocus color="inherit" onClick={showPie}><PieChartIcon /> Gráfico</Button>
                        }
                        <Button autoFocus color="inherit" onClick={handleClose}><CloseIcon /> Fechar</Button>
                    </Toolbar>
                </AppBar>

                {
                    isLoading &&
                    <Loading />
                }

                {
                    erro.length > 0 &&
                    <Alert severity="error" className={classes.alert}>{erro}</Alert>
                }

                {
                    !isLoading && erro.length === 0 &&
                    <>

                        <TableContainer component={Paper}>
                            <Table aria-label='Registros de pagamentos e reembolsos da cota parlamentar' size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Fornecedor</TableCell>
                                        <TableCell>CNPJ</TableCell>
                                        <TableCell>Tipo Despesa</TableCell>
                                        <TableCell>Tipo Documento</TableCell>
                                        <TableCell>Link Documento</TableCell>
                                        <TableCell>Valor Documento</TableCell>
                                        <TableCell>Valor Glosa</TableCell>
                                        <TableCell>Valor Líquido</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gastos.map(g => (
                                        <TableRow key={g.codDocumento}>
                                            <TableCell>{g.dataDocumento}</TableCell>
                                            <TableCell>{g.nomeFornecedor}</TableCell>
                                            <TableCell>{g.cnpjCpfFornecedor}</TableCell>
                                            <TableCell>{g.tipoDespesa}</TableCell>
                                            <TableCell>{g.tipoDocumento}</TableCell>
                                            <TableCell>
                                                <Link href={g.urlDocumento} target="_blank" rel="noopener noreferrer">
                                                    <Button size="small" variant="contained" color="primary">Abrir</Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{g.valorDocumento.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                                            <TableCell>{g.valorGlosa.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                                            <TableCell>{g.valorLiquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </>
                }

            </Dialog>
            
            {
                isPlot && !isLoading &&
                <PieDialog gastos={gastos} isPlot={isPlot} setIsPlot={setIsPlot} escolhido={escolhido} />
            }

        </div >
    )
}
