import React from 'react'

export default function Selects({ colunas, xCol, yCol, setXcol, setYcol, plotType, setPlotType }) {

    const columns = colunas.map(c => <option key={c} value={c}>{c}</option>) // cria opções para os selects

    columns.splice(0, 0, <option key='Escolher' value='Escolher...'>Escolher...</option>) // insere valor default na posição 0

    return (
        <>
            <div>
                <label>x</label>
                <select value={xCol} onChange={e => setXcol(e.target.value)}>{columns}</select>
            </div>
            <div>
                <label>y</label>
                <select value={yCol} onChange={e => setYcol(e.target.value)}>{columns}</select>
            </div>
            <div>
                <label>gráfico</label>
                <select value={plotType} onChange={e => setPlotType(e.target.value)}>
                    <option key='Escolher' value='Escolher...'>Escolher...</option>
                    <option key='Scatter' value='Scatter'>Scatter</option>
                    <option key='Line' value='Line'>Line</option>
                    <option key='Bar' value='Bar'>Bar</option>
                </select>
            </div>
        </>
    )
}
