import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Select from 'react-select'
import CoronaChart from './components/line-chart'
import { DATA_MODIFIERS, DATA_TYPES } from './utils/constants'
import { formatStringToNumberOrNull } from './utils/data-format'

const endpoint = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv'
const locationsEndpoint =
  'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv'
const initialCountries = [
  { value: 'Denmark', label: 'Denmark' },
  { value: 'United Kingdom', label: 'United Kingdom' },
]
const ROLLING_AVERAGE_DAYS = 7

const getLocationPopulations = (popDict, locationLines) => {
  for (const row of locationLines) {
    const columns = row.split(',')
    const location = columns[2]
    const population = columns[62]
    popDict[location] = population
  }
}

const parseData = (input, locations) => {
  const newExtraction = {}
  const countries = {}
  const dataPerLine = String(input).split('\n')
  const locationLines = String(locations).split('\n')
  const popDict = {}
  getLocationPopulations(popDict, locationLines.splice(1, locationLines.length)) // Remove the first line with the headers
  let header = true
  const firstDataPointPerPlace = {}
  for (const line of dataPerLine) {
    if (header) {
      header = false
      continue
    }
    const [, , place, date, totalCases, newCases, , totalDeaths, newDeaths] = line.split(',')
    if (!place) {
      continue
    }
    const popData = popDict[place]
    countries[place] = true
    if (!firstDataPointPerPlace[place]) {
      if (Number(newCases) === 0 && Number(newDeaths) === 0 && Number(totalCases) === 0 && Number(totalDeaths) === 0) {
        continue
      } else {
        firstDataPointPerPlace[place] = true
      }
    }
    if (!newExtraction[date]) {
      newExtraction[date] = {
        date: date,
        [`${DATA_TYPES.NEW_CASES}${place}`]: formatStringToNumberOrNull(newCases),
        [`${DATA_TYPES.NEW_DEATHS}${place}`]: formatStringToNumberOrNull(newDeaths),
        [`${DATA_TYPES.TOTAL_CASES}${place}`]: formatStringToNumberOrNull(totalCases),
        [`${DATA_TYPES.TOTAL_DEATHS}${place}`]: formatStringToNumberOrNull(totalDeaths),
        [`popData${place}`]: formatStringToNumberOrNull(popData),
      }
    } else {
      newExtraction[date][`${DATA_TYPES.NEW_CASES}${place}`] = formatStringToNumberOrNull(newCases)
      newExtraction[date][`${DATA_TYPES.NEW_DEATHS}${place}`] = formatStringToNumberOrNull(newDeaths)
      newExtraction[date][`${DATA_TYPES.TOTAL_CASES}${place}`] = formatStringToNumberOrNull(totalCases)
      newExtraction[date][`${DATA_TYPES.TOTAL_DEATHS}${place}`] = formatStringToNumberOrNull(totalDeaths)
      newExtraction[date][`popData${place}`] = formatStringToNumberOrNull(popData)
    }
  }

  // Resort the data on date
  const dataPoints = Object.values(newExtraction).sort((a, b) => {
    return a.date.localeCompare(b.date)
  })

  return [dataPoints, Object.keys(countries)]
}

// Create a seven day rolling average for the daily stats
const addRollingAverages = (country, newCases, newDeaths, nc, nd, multiData, filteredDataPoint) => {
  let rollingFigures = [
    {
      useDataKey: `${DATA_TYPES.NEW_CASES}${country.value}`,
      newDataKey: `${DATA_TYPES.NEW_CASES}${country.value}${DATA_MODIFIERS.ROLLING}`,
      sum: 0,
      entries: 0,
      dataToday: newCases,
    },
    {
      useDataKey: `${DATA_TYPES.NEW_DEATHS}${country.value}`,
      newDataKey: `${DATA_TYPES.NEW_DEATHS}${country.value}${DATA_MODIFIERS.ROLLING}`,
      sum: 0,
      entries: 0,
      dataToday: newDeaths,
    },
    {
      useDataKey: `${DATA_TYPES.NEW_CASES}${country.value}${DATA_MODIFIERS.PER_CAPITA}`,
      newDataKey: `${DATA_TYPES.NEW_CASES}${country.value}${DATA_MODIFIERS.PER_CAPITA}${DATA_MODIFIERS.ROLLING}`,
      sum: 0,
      entries: 0,
      dataToday: nc,
    },
    {
      useDataKey: `${DATA_TYPES.NEW_DEATHS}${country.value}${DATA_MODIFIERS.PER_CAPITA}`,
      newDataKey: `${DATA_TYPES.NEW_DEATHS}${country.value}${DATA_MODIFIERS.PER_CAPITA}${DATA_MODIFIERS.ROLLING}`,
      sum: 0,
      entries: 0,
      dataToday: nd,
    },
  ]
  // Make sure there's enough data for a rolling average
  if (multiData.length >= ROLLING_AVERAGE_DAYS - 1) {
    for (const rollingFigure of rollingFigures) {
      // Go six days back and add current
      for (let i = 0; i < ROLLING_AVERAGE_DAYS - 1; i++) {
        let dailyStat = multiData[multiData.length - i - 1][rollingFigure.useDataKey]
        if (dailyStat != null && !isNaN(dailyStat)) {
          rollingFigure.sum += dailyStat
          rollingFigure.entries += 1
        }
      }
      if (rollingFigure.dataToday && !isNaN(rollingFigure.dataToday)) {
        rollingFigure.sum += rollingFigure.dataToday
        rollingFigure.entries += 1
      }

      // Get the average and round to float
      filteredDataPoint[rollingFigure.newDataKey] = Number(Number(rollingFigure.sum / rollingFigure.entries).toFixed(2))
    }
  }
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'orange' : 'black',
  }),
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectableCountries: initialCountries,
      currentCountries: initialCountries,
    }
  }

  async componentDidMount() {
    const [res, locations] = await Promise.all([axios.get(`${endpoint}`), axios.get(`${locationsEndpoint}`)])
    const [parsed, countries] = parseData(res.data, locations.data)
    const labels = countries.map((key) => ({ value: key, label: key }))
    this.setState({ selectableCountries: labels, newParsedData: parsed })
    await this.getData(initialCountries)
  }

  async getData(countries) {
    if (!countries || countries.length === 0) {
      this.setState({ currentCountries: [], multiCountryData: [] })
      return
    }
    const newParsed = this.state.newParsedData
    const multiData = []
    // Build data set with only the selected countries and only after they started getting data
    let includeDataPointsGoingForward = false
    for (const dataPoint of Object.values(newParsed)) {
      // Find the first datapoint for any of the countries
      if (!includeDataPointsGoingForward) {
        for (const country of countries) {
          if (dataPoint[`${DATA_TYPES.NEW_CASES}${country.value}`]) {
            includeDataPointsGoingForward = true
            break
          }
        }
      }
      if (includeDataPointsGoingForward) {
        const filteredDataPoint = {}
        for (const country of countries) {
          const newCases = dataPoint[`${DATA_TYPES.NEW_CASES}${country.value}`] || null
          const newDeaths = dataPoint[`${DATA_TYPES.NEW_DEATHS}${country.value}`] || null
          const totalCases = dataPoint[`${DATA_TYPES.TOTAL_CASES}${country.value}`] || null
          const totalDeaths = dataPoint[`${DATA_TYPES.TOTAL_DEATHS}${country.value}`] || null
          filteredDataPoint[`${DATA_TYPES.NEW_CASES}${country.value}`] = newCases
          filteredDataPoint[`${DATA_TYPES.NEW_DEATHS}${country.value}`] = newDeaths
          filteredDataPoint[`${DATA_TYPES.TOTAL_CASES}${country.value}`] = totalCases
          filteredDataPoint[`${DATA_TYPES.TOTAL_DEATHS}${country.value}`] = totalDeaths

          let popData = dataPoint[`popData${country.value}`] || null

          // Get data per million capita and use very hackish way to round floats
          const [nc, nd, tc, td] = [newCases, newDeaths, totalCases, totalDeaths].map(
            (value) => Number(Number((value / popData) * 1000000).toFixed(2)) || null
          )
          filteredDataPoint[`${DATA_TYPES.NEW_CASES}${country.value}${DATA_MODIFIERS.PER_CAPITA}`] = nc
          filteredDataPoint[`${DATA_TYPES.NEW_DEATHS}${country.value}${DATA_MODIFIERS.PER_CAPITA}`] = nd
          filteredDataPoint[`${DATA_TYPES.TOTAL_CASES}${country.value}${DATA_MODIFIERS.PER_CAPITA}`] = tc
          filteredDataPoint[`${DATA_TYPES.TOTAL_DEATHS}${country.value}${DATA_MODIFIERS.PER_CAPITA}`] = td

          addRollingAverages(country, newCases, newDeaths, nc, nd, multiData, filteredDataPoint)
        }
        filteredDataPoint.date = dataPoint.date
        multiData.push(filteredDataPoint)
      }
    }

    this.setState({ currentCountries: countries, multiCountryData: multiData })
  }

  async _onChange(countries) {
    await this.getData(countries)
  }

  render() {
    const { selectableCountries, currentCountries, multiCountryData } = this.state
    console.log(multiCountryData)
    return (
      <div className="App">
        <div className="Top-left">
          Source code on: <a href="https://github.com/mathiastj/corona-graphs">GitHub</a>
        </div>
        <div className="Top-right">
          Sources: <a href="https://github.com/owid/covid-19-data/tree/master/public/data">OWID</a> under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
        </div>
        <header className="App-header">
          <div style={{ width: '80%' }}>
            <Select
              isMulti
              options={selectableCountries}
              onChange={(input) => this._onChange(input)}
              defaultValue={initialCountries}
              styles={customStyles}
              value={currentCountries}
            />
          </div>
          <div style={{ width: '99%', height: '90%' }}>
            {!multiCountryData && 'Loading...'}
            <CoronaChart dataPoints={multiCountryData} countries={currentCountries.map((country) => country.value)} />
          </div>
        </header>
      </div>
    )
  }
}

export default App
