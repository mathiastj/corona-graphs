import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CoronaChart from "./components/line-chart";
import { formatStringToNumberOrNull } from "./utils/data-format";

import Select from 'react-select';

const endpoint = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/full_data.csv";
const initialCountrySelect = {value: 'Italy', label: 'Italy'};
const initialCountries = [initialCountrySelect]
const initialSelectableCountries = [initialCountrySelect];

const parseData = (input) => {
  const newExtraction = {}
  const countries = {}
  const dataPerLine = String(input).split('\n')
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
    countries[place] = true
    if (!firstDataPointPerPlace[place]) {
      if (Number(newCases) === 0 &&
          Number(newDeaths) === 0 &&
          Number(totalCases) === 0 &&
          Number(totalDeaths) === 0) {
        continue
      } else {
        firstDataPointPerPlace[place] = true
      }
    }
    const dateFormatted = new Date(date).toISOString().substring(0,10)
    if (!newExtraction[dateFormatted]) {
      newExtraction[dateFormatted] = {
        date: dateFormatted,
        [`newCases${place}`]: formatStringToNumberOrNull(newCases),
        [`newDeaths${place}`]: formatStringToNumberOrNull(newDeaths),
        [`totalCases${place}`]: formatStringToNumberOrNull(totalCases), 
        [`totalDeaths${place}`]: formatStringToNumberOrNull(totalDeaths)
      }
    } else {
      const currentData = newExtraction[dateFormatted]
      newExtraction[dateFormatted] = {
        [`newCases${place}`]: formatStringToNumberOrNull(newCases),
        [`newDeaths${place}`]: formatStringToNumberOrNull(newDeaths),
        [`totalCases${place}`]: formatStringToNumberOrNull(totalCases), 
        [`totalDeaths${place}`]: formatStringToNumberOrNull(totalDeaths), 
        ...currentData
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
  })
}

class App extends Component {
  state = {
    selectableCountries: initialSelectableCountries,
    currentCountries: [initialCountrySelect]
  }

  async getData(countries) {
    const newParsed = this.state.newParsedData
    let multiData = []
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
            filteredDataPoint[`newCases${country.value}`] = dataPoint[`newCases${country.value}`] || null
            filteredDataPoint[`newDeaths${country.value}`] = dataPoint[`newDeaths${country.value}`] || null
            filteredDataPoint[`totalCases${country.value}`] = dataPoint[`totalCases${country.value}`] || null
            filteredDataPoint[`totalDeaths${country.value}`] = dataPoint[`totalDeaths${country.value}`] || null
          }
          filteredDataPoint['date'] = dataPoint['date']
          multiData.push(filteredDataPoint)
        }
      }
    }

    this.setState({currentCountries: countries, multiCountryData: multiData });
    
  }

  async componentDidMount() {
    const res = await axios.get(`${endpoint}`);
    const [parsed, countries] = parseData(res.data)
    const labels = countries.map(key => ({value: key, label: key}))
    this.setState({selectableCountries: labels, newParsedData: parsed})
    await this.getData(initialCountries);
  }

  async _onChange(countries) {
    if (!countries) {
      return this.getData(initialCountries)
    } 
    await this.getData(countries)
  }

  render() {
    const { selectableCountries, currentCountries, multiCountryData } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{width: '40%'}}>
            <Select isMulti options={selectableCountries} onChange={input => this._onChange(input)} defaultValue={initialCountrySelect} styles={customStyles} value={currentCountries}/>
          </div>
          <div style={{width: '95%', height: '80%'}}>
            <CoronaChart dataPoints={multiCountryData} countries={currentCountries.map(country => country.value)}/> 
          </div>
        </header>
        <div className="Bottom-right">Sources: ECDC via <a href={endpoint}>OWID</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></div>
      </div>
    );
  }
}

export default App;
