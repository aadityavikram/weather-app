const request = require('request')
const forecast = require('./forecast.js')

const locationCallback = (error, res, {latitude, longitude, location, address} = {}) => {
    if (error) {
        return res.send({error})
    } 
    forecast(latitude, longitude, location, res, address)
}

const locationData = (address, res, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWFkaXR5YXZpa3JhbSIsImEiOiJja2Z4MmJ3Z3cwaGFjMnpvOGZ4bzIzYXgyIn0.M1erbTKBCo_Qc3TYAog22A"
    
    // request will have only one or error or response not both.
    // so if one exists, other does not.
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Location Service!', res, undefined)
        } else if (body['message'] || body['features'].length === 0) {
            callback('Cannot find location!', res, undefined)
        } 
        else {
            const features = body['features'][0]
            const latitude = features['center'][1]
            const longitude = features['center'][0]
            const location = features['place_name']
            callback(undefined, res, {latitude, longitude, location, address})
        }
    })
}

const geocode = (address, res) => {
    locationData(address, res, locationCallback)
}

module.exports = geocode