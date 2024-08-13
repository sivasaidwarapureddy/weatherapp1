import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_img from '../assets/humidity.png'
 import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_img from '../assets/wind.png'
import { FaSearch } from "react-icons/fa";


const Weather = () => {
  const [weatherdata,setweatherdata] = useState(false);
  const [newText,setnewText] = useState("");
  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "O1n": clear_icon,
    "O2d": cloud_icon, 
    "02n": cloud_icon,
    "03d": cloud_icon,
    "O3n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }
  const search = async (city)=>{
    try {
      
      const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric' + '&appid=1f3126c4615d7ee45569c230a7e25103'
      const response = await fetch(url);
      const data = await response.json()
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setweatherdata({
        humidity : data.main.humidity,
        windspeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,
        icon: icon
      })
      
    } catch (error) {
      setweatherdata(false);
      console.log("Error in fetching weather data");
      alert("chcek the details / API key");
    }
  }


    useEffect(()=>{search(newText)},[])

  return (
    <div className='weather'>
     
      <div className='search-bar'>
        <input ref={inputRef}  type="text" placeholder='Search'
         />
        <FaSearch className='search' onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherdata?<>
      
        <img src={clear_icon} alt="A image showing clear sky"  className='Weather-icon'/>
      <p className='temperature'>{weatherdata.temperature}° c </p>
      <p className='location'>{weatherdata.location} </p>
      
      
      
      <div className='weather-data'>

        <div className='col'>

          <img src={humidity_img} alt="humidity img" />
            <div className="humidity">
                <p>{weatherdata.humidity} %</p>
                <span>Humidity</span>
            </div>     </div>
            <div className='col'>
            
            <img src={wind_img} alt="wind img" />
            <div className="wind-speed">
                <p>{weatherdata.windspeed} Km/hr </p>
                <span>Wind Speed</span> 
            </div>
            </div>

   

      </div>

      
      </>:<></>}
      
    </div>
  )
}

export default Weather;
