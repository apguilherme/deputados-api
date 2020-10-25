import React from "react";
import { VictoryPie } from "victory"

export default function Plot({ gastos }) {

    const fornecedores = [...new Set(gastos.map(g => g.nomeFornecedor))] // valores únicos, sem repetição
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
        temp.y = somatorio.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        gastosAgrupados.push(temp)
    }

    return (
        <VictoryPie
            height={200}
            width={300}
            colorScale="qualitative"
            style={{ labels: { fontSize: 5 } }}
            standlone={false}

            data={gastosAgrupados}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
        />
    )
}
