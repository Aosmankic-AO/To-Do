import React, { useState, useEffect } from "react";
import "./Weather.css"
import "../images/brokenClouds.jpg"

const Weather = () => {
    /** Variables ***/
    const [weather, setWeather] = useState([]);
    const [location, setLocation] = useState([]);
    const [error, setError] = useState(false);
    const [conditions, setConditions] = useState();



    useEffect(() => {
        //Function to get the weather Data
        // Using OpenWeather API
        const getWeather = async () => {
            /** Geolocation navigator START **/
            navigator.geolocation.getCurrentPosition(async (position) => {
                //Position variables
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const API_KEY = "51a487cb29780958ea09c8e6ab7a0c69";
                //Get data from OpenWeather API as json
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                    const data = await response.json();
                //Set the weather and location with useState Hook
                if(response.ok){
                    console.log('Weather app OK')
                    setWeather(data.main);
                    setLocation(data.name);
                    setConditions(data.weather[0].description);
                } else {
                    console.log('Problem with weather API response')
                }
            },() => {
                 setError(true);
            }
            );/** Geolocation navigator END **/
        }; /** getWeather function END **/

        getWeather();

    }, []);/** useEffect Hook END **/



    return (
        <div>
            {error && <p>Unable to retrieve location and weather data.</p>}
            {location && <p>Location: {location}</p>}
            {weather && (
                <div className="weather-widget">
                    <p id="temp">
                    Temperature: {Math.round(((weather.temp - 273.15) * 9/5) + 32)}°F
                    </p>
                        <br></br>
                    <p id="feel">
                    Feels like: {Math.round(((weather.feels_like - 273.15) * 9/5) + 32)}°F
                        <br></br>
                    </p>
                    <p id="conditions">
                    Conditions: {conditions}
                    </p>
                </div>


            )}
        </div>
    );
};


export default Weather;
