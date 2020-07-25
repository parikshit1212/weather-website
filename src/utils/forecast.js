const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b247e27725e176a5fc8de4b61b07865d&query=' + latitude + ',' + longitude; 
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services');
        } else if(response.body.error) {
            callback('Unable to find the location..Please try with other name..');
        } else {
            var data = response.body.current.weather_descriptions[0] + ". The temperature is " + response.body.current.temperature + " but it feels like " + response.body.current.feelslike;
            callback(undefined, data);
        }
    })
}

module.exports = {
    forecast: forecast
}