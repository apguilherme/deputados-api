import React, { useState } from 'react'
import * as d3 from 'd3'
import './App.css'
import Selects from './components/Selects'
import Plot from './components/Plot'

/*
- salvar no mongodb o email e uma configuração de gráfico (valores das colunas x e y, titulos e nomes das colunas, tipo de gráfico, tema de cores). Cada email pode ter vários plots

- usuário pode entrar na aba dele (basta fornecer seu email) e ver seus gráficos

- Front lista plots do email e ao clicar o useState atualiza as variáveis passadas para gerar o Plot

- Limitar quantidade de linhas usadas (performance)

- Gerar PDF da página react

- Permitir request pra url de um gráfico: www.app.com/myemailATokDOTcom/IDmyplot001
*/

function App() {

  const [data, setData] = useState([]) // arquivo do usuário
  const [fileName, setFileName] = useState('') // nome do arquivo
  const [xCol, setXcol] = useState('') // nome da coluna selecionada para o eixo x
  const [yCol, setYcol] = useState('') // nome da coluna selecionada para o eixo y
  const [plotType, setPlotType] = useState('') // tipo de gráfico


  function getFile(e) { // recebe o upload de arquivo do usuário
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
          onChange={e => getFile(e)}
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
