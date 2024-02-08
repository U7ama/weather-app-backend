const express = require("express");
const fetch = require("node-fetch");
const {
  fetchCities,
  fetchWeatherData,
} = require("../services/cities-weather-service");
const router = express.Router();
// Fetch Cities
router.post("/fetchCities", fetchCities);

// Fetch Weather Data
router.post("/fetchWeatherData", fetchWeatherData);

module.exports = router;
