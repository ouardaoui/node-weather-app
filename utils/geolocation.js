const axios = require("axios")
const geolocation = (address, callback) => {
  const geolocationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?access_token=pk.eyJ1IjoiYXlvdWJpeW8iLCJhIjoiY2t4aGo5NXR2MG02MzJva2pzYmVobTk5dyJ9.cJvGmp8mPQk4GZgYzikIDA&https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXlvdWJpeW8iLCJhIjoiY2t4aGo5NXR2MG02MzJva2pzYmVobTk5dyJ9.cJvGmp8mPQk4GZgYzikIDA&https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXlvdWJpeW8iLCJhIjoiY2t4aGo5NXR2MG02MzJva2pzYmVobTk5dyJ9.cJvGmp8mPQk4GZgYzikIDA&limit=1`
  axios.get(geolocationURL).then((response) => {
    if (response.data.features.length === 0) {
      callback(undefined, "Unable to find location,try another search")
    } else {
      const [longitude, latitude] = response.data.features[0].center
      const location = response.data.features[0].place_name
      callback({ longitude, latitude, location }, undefined)
    }
  }).catch((err) => {

    callback(undefined, "Unable to connected")
  })
}
module.exports = geolocation


