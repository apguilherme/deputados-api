import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import './App.css'
import Selects from './components/Selects'
import Plot from './components/Plot'

function App() {

  const [data, setData] = useState([])
  const [fileName, setFileName] = useState('')
  const [xCol, setXcol] = useState('')
  const [yCol, setYcol] = useState('')
  const [plotType, setPlotType] = useState('')

  useEffect(() => {
    // todo: alterar dados nas tags select
  }, [data])

  useEffect(() => {
    // todo: alterar dados no grafico
  }, [xCol])

  useEffect(() => {
    // todo: alterar dados no grafico
  }, [yCol])


  function getCsv(e) {
    const url = URL.createObjectURL(e.target.files[0])
    setFileName(e.target.files[0].name)
    setXcol('')
    setYcol('')
    d3.csv(url).then(file => {
      setData(file)
      URL.revokeObjectURL(url) // free memory
    })
  }


  return (
    <div className="thepage">

      <div className="menu">
        <input
          className="inputfile"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={e => getCsv(e)}
        />
        {
          data.length>0
          && <Selects colunas={data.columns} xCol={xCol} yCol={yCol} setXcol={setXcol} setYcol={setYcol} plotType={plotType} setPlotType={setPlotType} />
        }
      </div>
      {
        xCol.length>0 && yCol.length>0 && plotType.length>0
        && <Plot data={data} xCol={xCol} yCol={yCol} fileName={fileName} plotType={plotType} />
      }

    </div>
  )
}

export default App
