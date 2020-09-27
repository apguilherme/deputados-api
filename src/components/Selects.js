import React from 'react'

export default function Selects({ colunas, xCol, yCol, setXcol, setYcol, plotType, setPlotType }) {

    const columns = colunas.map(c => <option key={c} value={c}>{c}</option>)

    columns.splice(0, 0, <option key='Escolher...' value='Escolher...'>Escolher...</option>) // insere na posição 0

    return (
        <>
            <div>
                <label>eixo x</label>
                <select value={xCol} onChange={e => setXcol(e.target.value)}>{columns}</select>
            </div>
            <div>
                <label>eixo y</label>
                <select value={yCol} onChange={e => setYcol(e.target.value)}>{columns}</select>
            </div>
            <div>
                <label>tipo</label>
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
