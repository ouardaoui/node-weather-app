const axios = require("axios")
const forecast = (longitude, latitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=162b2f2b843e4600ca18ec637c5fcb33&query=" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude)
  axios.get(url)
    .then((response) => {
      const data = response.data
      if (data.error) {
        callback(undefined, data.error.info)
      } else if (data.current) {
        callback({
          temperature: data.current.temperature,
          description: data.current.weather_descriptions[0],
          precipitation: data.current.precip * 10 + "%"
        }, undefined)
      }

    })
    .catch((err) => {
      callback(undefined, "Unable to connected")
    })
}

module.exports = forecast