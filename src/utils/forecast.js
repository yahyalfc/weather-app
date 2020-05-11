const request = require("request");

const weatherDeets = (lattitude, longitude) => {
  const weatherurl = `http://api.weatherstack.com/current?access_key=9241c8e9d93449b6e80dbd0698f6d1a7&query=${lattitude},${longitude}&units=m`;
  //units s for kelvin, f for farenheeit
  const weatherRequest = new Promise((resolve, reject) => {
    return request(
      {
        url: weatherurl,
        json: true,
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          //  data = JSON.parse(response.body);
          // no need as we set json property in request object
          const data = response.body;
          resolve(data);
          //   console.log(data.current);
          //   console.log(data.location);
        }
      }
    );
  });
  return weatherRequest;
};

const objectSeparator = (object, place) => {
  const forecast = `${object.current.weather_descriptions}. it is currently ${object.current.temperature} degrees in ${place.location} but feels like ${object.current.feelslike} degrees `;
  return forecast;
};

module.exports = {
  weatherDeets,
  objectSeparator,
};

/*
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      //resolve("here take THIS awesome data");
      reject("here take THIS error");
    }, 2000);
  });
  
  myPromise
    .then((data) => {
      console.log(data);
      //when promise gets resolved
    })
    .catch((error) => {
      console.log(error);
    });
    */
