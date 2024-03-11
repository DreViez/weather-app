import React, { useState } from 'react'
import './WeatherApp.css'
// Importing icons

import  search_icon from "../Assets/search.png"
import  clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  
    let api_key="130c5f199ed5fcb06de8a008c1750a06";     // OpenWeatherMap API key
    
    const [wincon,setWicon] =useState(cloud_icon);


    //search bar logic
    const search = async () => {
        const element =document.getElementsByClassName("cityInput")         // Get the input element with class "cityInput"
        if(element[0].value==="")        // Check if the input is empty
        {
            return 0;
        }
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Imperial&appid=${api_key}`;         // API endpoint for weather data
    // Fetch weather data
    let response = await fetch(url);
    let data = await response.json();
    // Get elements to update with weather data

    const humidity =document.getElementsByClassName("humidity-percentage")
    const wind =document.getElementsByClassName("wind-speed")
    const temprature =document.getElementsByClassName("weather-temp")
    const location =document.getElementsByClassName("weather-location")
    
    // updates fun grabs from thunder client api extentions
    humidity[0].innerHTML = data.main.humidity+"%"; 
    wind[0].innerHTML = Math.floor(data.wind.speed)+"mph";
    temprature[0].innerHTML = Math.floor(data.main.temp)+"°F";
    location[0].innerHTML = data.name;
   
    if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n")
    {
        setWicon(clear_icon);
    }
    else if (data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n")
    {
        setWicon(cloud_icon);
    }
    else if (data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n")
    {
        setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n")
    {
        setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n")
    {
        setWicon(rain_icon);
    }
    else if (data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n")
    {
        setWicon(rain_icon);
    }   
    else if (data.weather[0].icon ==="13d" || data.weather[0].icon ==="13n")
    {
        setWicon(snow_icon);
    }
    else  
    {
        setWicon(clear_icon);
    }
}
    
    return (
    
    <div className ='container'>
        <div className="top-bar">
            <input type="text" className="cityInput"></input>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wincon} alt="" />
        </div>
        <div className="weather-temp">25°f</div>
        <div className="weather-location">New York</div> 
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                <div className="humidity-percentage">54%</div>
                <div className="text">Humidity</div>
            </div>
            </div>
        <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                <div className="wind-speed">5 mph</div>
                <div className="text">Wind Speed</div>
                </div>
                </div>
            </div>
        </div>
  )
}
export default WeatherApp
