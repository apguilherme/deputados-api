import React from "react";
import {
    VictoryLine,
    VictoryScatter,
    VictoryBar,
    VictoryChart,
    VictoryLabel,
    VictoryAxis
} from "victory";

export default function Plot({ data, xCol, yCol, fileName, plotType }) {

    const mycolumns = data.map(function (d) {
        return {
            x: isNaN(d[xCol]) ? d[xCol] : +d[xCol], // verifica se é número
            y: +d[yCol]
        }
    });

    /* para editar range dos eixos...
    var xMax = d3.max(mycolumns, function (d) { return d['x'] });
    var xMin = d3.min(mycolumns, function (d) { return d['x'] });
    var yMax = d3.max(mycolumns, function (d) { return d['y'] });
    var yMin = d3.min(mycolumns, function (d) { return d['y'] });
    <VictoryChart domain={{ x: [xMin, xMax], y: [yMin, yMax] }}>
    */

    return (
        <div>

            {
                isNaN(mycolumns[0].y)
                && <p>Valores para o eixo Y devem ser numéricos.</p>
            }

            {
                !isNaN(mycolumns[0].y) && xCol !== "Escolher..." && yCol !== "Escolher..." && plotType !== "Escolher..." &&
                <div className="plotstyle">
                    <VictoryChart>
                        <VictoryLabel
                            text={`${fileName}`}
                            x={225}
                            y={30}
                            textAnchor="middle"
                        />
                        <VictoryAxis
                            label={xCol}
                        />
                        <VictoryAxis
                            dependentAxis
                            label={yCol}
                        />

                        {plotType === 'Scatter' && <VictoryScatter data={mycolumns} />}
                        {plotType === 'Line' && <VictoryLine data={mycolumns} />}
                        {plotType === 'Bar' && <VictoryBar data={mycolumns} />}

                    </VictoryChart>
                </div>
            }

        </div>
    );
}
