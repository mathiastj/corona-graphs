import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CoronaChart from "./components/line-chart";

import Select from 'react-select';

const endpoint = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/full_data.csv";
const initialCountrySelect = {value: 'Italy', label: 'Italy'};
const initialCountry = initialCountrySelect.value
const countries = [initialCountrySelect];

const parseData = (input) => {
  const extracted = {}
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
    if (!extracted[place]) {
      extracted[place] = []
    }
    if (!firstDataPointPerPlace[place]){
      if (Number(newCases) === 0 &&
          Number(newDeaths) === 0 &&
          Number(totalCases) === 0 &&
          Number(totalDeaths) === 0) {
        continue
      } else {
        firstDataPointPerPlace[place] = true
      }
    }
    extracted[place].push({
        date: new Date(date).toISOString().substring(0,10),
        newCases: Number(newCases) === 0 ? null : Number(newCases),
        newDeaths: Number(newDeaths) === 0 ? null : Number(newDeaths),
        totalCases: Number(totalCases) === 0 ? null :Number(totalCases),
        totalDeaths: Number(totalDeaths) === 0 ? null :Number(totalDeaths)
      })
  }

  return extracted
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'orange' : 'black',
  })
}

class App extends Component {
  state = {}

  async getData(country) {
    const parsed = this.state.parsedData
    const labels = Object.keys(parsed).map(key => ({value: key, label: key}))
    this.setState({dataForCountry: parsed[country], countries: labels, country});
  }

  async componentDidMount() {
    const res = await axios.get(`${endpoint}`);
    this.setState({parsedData: parseData(res.data)})
    await this.getData(initialCountry);
  }

  async _onChange(country) {
    await this.getData(country.value)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div style={{width: '40%'}}>
            <Select options={this.state.countries || countries} onChange={input => this._onChange(input)} defaultValue={this.state.country || initialCountrySelect} styles={customStyles} />
          </div>
          <div style={{width: '95%', height: '80%'}}>
            <CoronaChart dataPoints={this.state.dataForCountry} /> 
          </div>
        </header>
        <div className="Bottom-right">Sources: ECDC via <a href={endpoint}>OWID</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></div>
      </div>
    );
  }
}

export default App;
