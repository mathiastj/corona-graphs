import React, { Component } from "react";
import {
  Legend,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

class CoronaChart extends Component {

  render() {
    const { dataPoints } = this.props;
    console.log(dataPoints)

    if (!dataPoints) {
      return null;
    }

    const data = dataPoints

    return (
      <ResponsiveContainer height={800} className="chart-container">
        <LineChart
          width={800}
          height={800}
          data={data}
          margin={{ top: 100, right: 100, left: 100, bottom: 100 }}
        >
          <XAxis
            dataKey="date"
            textAnchor="end"
            tick={{ angle: -70 }}
            height={150}
          />

          <YAxis
            dataKey="totalCases"
            domain={[0, "auto"]}
            width={80}
          >
             <Label value="Persons" angle={-90} position="left" offset={25} style={{ textAnchor: 'middle', fontSize: '80%', fill: 'rgba(200, 200, 0, 0.70)' }}></Label>
          />
          </YAxis>
          <Tooltip
            wrapperStyle={{
              borderColor: "white",
              boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)"
            }}
            // formatter={(value, name, props) => {
            //   return [rankFormatter(value)];
            // }}
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            labelStyle={{ fontWeight: "bold", color: "#666666" }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Line
            name="Daily confirmed cases"
            type="monotone"
            dataKey="newCases"
            stroke="#ff7300"
            yAxisId={0}
          />
          <Line
            name="Total confirmed cases"
            type="monotone"
            dataKey="totalCases"
            stroke="#ff00ff"
            yAxisId={0}
          />
          <Line
            name="Daily confirmed deaths"
            type="monotone"
            dataKey="newDeaths"
            stroke="#ffff00"
            yAxisId={0}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default CoronaChart;
