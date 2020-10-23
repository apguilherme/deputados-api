import React, { useEffect, useState } from 'react'
import { makeStyles, Button, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

import Loading from '../components/Loading'
import SelectComponent from '../components/SelectComponent'
import DeputadoCard from '../components/DeputadoCard'
import DeputadoDetail from '../components/DeputadoDetail'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(4),
        minWidth: 120,
    },
    alert: {
        margin: theme.spacing(2),
    },
    root: {
        margin: theme.spacing(4),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))

export default function Gov() {

    const classes = useStyles()

    // states para feedback
    const [isLoading, setIsLoading] = useState(false)
    const [erro, setErro] = useState('')

    // states para apresentação de dados em tela
    const [uf, setUf] = useState('Todos') // estado brasileiro selecionado no select
    const [sigla, setSigla] = useState('Todos') // partido político selecionado no select
    const [deputados, setDeputados] = useState([]) // dados dos deputados buscados com api (todos 513 deputados) 
    const [lista, setLista] = useState([]) // listagem de deputados a partir dos filtros dos selects 
    const [currentPage, setCurrentPage] = useState(1) // página atual, definida a partir da page de BasicPagination
    const [deputadoId, setDeputadoId] = useState('') // recebe o ID do deputado para ser mostrado em detalhes

    // states para filtros com selects
    const [partidos, setPartidos] = useState(['Todos']) // partidos buscados com api
    const estados = ['Todos', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'] // estados brasileiros
    const itemsPerPage = 8 // quantidade de itens da lista em cada página apresentada


    useEffect(() => { // faz chamada à API do governo, caso ainda não exista 'deputadosapi' e 'partidosapi' no localStorage

        let depsLocal = JSON.parse(localStorage.getItem('deputadosapi'))
        let partsLocal = JSON.parse(localStorage.getItem('partidosapi'))

        if (depsLocal !== null && depsLocal.length > 0 &&
            partsLocal !== null && partsLocal.length > 0) {
            setDeputados(depsLocal)
            setPartidos(partsLocal)
        }
        else {
            getDadosGovAPI()
        }
    }, [])

    useEffect(() => { // atualiza listagem de cards quando 'deputados' é alterado

        if (deputados.length > 0) {
            updateListagem(deputados)
        }

    }, [deputados])


    function updateListagem(values) { // gera os cards para listagem em tela, altera 'lista'

        setLista(values.map(dado => (
            <DeputadoCard
                key={dado.id}
                variant="contained"
                id={dado.id}
                nome={dado.nome}
                siglaPartido={dado.siglaPartido}
                siglaUf={dado.siglaUf}
                urlFoto={dado.urlFoto}
                setDeputadoId={setDeputadoId}
            />
        )))

    }

    async function getDadosGovAPI() { // busca deputados e siglas dos partidos, e os coloca no localStorage

        setIsLoading(true)

        let depsUrl = `https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome`
        let partsUrl = `https://dadosabertos.camara.leg.br/api/v2/partidos?itens=200&ordem=ASC&ordenarPor=sigla`

        await fetch(depsUrl) // deputados
            .then(async response => {
                await response.json().then(data => {
                    setDeputados(data.dados)
                    localStorage.setItem('deputadosapi', JSON.stringify(data.dados))
                })
            })
            .catch(function (err) { setErro(err.message) })

        await fetch(partsUrl) // partidos políticos
            .then(async response => {
                await response.json().then(data => {
                    let subData = data.dados.map(d => d.sigla)
                    setPartidos([...partidos, ...subData])
                    localStorage.setItem('partidosapi', JSON.stringify([...partidos, ...subData]))
                })
            })
            .catch(function (err) { setErro(err.message) })

        setIsLoading(false)

    }

    function filtrarDadosGovAPI() { // filtragem de deputados baseada nos selects

        setIsLoading(true)

        if (deputados.length > 0) { // se já existirem dados de deputados

            let subDados = [] // conjunto de deputados selecionados pelos filtros

            if (uf === 'Todos' && sigla === 'Todos') { // sem filtros selecionados
                subDados = deputados
            }
            else { // filtros selecionados
                subDados = deputados.filter(dado => { // filtra array
                    if (uf !== 'Todos' && sigla !== 'Todos') { // filtrar sigla e uf
                        return dado.siglaUf === uf && dado.siglaPartido === sigla
                    }
                    else if (uf === 'Todos' && sigla !== 'Todos') { // filtrar apenas sigla
                        return dado.siglaPartido === sigla
                    }
                    else if (uf !== 'Todos' && sigla === 'Todos') { // filtrar apenas uf
                        return dado.siglaUf === uf
                    }
                })
                setCurrentPage(1) // define volta para primeira página
            }

            updateListagem(subDados) // lista dados filtrados

        }

        setIsLoading(false)

    }

    
    return (
        <>
            {!isLoading && erro.length === 0 && // apresenta opções de select para filtrar deputados
                <div className={classes.root}>
                    <SelectComponent label={"UF"} menuItems={estados} value={uf} setOnChange={setUf} />
                    <SelectComponent label={"Partido"} menuItems={partidos} value={sigla} setOnChange={setSigla} />
                    <Button variant="outlined" onClick={filtrarDadosGovAPI} className={classes.formControl}>Filtrar</Button>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Resultado: {lista.length} deputados(as).
                    </Typography>
                </div>
            }

            {
                isLoading && // feedback visual do processamento
                <Loading />
            }

            {
                erro.length > 0 && // apresenta erro caso exista
                <Alert severity="error" className={classes.alert}>{erro}</Alert>
            }

            {
                !isLoading && lista.length > 0 && partidos.length > 1 && // >1 pois a princípio existe o 'Todos' no array
                <>
                    <div className={classes.root}>
                        {lista.slice(currentPage*itemsPerPage-itemsPerPage, currentPage*itemsPerPage)} 
                    </div>
                    <div className={classes.root}>
                        <Pagination 
                            defaultPage={1} 
                            count={Math.ceil(lista.length/itemsPerPage)} 
                            color='standard' 
                            onChange={(event, page) => setCurrentPage(page)} 
                        />
                    </div>
                </>
            }

            {
                deputadoId !== '' && // abre o detalhe do deputado se existir um valor pra deputadoId
                <DeputadoDetail deputadoId={deputadoId} setDeputadoId={setDeputadoId} deputados={deputados} />
            }

        </>
    )
}
