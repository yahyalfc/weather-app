const path = require("path");

const express = require("express");
const hbs = require("hbs");
const chalk = require("chalk");
const geocode = require("./utils/geocode");
const weather = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, "../public"); //for static resources
const viewsPath = path.join(__dirname, "../templates/views"); //for views
const partialsPath = path.join(__dirname, "../templates/partials"); //for partial views

//Setup handlebars engine and views locations
app.set("view engine", "hbs"); //For dynamic content we use hbs. npm i hbs
app.set("views", viewsPath); //for changing the path from views to let say templates. by default its in views folder
hbs.registerPartials(partialsPath);

//linking public directory for static resourcesß
app.use(express.static(publicDirectory)); // serve static content

//dynamic hbs resouces, views and all
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather API",
    content: "This is a weather api",
    name: "Yahya Rehman", //change the name and different name will appear
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    content:
      "This is a simple weather app. Enter the location you want to check the weather of. Also get an endpoint to fetch data.",
    name: "Yahya Rehman",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    content: "This is the help page",
    name: "Yahya Rehman",
  });
});

//weather endpoint
app.get("/weather", (req, res) => {
  //http://localhost:3000/weather?address=islamabad

  if (!req.query.address) {
    return res.send({
      error: "Provide an address",
    });
  }

  geocode
    .locationFinder(req.query.address)
    .then((data) => {
      const { lattitude, longitude, location } = data;
      //destructuring from data object
      // console.log(data);
      return weather.weatherDeets(lattitude, longitude); //promise chaining
    })
    .then((newData) => {
      console.log(newData);
      res.send({
        address: req.query.address.capitalize(),
        country: newData.location.country,
        longitude: newData.location.lon,
        lattitude: newData.location.lat,
        temperature: newData.current.temperature,
        link: `/weather?address=${req.query.address}`,
        forecast: weather.objectSeparator(newData, {
          location: req.query.address,
        }),
        // forecast: newData.current.weather_descriptions[0],
        "wind-speed": newData.current.wind_speed,
      });
    })
    .catch((err) => {
      res.send({
        error: err,
      });
      console.log(chalk.red(err));
    });
});

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
/*
app.get("/products", (req, res) => {
  // http://localhost:3000/products?search=games&rating=5
  console.log(req.query); // {search: 'games', rating: '5'}
  if (!req.query.search) {
    return res.send({
      error: "Provide a search term",
    });
  }

  res.send({
    products: [],
  });
});
*/

/* for help/xyz not found */

app.get("/help/*", (req, res) => {
  res.render("help", {
    content: "this is help/xyz page",
    name: "Yahya Rehman",
  });
});
//for 404 error page. It needs to come last after every route
//wildcard handler -when
app.get("*", (req, res) => {
  res.render("error", {
    //name of hbs view
    name: "yoyo",
    errMessage: "404 error, page not found",
  });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
