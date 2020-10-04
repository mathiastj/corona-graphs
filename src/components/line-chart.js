import React, { Component } from 'react'
import { setDifference } from '../utils/set-diff'
import { Legend, Label, Line, LineChart, ResponsiveContainer, Surface, Symbols, Tooltip, XAxis, YAxis } from 'recharts'

const distinguishableColors = [
  '#426600',
  '#FF0010',
  '#990000',
  '#E0FF66',
  '#FFFF80',
  '#F0A3FF',
  '#993F00',
  '#005C31',
  '#2BCE48',
  '#FFCC99',
  '#808080',
  '#94FFB5',
  '#8F7C00',
  '#FFA405',
  '#5EF1F2',
  '#9DCC00',
  '#FFFFFF',
  '#C20088',
  '#FFA8BB',
  '#0075DC',
  '#00998F',
  '#740AFF',
  '#FFFF00',
  '#FF5005',
]

const calcPrioritizedKeys = (dataPoints, countries) => {
  const maxPerDataKey = {}
  for (const country of countries) {
    maxPerDataKey[`newCases${country}`] = 0
    maxPerDataKey[`totalCases${country}`] = 0
    maxPerDataKey[`totalDeaths${country}`] = 0
    maxPerDataKey[`newDeaths${country}`] = 0

    maxPerDataKey[`newCases${country}PerCapita`] = 0
    maxPerDataKey[`totalCases${country}PerCapita`] = 0
    maxPerDataKey[`totalDeaths${country}PerCapita`] = 0
    maxPerDataKey[`newDeaths${country}PerCapita`] = 0

    maxPerDataKey[`newCases${country}Rolling`] = 0
    maxPerDataKey[`newDeaths${country}Rolling`] = 0
    maxPerDataKey[`newCases${country}PerCapitaRolling`] = 0
    maxPerDataKey[`newDeaths${country}PerCapitaRolling`] = 0

    for (const entry of dataPoints) {
      if (entry[`newCases${country}`] > maxPerDataKey[`newCases${country}`]) {
        maxPerDataKey[`newCases${country}`] = entry[`newCases${country}`]
        maxPerDataKey[`newCases${country}PerCapita`] = entry[`newCases${country}PerCapita`]
      }
      if (entry[`totalCases${country}`] > maxPerDataKey[`totalCases${country}`]) {
        maxPerDataKey[`totalCases${country}`] = entry[`totalCases${country}`]
        maxPerDataKey[`totalCases${country}PerCapita`] = entry[`totalCases${country}PerCapita`]
      }
      if (entry[`totalDeaths${country}`] > maxPerDataKey[`totalDeaths${country}`]) {
        maxPerDataKey[`totalDeaths${country}`] = entry[`totalDeaths${country}`]
        maxPerDataKey[`totalDeaths${country}PerCapita`] = entry[`totalDeaths${country}PerCapita`]
      }
      if (entry[`newDeaths${country}`] > maxPerDataKey[`newDeaths${country}`]) {
        maxPerDataKey[`newDeaths${country}`] = entry[`newDeaths${country}`]
        maxPerDataKey[`newDeaths${country}PerCapita`] = entry[`newDeaths${country}PerCapita`]
      }
      if (entry[`newDeaths${country}Rolling`] > maxPerDataKey[`newDeaths${country}Rolling`]) {
        maxPerDataKey[`newDeaths${country}Rolling`] = entry[`newDeaths${country}Rolling`]
        maxPerDataKey[`newDeaths${country}PerCapitaRolling`] = entry[`newDeaths${country}PerCapitaRolling`]
      }
      if (entry[`newCases${country}Rolling`] > maxPerDataKey[`newCases${country}Rolling`]) {
        maxPerDataKey[`newCases${country}Rolling`] = entry[`newCases${country}Rolling`]
        maxPerDataKey[`newCases${country}PerCapitaRolling`] = entry[`newCases${country}PerCapitaRolling`]
      }
    }
  }
  const sortedKeys = Object.keys(maxPerDataKey)
    .map((key) => {
      return { key, value: maxPerDataKey[key] }
      // Sort descending on value
    })
    .sort((a, b) => {
      return b.value - a.value
    })
  return sortedKeys.map((sorted) => sorted.key)
}

class CoronaChart extends Component {
  constructor(props) {
    super(props)
    this.state = { scale: 'linear', perCapita: false, rollingAverage: false }
  }

  handleClick(dataKey) {
    if (this.state.disabled.includes(dataKey)) {
      this.setState({ disabled: this.state.disabled.filter((obj) => obj !== dataKey) })
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) })
    }
  }

  handleOptionChange(scale) {
    this.setState({
      scale,
    })
    this.forceUpdate()
  }

  handlePerCapitaChange(perCapita) {
    this.setState({
      perCapita,
    })
    this.forceUpdate()
  }
  handleRollingAverageChange(rollingAverage) {
    this.setState({
      rollingAverage,
    })
    this.forceUpdate()
  }

  renderCustomizedLegend = ({ payload }) => {
    let currentCountry = ''
    let countryHeader = null
    return (
      <div className="customized-legend" style={{ marginBottom: 40 }}>
        {payload.map((entry) => {
          if (currentCountry !== entry.country) {
            currentCountry = entry.country
            countryHeader = (
              <span className="Legend-country">
                <br />
                {entry.country}
                <br />
              </span>
            )
          } else {
            countryHeader = null
          }
          const { dataKey, color, label } = entry
          const inActive = this.state.disabled.includes(dataKey)
          const style = {
            marginRight: 10,
            color: '#AAA',
          }

          return (
            <span>
              {countryHeader}
              <span onClick={() => this.handleClick(dataKey)} style={style}>
                <Surface width={20} height={20} style={{ marginBottom: -5 }}>
                  <Symbols cx={10} cy={10} type="circle" size={50} fill={color} />
                </Surface>
                <input type="checkbox" checked={!inActive} />
                <span className="Legend-per-country">{label}</span>
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  static getDerivedStateFromProps(props, state) {
    const { dataPoints, countries } = props
    if (!dataPoints || state.prevCountries === countries) {
      return null
    }

    if (state.prevCountries) {
      const prev = new Set(state.prevCountries)
      const current = new Set(countries)

      const removedCountries = setDifference(prev, current)
      // Push the old used colors back into the available pool
      // Remove chartLines if country no longer selected
      for (let i = state.chartLines.length - 1; i >= 0; i--) {
        if (removedCountries.has(state.chartLines[i].country)) {
          distinguishableColors.push(state.chartLines[i].color)
          state.chartLines.splice(state.chartLines.indexOf(state.chartLines[i]), 1)
        }
      }

      // Remove disabled lengends if country no longer selected
      for (let i = state.disabled.length - 1; i >= 0; i--) {
        let removed = false
        for (const removedCountry of removedCountries) {
          if (state.disabled[i].includes(removedCountry)) {
            removed = true
          }
        }
        if (removed) {
          state.disabled.splice(state.disabled.indexOf(state.disabled[i]), 1)
        }
      }
    }

    const chartLines = state.chartLines || []
    const disabled = state.disabled || []
    for (const country of countries) {
      if (!state.prevCountries || (state.prevCountries && !state.prevCountries.includes(country))) {
        chartLines.push({
          country,
          dataKey: `newCases${country}`,
          color: distinguishableColors.pop(),
          label: `New cases`,
        })
        chartLines.push({
          country,
          dataKey: `newDeaths${country}`,
          color: distinguishableColors.pop(),
          label: `New deaths`,
        })
        chartLines.push({
          country,
          dataKey: `totalCases${country}`,
          color: distinguishableColors.pop(),
          label: `Total cases`,
        })
        chartLines.push({
          country,
          dataKey: `totalDeaths${country}`,
          color: distinguishableColors.pop(),
          label: `Total deaths`,
        })
        disabled.push(`totalCases${country}`)
        disabled.push(`totalDeaths${country}`)
      }
    }

    const yLabelPrioritizedKeys = calcPrioritizedKeys(dataPoints, countries)

    return {
      chartLines,
      disabled,
      prevCountries: countries,
      yLabelPrioritizedKeys,
    }
  }

  getMaxNonDisabled = () => {
    for (const key of this.state.yLabelPrioritizedKeys) {
      // Filter out keys based on perCapita and rollingAverage choice
      if (!this.state.perCapita && !this.state.rollingAverage) {
        if (key.includes('PerCapita') || key.includes('Rolling')) {
          continue
        }
      } else if (this.state.perCapita && this.state.rollingAverage) {
        if (!(key.includes('total') && key.includes('PerCapita')) && !key.includes('PerCapitaRolling')) {
          continue
        }
      } else if (!this.state.perCapita && this.state.rollingAverage) {
        if (key.includes('PerCapita') || (key.includes('new') && !key.includes('Rolling'))) {
          continue
        }
      } else if (this.state.perCapita && !this.state.rollingAverage) {
        if (!key.includes('PerCapita') || key.includes('Rolling')) {
          continue
        }
      }
      // Find the first non disabled key
      let disabled = false
      for (const disabledKey of this.state.disabled) {
        // Use includes to also catch the perCapita and rollingAverage keys, e.g. newCasesSpainPerCapita would still match 'newCasesSpain'
        if (key.includes(disabledKey)) {
          disabled = true
          break
        }
      }
      if (!disabled) {
        return key
      }
    }
    return ''
  }

  render() {
    const { dataPoints } = this.props

    if (!dataPoints) {
      return null
    }

    const data = dataPoints
    const perCapita = this.state.perCapita ? 'PerCapita' : ''
    const rollingAverage = this.state.rollingAverage ? 'Rolling' : ''

    // Figure out which of the currently enabled keys is the first in the yLabelPrioritizedKeys list (including whether they are PerCapita or Rolling keys)
    let yAxisMaxKey = this.getMaxNonDisabled()

    return (
      <div>
        <div style={{ width: '85%', display: 'inline-block' }}>
          <span style={{ float: 'left', 'margin-left': '1rem' }}>
            <span onClick={() => this.handleOptionChange('linear')}>
              <input type="radio" id="linear" name="scale" value="linear" checked={this.state.scale === 'linear'} />
              <span style={{ color: '#AAA' }}>Linear</span>
            </span>
            <span onClick={() => this.handleOptionChange('log')}>
              <input type="radio" id="log" name="scale" value="log" checked={this.state.scale === 'log'} />
              <span style={{ color: '#AAA' }}>Log</span>
            </span>
          </span>
          <span
            style={{ float: 'right', 'margin-right': '1rem' }}
            onClick={() => this.handlePerCapitaChange(!this.state.perCapita)}
          >
            <input type="checkbox" id="perCapita" name="perCapita" checked={this.state.perCapita} />
            <span style={{ color: '#AAA' }}>Per Million Capita</span>
          </span>
          <span
            style={{ float: 'right', 'margin-right': '1rem' }}
            onClick={() => this.handleRollingAverageChange(!this.state.rollingAverage)}
          >
            <input type="checkbox" id="rollingAverage" name="rollingAverage" checked={this.state.rollingAverage} />
            <span style={{ color: '#AAA' }}>7 day rolling average</span>
          </span>
        </div>
        <ResponsiveContainer height={800} className="chart-container">
          <LineChart width={800} height={800} data={data} margin={{ top: 25, right: 25, left: 25, bottom: 25 }}>
            {this.state.chartLines
              .filter((chartLine) => !this.state.disabled.includes(chartLine.dataKey))
              .map((chartLine) => (
                <Line
                  connectNulls
                  name={`${chartLine.country} ${chartLine.label.toLowerCase()}`}
                  type="monotone"
                  dataKey={
                    chartLine.dataKey.includes('total')
                      ? `${chartLine.dataKey}${perCapita}`
                      : `${chartLine.dataKey}${perCapita}${rollingAverage}`
                  }
                  stroke={chartLine.color}
                  yAxisId={0}
                  dot={{ r: 2 }}
                />
              ))}
            <XAxis
              dataKey="date"
              textAnchor="end"
              tick={{ angle: -70, fontSize: 20 }}
              height={225}
              padding={{ right: 3, left: 3 }}
            />

            <YAxis
              dataKey={yAxisMaxKey}
              domain={this.state.scale === 'log' ? [1, 'dataMax'] : [0, 'dataMax']}
              tick={{ angle: -45, fontSize: 15 }}
              width={40}
              scale={this.state.scale}
              allowDataOverflow
              padding={{ top: 3, bottom: 3 }}
            >
              {/* <Label value="Persons" angle={-90} position="insideBottomLeft" offset={1} style={{ fontSize: '80%', fill: 'rgba(0, 204, 102, 0.70)' }}></Label> */}
              {/* /> */}
            </YAxis>
            <Tooltip
              formatter={(value, name) => [
                value === null ? 0 : value,
                `${name} ${this.state.perCapita ? 'per million' : ''}`,
              ]}
              itemSorter={(item) => -item.value}
              filterNull={false}
              wrapperStyle={{
                borderColor: 'white',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
              }}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
            <Legend
              wrapperStyle={{ top: 550 }}
              align="center"
              height={100}
              content={this.renderCustomizedLegend}
              payload={this.state.chartLines}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default CoronaChart
