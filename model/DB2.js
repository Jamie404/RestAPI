const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'D4rkfl4r3',
  database: 'weather2023',
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Successfully connected to MySQL database..`);
});

// GET /sites
exports.getSites = function (req, res) {
  connection.query(
    `SELECT * FROM sites ORDER BY site_name ASC`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /today
exports.getToday = function (req, res) {
  const datenow = req.params.datenow || new Date().toISOString().slice(0, 10);
  connection.query(
    `SELECT site_name, ROUND(AVG(air_temperature),1) AS air_temperature, ROUND(AVG(road_surface_temperature),1) AS road_surface_temperature, ROUND(AVG(wind_speed),1) AS wind_speed FROM weatherdata WHERE datenow = ? GROUP BY site_name ORDER BY weatherdata.site_name`,
    [datenow],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /sitedata
exports.getSiteData = function (req, res) {
  connection.query(
    `SELECT datenow, timenow, site_name, air_temperature, precipitation_type, wind_speed, road_surface_temperature, wind_direction_bearing, weather_description FROM weatherdata WHERE site_name = ?`,
    [req.params.site_name],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /weatherdata
exports.getWeatherData = function (req, res) {
  connection.query(`SELECT * FROM weatherdata`, function (err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows);
  });
};

// GET /weatherdata
exports.getWeatherDataSites = function (req, res) {
  connection.query(
    `SELECT DISTINCT(site_name) FROM weatherdata ORDER BY weatherdata.site_name`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /weatherdataaverage
exports.getWeatherDataAverage = function (req, res) {
  connection.query(
    `SELECT AVG(air_temperature) AS airAverage, AVG(road_surface_temperature) AS roadAverage, AVG(wind_speed) AS windAverage FROM weatherdata`,
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /chosenAverage
exports.getChosenAverage = function (req, res) {
  connection.query(
    `SELECT ROUND(AVG(air_temperature),1) AS airAverage, ROUND(AVG(road_surface_temperature),1) AS roadAverage, ROUND(AVG(wind_speed),1) AS windAverage FROM weatherdata WHERE site_name = ? AND datenow = ?`,
    [req.params.site_name, req.params.datenow],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /weatherdataminmax
exports.getWeatherDataMinMax = function (req, res) {
  connection.query(
    `SELECT MIN(air_temperature) AS minAir, MIN(wind_speed) AS minWind, MAX(air_temperature) AS maxAir, MAX(wind_speed) AS maxWind FROM weatherdata WHERE site_name = ?`,
    [req.params.site_name],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /dailystats
exports.getDayStats = function (req, res) {
  connection.query(
    `SELECT site_name, datenow, ROUND(MIN(air_temperature),1) AS minAir, ROUND(MAX(air_temperature),1) AS maxAir, ROUND(AVG(wind_speed),3) AS meanWind, ROUND(MAX(wind_speed),1) AS maxWind, ROUND(MIN(wind_speed),1) AS minWind FROM weatherdata WHERE site_name = ? AND datenow = ? GROUP BY site_name`,
    [req.params.site_name, req.params.datenow],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /windspeeds
exports.getWindSpeeds = function (req, res) {
  connection.query(
    `SELECT timenow, wind_speed FROM weatherdata WHERE site_name = ? AND datenow = ?`,
    [req.params.site_name, req.params.datenow],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /chosen
exports.getChosen = function (req, res) {
  connection.query(
    `SELECT site_name, datenow, timenow, air_temperature, road_surface_temperature, wind_speed FROM weatherdata WHERE site_name = ? AND datenow = ? ORDER BY weatherdata.timenow`,
    [req.params.site_name, req.params.datenow],
    function (err, rows, fields) {
      if (err) throw err;
      res.status(200).json(rows);
    },
  );
};

// GET /users
exports.getUsers = function (req, res) {
  connection.query(`SELECT * FROM users`, function (err, rows, fields) {
    if (err) throw err;
    res.status(200).json(rows);
  });
};

// POST /users
exports.create = function (req, res) {
  connection.query(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [req.body.email, req.body.password],
    function (err, result) {
      if (err) throw err;
      res.status(201).json({ message: 'User created', id: result.insertId });
    },
  );
};

// POST /login
exports.loginUser = function (req, res) {
  connection.query(
    `SELECT COUNT(*) as count FROM users WHERE email = ? AND password = ?`,
    [req.body.email, req.body.password],
    function (err, rows, fields) {
      if (err) throw err;
      if (rows[0].count > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    },
  );
};
