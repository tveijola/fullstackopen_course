import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({ weather }) => {
  if (weather.current === undefined) {
    return null
  }
  const city = weather.location.name
  const data = weather.current
  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>Temperature: {data.temperature} Celsius</div>
      <div><img src={data.weather_icons[0]} width="50" alt="weather icon" /></div>
      <div>Wind: {data.wind_speed} kmh, direction {data.wind_dir} </div>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital - {country.capital}</div>
      <div>Population - {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width="150" />
    </div>
  )
}

const Content = ({ countries, setFilter }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.numericCode}>
            {country.name}
            <button onClick={() => setFilter(country.name)}>Show</button>
          </div>
        ))}
      </div>
    )
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  return <div>No countries match the filter!</div>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({})
  const [filter, setFilter] = useState('')

  const updateFilter = (event) => setFilter(event.target.value)

  useEffect(() => {
    console.log('Fetching countries...')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Countries fetched')
        setCountries(response.data)
      })
  }, [])

  const filteredList = (filter === '')
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    if (filteredList.length === 1) {
      console.log(`Fetching ${filteredList[0].capital} weather...`)
      const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: filteredList[0].capital
      }
      axios.get('http://api.weatherstack.com/current', { params })
        .then(response => {
          setWeather(response.data)
        })
    } else {
      setWeather({})
    }
  }, [filter])

  return (
    <div>
      Find Countries:
      <input
        value={filter}
        onChange={updateFilter} />
      <Content
        countries={filteredList}
        setFilter={setFilter} />
      <Weather
        weather={weather} />
    </div>
  )
}

export default App;
