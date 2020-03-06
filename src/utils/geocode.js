const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiamltbXltdWxsIiwiYSI6ImNrNDQyNHJ1azBkMmMzbXFjMnY1bGo2bmoifQ.tzQdKPNovHfOdD51EYiLlQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      const result = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      };
      callback(undefined, result);
    }
  });
};
module.exports = geocode;
