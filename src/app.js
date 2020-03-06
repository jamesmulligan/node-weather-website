const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Homepage",
    name: "James"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "This is some helpful text",
    name: "Jimbo"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Jim"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(req.query.address, (error, result) => {
    if (error) {
      return res.send({
        error: "The geocode service returned an error"
      });
    }
    // console.log("Error", error);
    // console.log("Data", geoData);

    forecast(result.latitude, result.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "The DarkSky weather service returned an error"
        });
      }
      console.log("Forecast for " + result.location);
      console.log(forecastData);
      res.send({
        title: "Weather Forecast",
        name: "Jim",
        location: result.location,
        forecast: forecastData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorText: "This is the help section error page",
    name: "Jimmy"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorText: "This is the generic error page",
    name: "Jim"
  });
});

app.listen(3000, () => {
  console.log("Service is up on port 3000 and Neil is not the best.");
});
