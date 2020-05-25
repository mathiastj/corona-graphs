import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Select from 'react-select'
import CoronaChart from './components/line-chart'
import { formatStringToNumberOrNull } from './utils/data-format'

const WORLD_POP = 7794798729
const endpoint = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/full_data.csv'
const locationsEndpoint = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/locations.csv'
const initialCountries = [
  { value: 'Italy', label: 'Italy' },
  { value: 'Spain', label: 'Spain' },
]

const parseData = (input, locations) => {
  const newExtraction = {}
  const countries = {}
  const dataPerLine = String(input).split('\n')
  const locationLines = String(locations).split('\n')
  const popDict = {}
  locationLines.splice(1, locationLines.length).map((row) => {
    const [, location, , , population] = row.split(',')
    popDict[location] = population
  })
  let header = true
  const firstDataPointPerPlace = {}
  for (const line of dataPerLine) {
    if (header) {
      header = false
      continue
    }
    const [date, place, newCases, newDeaths, totalCases, totalDeaths] = line.split(',')
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
    const dateFormatted = new Date(date).toISOString().substring(0, 10)
    if (!newExtraction[dateFormatted]) {
      newExtraction[dateFormatted] = {
        date: dateFormatted,
        [`newCases${place}`]: formatStringToNumberOrNull(newCases),
        [`newDeaths${place}`]: formatStringToNumberOrNull(newDeaths),
        [`totalCases${place}`]: formatStringToNumberOrNull(totalCases),
        [`totalDeaths${place}`]: formatStringToNumberOrNull(totalDeaths),
        [`popData${place}`]: formatStringToNumberOrNull(popData),
      }
    } else {
      const currentData = newExtraction[dateFormatted]
      newExtraction[dateFormatted] = {
        [`newCases${place}`]: formatStringToNumberOrNull(newCases),
        [`newDeaths${place}`]: formatStringToNumberOrNull(newDeaths),
        [`totalCases${place}`]: formatStringToNumberOrNull(totalCases),
        [`totalDeaths${place}`]: formatStringToNumberOrNull(totalDeaths),
        [`popData${place}`]: formatStringToNumberOrNull(popData),
        ...currentData,
      }
    }
  }

  // Resort the data on date
  const dataPoints = Object.values(newExtraction).sort((a, b) => {
    return a.date.localeCompare(b.date)
  })

  return [dataPoints, Object.keys(countries)]
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
    if (!countries) {
      this.setState({ currentCountries: [], multiCountryData: null })
      return
    }
    const newParsed = this.state.newParsedData
    const multiData = []
    if (countries) {
      // Build data set with only the selected countries and only after they started getting data
      let includeDataPointsGoingForward = false
      for (const dataPoint of Object.values(newParsed)) {
        for (const country of countries) {
          if (dataPoint[`newCases${country.value}`]) {
            includeDataPointsGoingForward = true
            break
          }
        }
        if (includeDataPointsGoingForward) {
          const filteredDataPoint = {}
          for (const country of countries) {
            const newCases = dataPoint[`newCases${country.value}`] || null
            const newDeaths = dataPoint[`newDeaths${country.value}`] || null
            const totalCases = dataPoint[`totalCases${country.value}`] || null
            const totalDeaths = dataPoint[`totalDeaths${country.value}`] || null
            filteredDataPoint[`newCases${country.value}`] = newCases
            filteredDataPoint[`newDeaths${country.value}`] = newDeaths
            filteredDataPoint[`totalCases${country.value}`] = totalCases
            filteredDataPoint[`totalDeaths${country.value}`] = totalDeaths

            let popData = dataPoint[`popData${country.value}`] || null
            // Hardcode world population since it's not in the source
            if (!popData && country.value === 'World') {
              popData = WORLD_POP
            }

            // Get data per million capita and use very hackish way to round floats
            const [nc, nd, tc, td] = [newCases, newDeaths, totalCases, totalDeaths].map((value) =>
              Number(Number((value / popData) * 1000000).toFixed(2))
            )
            filteredDataPoint[`newCases${country.value}PerCapita`] = nc
            filteredDataPoint[`newDeaths${country.value}PerCapita`] = nd
            filteredDataPoint[`totalCases${country.value}PerCapita`] = tc
            filteredDataPoint[`totalDeaths${country.value}PerCapita`] = td
          }
          filteredDataPoint.date = dataPoint.date
          multiData.push(filteredDataPoint)
        }
      }
    }

    this.setState({ currentCountries: countries, multiCountryData: multiData })
  }

  async _onChange(countries) {
    await this.getData(countries)
  }

  render() {
    const { selectableCountries, currentCountries, multiCountryData } = this.state
    return (
      <div className="App">
        <div className="Top-left">
          Source code on: <a href="https://github.com/mathiastj/corona-graphs">GitHub</a>
        </div>
        <div className="Top-right">
          Sources: ECDC via <a href="https://github.com/owid/covid-19-data">OWID</a> under{' '}
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
          <div style={{ width: '95%', height: '90%' }}>
            {!multiCountryData && "Loading..."}
            <CoronaChart dataPoints={multiCountryData} countries={currentCountries.map((country) => country.value)} />
          </div>
        </header>
      </div>
    )
  }
}

export default App
