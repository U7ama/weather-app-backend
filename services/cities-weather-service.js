const express = require("express");
const fetch = require("node-fetch");

// Fetch Cities
const fetchCities = async (req, res) => {
  const { input } = req.body;
  const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

  let url = `${GEO_API_URL}/cities?limit=5`;

  if (!input || input.trim() === "") {
    url += "&countryIds=PK";
  } else {
    url += `&namePrefix=${input}`;
  }

  const GEO_API_OPTIONS = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.GEO_API_KEY,
      "X-RapidAPI-Host": process.env.GEO_API_HOST,
    },
  };

  try {
    const response = await fetch(url, GEO_API_OPTIONS);
    const data = await response.json();
    // console.log("data", data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Fetch Weather Data
const fetchWeatherData = async (req, res) => {
  const { lat, lon } = req.body;
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    res.status(200).send({ data: [weatherResponse, forcastResponse] });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { fetchCities, fetchWeatherData };
