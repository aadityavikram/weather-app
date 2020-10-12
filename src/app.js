const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000

// paths for express
const staticPath = path.join(__dirname, '../static')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// express configs for view engine and views directory
// register path for hbs partials that will be reused on multiple pages
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set to use static files
app.use(express.static(staticPath))

// callback function for rendering home page
const homePage = (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aaditya Vikram',
        description: 'Get Weather Info!'
    })
}

// callback function for rendering about page
const aboutPage = (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aaditya Vikram',
        image: '/img/robot.png',
        alt: 'robot'
    })
}

// callback function for rendering help page
const helpPage = (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aaditya Vikram',
        description: 'Enter your address (along with state and country) in search bar on Home page and press Enter or click on Search! button. Weather Info will be output on the Home Page itself.'
    })
}

// callback function for rendering weather page
const weatherPage = (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, res)
}

// callback function for rendering error subpage for help page
const helpErrorPage = (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aaditya Vikram',
        description: '404 Help Article Not Found!'
    })
}

// callback function for rendering error page
const errorPage = (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aaditya Vikram',
        description: '404 Not Found!'
    })
}

// message that gets logged when server starts running
const serverMessage = () => {
    console.log('Server is running at port ' + port)
}

// setting up all pages
// set error page at last because 
// express checks through pages in order of placement in code
// * means any other that has not come before
app.get('', homePage)
app.get('/about', aboutPage)
app.get('/help', helpPage)
app.get('/weather', weatherPage)
app.get('/help/*', helpErrorPage)
app.get('*', errorPage)
app.listen(port, serverMessage)