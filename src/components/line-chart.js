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

const distinguishableColors = [
  '#FFFFFF',
  '#F0A3FF',
  '#0075DC',
  '#993F00',
  '#4C005C',
  '#191919',
  '#005C31',
  '#2BCE48',
  '#FFCC99',
  '#808080',
  '#94FFB5',
  '#8F7C00',
  '#9DCC00',
  '#C20088',
  '#003380',
  '#FFA405',
  '#FFA8BB',
  '#426600',
  '#FF0010',
  '#5EF1F2',
  '#00998F',
  '#E0FF66',
  '#740AFF',
  '#990000',
  '#FFFF80',
  '#FFFF00',
  '#FF5005'
]

const calcPrioritizedKeys = (dataMap) => {
  console.log(dataMap)
  const maxPerDataKey = {}
  for (const [country, data] of Object.entries(dataMap)) {
    console.log(country)
    maxPerDataKey[`newCases${country}`] = 0
    maxPerDataKey[`totalCases${country}`] = 0
    maxPerDataKey[`totalDeaths${country}`] = 0
    maxPerDataKey[`newDeaths${country}`] = 0
    for (const entry of data) {
      if (entry[`newCases${country}`] > maxPerDataKey[`newCases${country}`]) {
        maxPerDataKey[`newCases${country}`] = entry[`newCases${country}`]
      }
      if (entry[`totalCases${country}`] > maxPerDataKey[`totalCases${country}`]) {
        maxPerDataKey[`totalCases${country}`] = entry[`totalCases${country}`]
      }
      if (entry[`totalDeaths${country}`] > maxPerDataKey[`totalDeaths${country}`]) {
        maxPerDataKey[`totalDeaths${country}`] = entry[`totalDeaths${country}`]
      }
      if (entry[`newDeaths${country}`] > maxPerDataKey[`newDeaths${country}`]) {
        maxPerDataKey[`newDeaths${country}`] = entry[`newDeaths${country}`]
      }
    }
  }
  const sortedKeys = Object.keys(maxPerDataKey).map(key => {
    return {key, value: maxPerDataKey[key]}
  // Sort descending on value
  }).sort((a, b) => {
    return b.value - a.value
  })
  return sortedKeys.map(sorted => sorted.key)
}

class CoronaChart extends Component {
  constructor(props) {
    super(props) 
    this.state = {scale: 'linear'}
  }

  handleClick(dataKey) {
    if (this.state.disabled.includes(dataKey)) {
      this.setState({disabled: this.state.disabled.filter(obj => obj !== dataKey)})
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  }


  handleOptionChange(scale) {
    this.setState({
      scale
    });
    this.forceUpdate()
  }



  renderCustomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend" style={{marginBottom: 30}}>
        {payload.map(entry => {
          const { dataKey, color, label } = entry;
          const active = this.state.disabled.includes(dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#000" : "#AAA",
            fontSize: '1.5rem'
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

  static getDerivedStateFromProps(props, state) {
    const { dataPoints } = props
   if (!dataPoints || state.prevDataPoints === dataPoints) {
     return null
   }

    const chartLines = []
    const disabled = []
    for (const country of Object.keys(dataPoints)) {
      chartLines.push({ dataKey: `newCases${country}`, color: distinguishableColors.pop(), label: ` ${country} new cases`})
      chartLines.push({ dataKey: `newDeaths${country}`, color: distinguishableColors.pop(), label: ` ${country} new deaths`})
      chartLines.push({ dataKey: `totalCases${country}`, color: distinguishableColors.pop(), label: ` ${country} cases`})
      chartLines.push({ dataKey: `totalDeaths${country}`, color: distinguishableColors.pop(), label: ` ${country} deaths`})
      disabled.push(`totalCases${country}`)
      disabled.push(`totalDeaths${country}`)
    }
    const yLabelPrioritizedKeys = calcPrioritizedKeys(dataPoints)


    return {
      chartLines, disabled, prevDataPoints: dataPoints, yLabelPrioritizedKeys
    }
  }


  render() {
    const { dataPoints } = this.props

    if (!dataPoints) {
      return null;
    }
    
    const data = []
    // TODO: gotta merge the datasets on the date !
    for (const values of Object.values(dataPoints)) {
      data.push(...values)
    }

    return (
      <div>
        <div>
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
              dot={{r: 2}}
              />
              )
            }
          <XAxis
            dataKey="date"
            textAnchor="end"
            tick={{ angle: -70, fontSize: 20 }}
            height={225}
            padding={{right: 3, left: 3}}
            />

          <YAxis
            dataKey={this.state.yLabelPrioritizedKeys.filter(dataKey => !this.state.disabled.includes(dataKey))[0]}
            domain={this.state.scale === 'log' ? [1, 'dataMax'] : [0, 'dataMax']}
            tick={{ fontSize: 20 }}
            width={40}
            scale={this.state.scale}
            allowDataOverflow
            padding={{top: 3, bottom: 3}}
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
          <Legend verticalAlign="bottom" height={45} content={this.renderCustomizedLegend} 
            payload={this.state.chartLines}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
    );
  }
}

export default CoronaChart;
