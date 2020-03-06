const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/74452fb76a63060e70b904815aa5e0b4/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Error connecting to DarkSky service", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          "The current temperature is " +
          body.currently.temperature +
          " degrees and there is a " +
          body.currently.precipProbability * 100 +
          "% chance of rain. The max temperature today will be " +
          body.daily.data[0].temperatureMax +
          " degrees"
      );
    }
  });
};
module.exports = forecast;
