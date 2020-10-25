import React from 'react'
import { Typography } from '@material-ui/core'

export default function Sobre() {

    return (
        <>
            <h2>Sobre este projeto</h2>
            <h4>Frontend desenvolvido em ReactJS e Material-UI consumindo a API dos Dados Abertos da Câmara dos Deputados. </h4>

            <p>Fonte de dados, API:</p>
            <Typography variant="body2" color="textSecondary" component="a"  rel="noopener noreferrer" target="_blank" href='https://dadosabertos.camara.leg.br/swagger/api.html'>
                https://dadosabertos.camara.leg.br/swagger/api.html
            </Typography>

        </>
    )
}