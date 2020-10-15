import React from 'react'

export default function Sobre(){

    return(
        <>
            <h2>Sobre este projeto</h2>
            <h4>Frontend desenvolvido em ReactJS e Material-UI consumindo a API dos Dados Abertos da Câmara dos Deputados. </h4>
            <p>Em breve:</p>
            <ul>
                <li>Geração de gráficos a partir dos registros de pagamentos e reembolsos da "cota parlamentar" para cada deputado, para os últimos 4 anos</li>
                <li>Listagem em tabela desses registros para cada deputado, para os últimos 4 anos</li>
                <li>... atualmente a tabela apresenta registros dos últimos 6 meses</li>
                <li>Alguns links para notas fiscais estão quebrados (?)</li>
                <li>Gerar relatório em PDF sobre o deputado</li>
                <li>Melhorar desempenho na renderização dos cards (513 cards)</li>
            </ul>
            <p>Fonte de dados, API:</p>
            <a href='https://dadosabertos.camara.leg.br/swagger/api.html' rel="noopener noreferrer" target="_blank">
                https://dadosabertos.camara.leg.br/swagger/api.html
            </a>        
        </>
    )
}