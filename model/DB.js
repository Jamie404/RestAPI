const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "weather2023",
  timezone: "utc+0",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Sucessfully connected to MySQL database..`);
});

///////////////////////////////////////////////////////////////////////////////////////////

// GET /sites
exports.getSites = function (req, res) {
  connection.query(
    `SELECT * FROM sites ORDER BY site_name ASC`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};

// GET /today
exports.getToday = function (req, res) {
  connection.query(
    `SELECT site_name, ROUND(AVG(air_temperature),1) AS air_temperature, ROUND(AVG(road_surface_temperature),1) AS road_surface_temperature, ROUND(AVG(wind_speed),1) AS wind_speed FROM weatherdata WHERE datenow='${req.params.datenow}' GROUP BY site_name ORDER BY weatherdata.site_name`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /sitedata
exports.getSiteData = function (req, res) {
  connection.query(
    `SELECT datenow,timenow,site_name,air_temperature,precipitation_type,wind_speed,road_surface_temperature,wind_direction_bearing,weather_description FROM weatherdata WHERE site_name="${req.params.site_name}"`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /weatherdata
exports.getWeatherData = function (req, res) {
  connection.query(`SELECT * FROM weatherdata`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200); // OK
    res.send(JSON.stringify(rows, null, 2));
  });
};
// GET /weatherdata
exports.getWeatherDataSites = function (req, res) {
  connection.query(
    `SELECT DISTINCT(site_name) FROM weatherdata order by weatherdata.site_name`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /weatherdataaverage
exports.getWeatherDataAverage = function (req, res) {
  connection.query(
    `SELECT AVG(air_temperature) AS airAverage, AVG(road_surface_temperature) AS roadAverage, AVG(wind_speed) AS windAverage FROM weatherdata`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /chosenAverage
exports.getChosenAverage = function (req, res) {
  connection.query(
    `SELECT ROUND(AVG(air_temperature),1) AS airAverage, ROUND(AVG(road_surface_temperature),1) AS roadAverage, ROUND(AVG(wind_speed),1) AS windAverage FROM weatherdata WHERE site_name="${req.params.site_name}" AND datenow="${req.params.datenow}"`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /weatherdataaverage
exports.getWeatherDataMinMax = function (req, res) {
  connection.query(
    `SELECT MIN(air_temperature) AS minAir, MIN(wind_speed) AS minWind, MAX(air_temperature) AS maxAir, MAX(wind_speed) AS maxWind FROM weatherdata WHERE site_name="${req.params.site_name}"`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /dailystats
exports.getDayStats = function (req, res) {
  connection.query(
    `SELECT site_name, datenow, ROUND(MIN(air_temperature),1) AS minAir, ROUND(MAX(air_temperature),1) AS maxAir, ROUND(AVG(wind_speed),3) AS meanWind, ROUND(MAX(wind_speed),1) AS maxWind, ROUND(MIN(wind_speed),1) AS minWind  FROM weatherdata WHERE site_name = "${req.params.site_name}" AND datenow = '${req.params.datenow}' GROUP BY site_name `,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /windspeeds
exports.getWindSpeeds = function (req, res) {
  connection.query(
    `SELECT timenow, wind_speed FROM weatherdata WHERE site_name = "${req.params.site_name}" AND datenow = '${req.params.datenow}'`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
// GET /windspeeds
exports.getChosen = function (req, res) {
  connection.query(
    `SELECT site_name, datenow,timenow,air_temperature,road_surface_temperature,wind_speed FROM weatherdata WHERE site_name = "${req.params.site_name}" AND datenow = '${req.params.datenow}' ORDER BY weatherdata.timenow`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};

// GET /login
exports.getUsers = function (req, res) {
  connection.query(`SELECT * FROM users`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200); // OK
    res.send(JSON.stringify(rows, null, 2));
  });

  exports.create = function (req, res) {
    connection.query(
      `INSERT INTO users (email, password) VALUES ("${req.body.email}", "${req.body.password}")`,
      function (err, rows, fields) {
        if (err) throw err;

        res.status(200); // OK
        res.send(JSON.stringify(rows, null, 2));
      }
    );
  };
};

// Login
exports.loginUser = function (req, res) {
  connection.query(
    `SELECT COUNT(*) FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows, null, 2));
    }
  );
};
