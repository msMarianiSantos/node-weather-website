const path = require('path')
const express = require("express")
const hbs = require('hbs')
const app = express()

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

// express config to define paths 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup do handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup satic directure to serve a expresss aplication 
app.use(express.static(publicDirectoryPath))




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mari Santos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mari Santos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mari Santos',
        helpText: 'This page should have information to help you, in case you not find any, call 190'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must inform the address to get the weather' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        forecast(latitude, longitude, (error, forecastData,feelslike, humidity) => {
            if (error) {
                return res.send({ error: error })
            }
            return res.send({
                location,
                forecastData,
                feelslike,
                humidity
            })
        })

    })

})

app.get('/products', (req, res) => {
    res.send({
        products: [],

    })
})


app.get('/help/*', (req, res) => {// tudo que não esta listado dentro desse dominio
    res.render('notFound', {
        title: '404 ',
        name: 'Mari Santos',
        errorMsg: ' Help article not found. '
    })
})
app.get('*', (req, res) => {// tudo que não esta listado acima  
    res.render('notFound', {
        title: '404 ',
        name: 'Mari Santos',
        errorMsg: 'Page not found'
    })
})
app.listen(process.env.PORT || 3000, () => {
    console.log("server started - up up on port 3000")
})