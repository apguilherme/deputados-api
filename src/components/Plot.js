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

    var mycolumns = {}
    if (plotType === 'Bar') {
        mycolumns = data.map(function (d) {
            return { x: d[xCol], y: +d[yCol] }
        });
    }
    else {
        mycolumns = data.map(function (d) {
            return {
                x: +d[xCol],
                y: +d[yCol]
            }
        });
    }

    /* para range dos eixos...
    var xMax = d3.max(mycolumns, function (d) { return d['x'] });
    var xMin = d3.min(mycolumns, function (d) { return d['x'] });
    var yMax = d3.max(mycolumns, function (d) { return d['y'] });
    var yMin = d3.min(mycolumns, function (d) { return d['y'] });
    <VictoryChart domain={{ x: [xMin, xMax], y: [yMin, yMax] }}>
    */


    return (
        <div>
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
    );
}