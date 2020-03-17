import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import CoronaChart from "./components/line-chart";

import Select from 'react-select';

const endpoint = "https://raw.githubusercontent.com/owid/covid-19-who/master/public/data/full_data.csv";
const initialCountrySelect = {value: 'Denmark', label: 'Denmark'};
const initialCountry = initialCountrySelect.value
const countries = [{value: 'Denmark', label: 'Denmark'}];

let data

const parseData = (input) => {
  if (data) {
    return data
  }
  const extracted = {}
  const dataPerLine = String(input).split('\n')
  let header = true
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
    extracted[place].push({date: new Date(date).toISOString().substring(0,10), newCases: Number(newCases), newDeaths: Number(newDeaths), totalCases: Number(totalCases), totalDeaths: Number(totalDeaths)})
  }

  data = extracted
  return data
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
    const res = await axios.get(`${endpoint}`);
    const parsed = parseData(res.data)
    const labels = Object.keys(parsed).map(key => ({value: key, label: key}))
    this.setState({dataForCountry: parsed[country], countries: labels, country});
  }

  async componentDidMount() {
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
          <div style={{width: '98%', height: '80%'}}>
            <CoronaChart dataPoints={this.state.dataForCountry} /> 
          </div>
        </header>
      </div>
    );
  }
}

export default App;
