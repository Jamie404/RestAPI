const express = require('express');
const model = require('./model/DB2.js'); // If the file is actually named DB2.js
const router = express.Router();

// Define your routes
router.get('/sites', model.getSites);
router.get('/today/:datenow?', model.getToday);
router.get('/sitedata/:site_name?', model.getSiteData);
router.get('/weatherdata', model.getWeatherData);
router.get('/weatherdatasites', model.getWeatherDataSites);
router.get('/weatherdataaverage', model.getWeatherDataAverage);
router.get('/weatherdataminmax/:site_name?', model.getWeatherDataMinMax);
router.get('/dailystats/:site_name?/:datenow?', model.getDayStats);
router.get('/windspeeds/:site_name?/:datenow?', model.getWindSpeeds);
router.get('/chosen/:site_name?/:datenow?', model.getChosen);
router.get('/weatherdataaverage/:site_name/:datenow?', model.getChosenAverage);

// Users routes
router.get('/users', model.getUsers);
router.post('/users', model.create);
router.post('/login', model.loginUser);

module.exports = router;
