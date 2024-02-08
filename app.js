const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const citiesWeatherRouter = require("./routes/cities-weather");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport-config");

// Routes
app.use("/auth", authRouter);
app.use("/", citiesWeatherRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// http://localhost:3000/auth/google
// https://qcsmlab-555fa.uc.r.appspot.com/auth/google
// gcloud app deploy --version=weather-app --project=qcsmlab-555fa

module.exports = app;
