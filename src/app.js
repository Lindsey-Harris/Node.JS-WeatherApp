const path = require('path') //no need to install since it is a core module(built in)
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')

const app = express() //express server found the matching route down below

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')//set allows you to set a value for a given express setting
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (_req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Lindsey Harris'
    })//use render to allows render one of our views.Can render the hbs template

})

app.get('/about', (_req, res) => {
    res.render('About', {
        title: 'About Me',
        name: 'Lindsey Harris'
    })
})

app.get('/help', (_req, res) => {
    res.render('Help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Lindsey Harris'
    })
})

app.get('/weather', (req, res) => {  
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        } )

    })
})
//processed the request using our handler
//allows us to send something back to the requestor


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })

    }

    console.log(req.query.search)
    res.send({
        products: []
    })

})
//http request has a single request that goes to the server 
//and has a single reponse that comes back.

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Lindsey Harris',
        errorMessage: 'Help article not found.' 
    })
})

app.get('*', (_req, res) => { 
    res.render('404', {
        title: "404",
        name: "Lindsey Harris",
        errorMessage: 'Page not found.'
    })
})
//express provides us with the wildcard character.Which means match anything that hasnt
//been matched so far.
//* can match every request or any route that matches that specific pattern.
//example is localhost:3000/help/data would show "My 404 Page"
//because it does not exist.

//set a new route using app.get
//how to set up your server to send a response when someone tries to get something at a specific route?
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on PORT 3000.')
})

//use control + c to shut down the web server.
//__dirname is the path to the folder app.js lives in