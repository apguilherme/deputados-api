import React from "react";
import { VictoryPie, VictoryBar } from "victory"

export default function Plot({ gastos, plotType }) {

    // formatação dos dados para plotagem

    const fornecedores = [...new Set(gastos.map(g => g.nomeFornecedor))] // valores únicos de fornecedores, sem repetição
    const gastosAgrupados = []

    for (let i = 0; i < fornecedores.length; i++) { // para cada fornecedor
        var somatorio = 0 // zera os gastos para o fornecedor
        var temp = { x: '', y: 0 }
        for (let j = 0; j < gastos.length; j++) { // para cada gasto
            if (gastos[j].nomeFornecedor === fornecedores[i]) { // se gasto for do fornecedor atual
                somatorio += gastos[j].valorLiquido // soma gasto
            }
        }
        temp.x = String(fornecedores[i])
        temp.y = somatorio
        gastosAgrupados.push(temp)
    }
    gastosAgrupados.sort((a, b) => a.y - b.y)

    return (
        <>
            {
                plotType === 'Pizza' &&
                <VictoryPie
                    height={200}
                    width={300}
                    colorScale="qualitative"
                    style={{ labels: { fontSize: 5 } }}
                    standlone={false}

                    data={gastosAgrupados}
                    labels={({ datum }) => `${datum.x}: ${datum.y.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
                />
            }
            {
                plotType === 'Barras' &&
                <VictoryBar
                    height={200}
                    width={300}
                    colorScale="qualitative"
                    style={{ labels: { fontSize: 5 } }}
                    standlone={false}

                    data={gastosAgrupados}
                    labels={({ datum }) => `${datum.x}: ${datum.y.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}
                />
            }
        </>
    )
}
