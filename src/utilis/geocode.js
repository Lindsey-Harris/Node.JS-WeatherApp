const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGhhcnJpNTkiLCJhIjoiY2xlNXMxbDZjMGRvZDN3bnFwdDlldTVnNiJ9.2x7cw1LFvJPUGHUHG1UC7A' 
  
    request({ url, json: true}, (error, { body }) => {
      if(error) {
          callback('Unable to connect to location services!', undefined)
      } else if(body.features.length === 0) {
          callback('Unable to find location. Try another search.', undefined)
      } else {
          callback(undefined, {
              latitude: body.features[0].center[0],
              longitude: body.features[0].center[1],
              location: body.features[0].place_name
          })
      }
  
    })
  }

  module.exports = geocode

//encodeURIComponent function returns a string
//and that gets placed in the URL
