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

const prioritizedDataKeys = ['totalCases', 'newCases', 'totalDeaths','newDeaths']

class CoronaChart extends Component {
  constructor(props) {
    super(props)
    this.state = { disabled: ['totalCases', 'totalDeaths'], chartLines: [
      { dataKey: 'newCases', color: '#ff7300', label: 'Daily cases'},
      { dataKey: 'newDeaths', color: '#ffff00', label: 'Daily deaths'},
      { dataKey: 'totalCases', color: '#ff00ff', label: 'Total cases'},
      { dataKey: 'totalDeaths', color: '#34c3eb', label: 'Total Deaths'}
    ],
    scale: 'linear'}
  }

  handleClick(dataKey) {
    if (this.state.disabled.includes(dataKey)) {
      this.setState({disabled: this.state.disabled.filter(obj => obj !== dataKey)})
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  }


  handleOptionChange(scale) {
    console.log(scale)
    this.setState({
      scale
    });
    this.forceUpdate()
  }



  renderCustomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { dataKey, color, label } = entry;
          const active = this.state.disabled.includes(dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#000" : "#AAA"
          };

          return (
            <span
              className="legend-item"
              onClick={() => this.handleClick(dataKey)}
              style={style}
            >
              <Surface width={20} height={20}>
                <Symbols cx={10} cy={10} type="circle" size={50} fill={color} />
                {active && (
                  <Symbols
                    cx={10}
                    cy={10}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{label}</span>
            </span>
          );
        })}
      </div>
    );
  };

  render() {
    const { dataPoints } = this.props;

    if (!dataPoints) {
      return null;
    }

    const data = dataPoints

    return (
      <div>
        <div style={{marginBottom: -10}}>
          <span
            onClick={() => this.handleOptionChange("linear")}>
            <input type="radio" id="linear" name="scale" value="linear" checked={this.state.scale === 'linear'} />
            <span style={{color: "#AAA"}}>Linear</span>
          </span>
          <span
            onClick={() => this.handleOptionChange("log")}>
            <input type="radio" id="log" name="scale" value="log" checked={this.state.scale === 'log'}/>
            <span style={{color: "#AAA"}}>Log</span>
          </span>
        </div>
      <ResponsiveContainer height={800} className="chart-container">
        <LineChart
          width={800}
          height={800}
          data={data}
          margin={{ top: 25, right: 25, left: 40, bottom: 25 }}
          >
          {
            this.state.chartLines.filter(chartLine => !this.state.disabled.includes(chartLine.dataKey)).map(chartLine =>
              <Line
              connectNulls
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
            tick={{ angle: -70, fontSize: 20 }}
            height={225}
            />

          <YAxis
            dataKey={prioritizedDataKeys.filter(dataKey => !this.state.disabled.includes(dataKey))[0]}
            domain={this.state.scale === 'log' ? [1, 'dataMax'] : [0, 'dataMax']}
            tick={{ fontSize: 20 }}
            width={40}
            scale={this.state.scale}
            allowDataOverflow
            >
             {/* <Label value="Persons" angle={-90} position="insideBottomLeft" offset={1} style={{ fontSize: '80%', fill: 'rgba(0, 204, 102, 0.70)' }}></Label> */}
          />
          </YAxis>
          <Tooltip
            formatter={(value, name) => (value === null) ? 0 : value}
            filterNull={false}
            wrapperStyle={{
              borderColor: "white",
              boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)"
            }}
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            labelStyle={{ fontWeight: "bold", color: "#666666" }}
            />
          <Legend verticalAlign="top" height={36} content={this.renderCustomizedLegend} 
            payload={this.state.chartLines}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
    );
  }
}

export default CoronaChart;
