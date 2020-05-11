const request = require("request");

const locationFinder = (location) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoieWFoeWFyZWhtYW4iLCJhIjoiY2s5dWpta3V3MDJicTNmb3N0YTNnZzNvayJ9.Qli-27a_xNofZ0WFz5SwnA`;

  if (location.length === 0)
    throw new Error("Aray bhai location tou enter kar ");

  const locationRequest = new Promise((resolve, reject) => {
    return request(
      {
        url: geocodeURL,
        json: true,
      },
      (error, response) => {
        // console.log(response.body);
        if (error) {
          reject(error);
        } else if (response.body.features.length === 0) {
          reject("enter valid location ffs");
        } else {
          //  data = JSON.parse(response.body);
          // no need as we set json property in request object

          const data = response.body;

          const cleanerData = data.features[0];

          const longitude = cleanerData.center[0];
          const lattitude = cleanerData.center[1];
          const location = cleanerData.place_name;

          resolve({ longitude, lattitude, location });
        }
      }
    );
  });

  return locationRequest;
};

module.exports.locationFinder = locationFinder;

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
