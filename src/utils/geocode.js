const request = require('request');

const geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFyaWtzaGl0eWFkYXYxMiIsImEiOiJja2Nua3RzNHEwYzZiMzNsdWEwc2VkbGdmIn0.7ycQEZS-B_4W-16rRHNn3w'
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location serices..');
        } else if(response.body.features.length === 0) {
            callback('Location not found. Please try another name for the location!');
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = {
    geocode: geocode
}