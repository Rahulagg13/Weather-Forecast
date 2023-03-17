"use strict";

const api_key = "4099faa5a9c5954abf039db242f250ea";

export const fetchData = function (URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
  .then(res=>res.json())
  .then(data=>callback(data));
};

export const url = {
    currrentWeather(lat,lon){
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`
    },
    forcast(lat,lon){
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`
    },
    airPollution(lat,lon){
        return `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`
    },
    reverseGeo(lat,lon){
        return `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`
    },
    geo(query){
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    }
}
