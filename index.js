var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var model = require("./model/weather2023DB.js");

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.route("/sites/").get(function (req, res) {
  model.getSites(req, res);
});

app.route("/today/:datenow?").get(function (req, res) {
  model.getToday(req, res);
});

app.route("/sitedata/:site_name?").get(function (req, res) {
  model.getSiteData(req, res);
});

app.route("/weatherdata/").get(function (req, res) {
  model.getWeatherData(req, res);
});
app.route("/weatherdatasites").get(function (req, res) {
  model.getWeatherDataSites(req, res);
});

app.route("/weatherdataaverage/").get(function (req, res) {
  model.getWeatherDataAverage(req, res);
});

app.route("/weatherdataminmax/:site_name?").get(function (req, res) {
  model.getWeatherDataMinMax(req, res);
});

app.route("/dailystats/:site_name?/:datenow?").get(function (req, res) {
  model.getDayStats(req, res);
});

app.route("/windspeeds/:site_name?/:datenow?").get(function (req, res) {
  model.getWindSpeeds(req, res);
});

app.route("/chosen/:site_name?/:datenow?").get(function (req, res) {
  model.getChosen(req, res);
});

app.route("/weatherdataaverage/:site_name/:datenow?").get(function (req, res) {
  model.getChosenAverage(req, res);
});

// REST API /users GET route
app.route("/users/").get(function (req, res) {
  model.getUsers(req, res);
});

// REST API /users POST route
app.route("/users/").post(function (req, res) {
  model.create(req, res);
});

// REST API /login POST route
app.route("/login/").post(function (req, res) {
  model.loginUser(req, res);
});

var myServer = app.listen(3005, function () {
  console.log("Server listening on port 3005");
});
