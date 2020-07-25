const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
 
app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather App!',
        name: 'Parikshit Yadav'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Parikshit Yadav'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text!!',
        title: 'Help',
        name: 'Parikshit Yadav'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    var address = req.query.address;
    geocode.geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast.forecast(data.latitude, data.longitude, (errorObj, dataObj) => {
            if (errorObj) {
                return res.send({
                    error: errorObj
                });
            }
            res.send({
                forecast: dataObj,
                location: data.location,
                address: address
            });
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Error',
        name: 'Parikshit Yadav'
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Parikshit Yadav',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
})