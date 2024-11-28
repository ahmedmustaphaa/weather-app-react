import React, { useEffect, useState } from 'react';
import './weather.css';
import { GiWhirlwind } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState({
    humidity: null,
    windSpeed: null,
    temperature: null,
    location: ''
  });
  const apiKey = process.env.REACT_APP_API_ID;
console.log(apiKey); // Should output your API key if it's properly loaded

  const [city, setCity] = useState('');

  const getWeather = async (city) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e719bdac870c8bf4a6d841b025006fdd`);
      setWeatherData({
        humidity: res.data.main.humidity,
        windSpeed: res.data.wind.speed,
        temperature: Math.floor(res.data.main.temp),
        location: res.data.name
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeather('London'); 
  }, []);

  const handleSearch = () => {
    if (city) {
      getWeather(city);
    }
  };

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <FaSearch className="icon" onClick={handleSearch} />
      </div>

      {weatherData.temperature !== null ? (
        <>
          <img src={require('../../Assets/sun.png')} className="weather-icon" alt="weather" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="full">
            <div className="left-side">
              <div><WiHumidity style={{ fontSize: '26px' }} /></div>
              <div>
                <h3>{weatherData.humidity} %</h3>
                <h4>Humidity</h4>
              </div>
            </div>
            <div className="rigth-side">
              <div><GiWhirlwind style={{ fontSize: '26px' }} /></div>
              <div>
                <h3>{weatherData.windSpeed} km/h</h3>
                <h4>Wind Speed</h4>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Weather;
