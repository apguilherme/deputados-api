import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Dialog, AppBar, Toolbar, Typography, Slide, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Link, Avatar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';

import Loading from '../components/Loading'

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

            let deputadoIdUrl = `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputadoId}/despesas?ordem=ASC&ordenarPor=ano`

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
                                        <TableCell>Valor Documento (R$)</TableCell>
                                        <TableCell>Valor Glosa (R$)</TableCell>
                                        <TableCell>Valor Líquido (R$)</TableCell>
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
                                            <TableCell>{g.valorDocumento.toFixed(2)}</TableCell>
                                            <TableCell>{g.valorGlosa.toFixed(2)}</TableCell>
                                            <TableCell>{g.valorLiquido.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </>
                }

            </Dialog>

        </div>
    )
}
