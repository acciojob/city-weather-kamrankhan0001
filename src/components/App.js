
//import React from "react";


import React, { useState } from "react";
import './../styles/App.css';
//import "./App.css";

const API_KEY = "fb89f2741feabd20aeed1fab9118e670"; // Replace with your OpenWeatherMap API key

function App() {
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);
    const data = await response.json();
    setWeather(data);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
        {weather && (
          <div className="weather">
            <h2>{weather.name}</h2>
            <div className="weather-info">
              <div className="temperature">{Math.round(celsiusToFahrenheit(weather.main.temp - 273.15))}°C</div>
              <div className="description">{weather.weather[0].description}</div>
            
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
              />
              
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
