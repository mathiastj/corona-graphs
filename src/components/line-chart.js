import React, { Component } from "react";
import {
  Legend,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Surface, 
  Symbols,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

class CoronaChart extends Component {
  constructor(props) {
    super(props)
    this.state = { disabled: [], chartLines: [
      { dataKey: 'newCases', color: '#ff7300', label: 'Daily confirmed deaths'},
      { dataKey: 'newDeaths', color: '#ffff00', label: 'Daily confirmed cases'},
      { dataKey: 'totalCases', color: '#ff00ff', label: 'Total confirmed cases'}
    //,{totalDeaths: ''}
    ]}
  }

  handleClick(dataKey) {
    console.log(dataKey)
    if (this.state.disabled.includes(dataKey)) {
      this.setState({disabled: this.state.disabled.filter(obj => obj !== dataKey)})
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  }

  renderCustomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { dataKey, color } = entry;
          const active = this.state.disabled.includes(dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#AAA" : "#000"
          };

          return (
            <span
              className="legend-item"
              onClick={() => this.handleClick(dataKey)}
              style={style}
            >
              <Surface width={10} height={10}>
                <Symbols cx={5} cy={5} type="circle" size={50} fill={color} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{dataKey}</span>
            </span>
          );
        })}
      </div>
    );
  };

  render() {
    const { dataPoints } = this.props;
    // console.log(dataPoints)

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
          margin={{ top: 25, right: 25, left: 50, bottom: 25 }}
        >
          {
            this.state.chartLines.filter(chartLine => !this.state.disabled.includes(chartLine.dataKey)).map(chartLine =>
              <Line
                name={chartLine.label}
                type="monotone"
                dataKey={chartLine.dataKey}
                stroke={chartLine.color}
                yAxisId={0}
              />
              )
          }
          <XAxis
            dataKey="date"
            textAnchor="end"
            tick={{ angle: -70 }}
            height={225}
          />

          <YAxis
            dataKey="totalCases"
            domain={[0, "auto"]}
            width={80}
          >
             <Label value="Persons" angle={-90} position="insideBottomLeft" offset={1} style={{ fontSize: '80%', fill: 'rgba(200, 200, 0, 0.70)' }}></Label>
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
          <Legend verticalAlign="top" height={36} content={this.renderCustomizedLegend} 
            payload={this.state.chartLines.map(chartLine => ({dataKey: chartLine.dataKey, color: chartLine.color}))}/>
          {/* <Line
            name="Daily confirmed cases"
            type="monotone"
            dataKey="newCases"
            stroke="#ff7300"
            yAxisId={0}
          /> */}
          {/* <Line
            name="Total confirmed cases"
            type="monotone"
            dataKey="totalCases"
            stroke="#ff00ff"
            yAxisId={0}
          /> */}
          {/* <Line
            name="Daily confirmed deaths"
            type="monotone"
            dataKey="newDeaths"
            stroke="#ffff00"
            yAxisId={0}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default CoronaChart;
