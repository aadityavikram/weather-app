const request = require('request')

const weatherCallback = (error, res, {temperature, feelslike, location, address, is_day, timezone, localTime, latitude, longitude} = {}) => {
    if (error) {
        return res.send({error})
    } else {
        return res.send({temperature, feelslike, location, address, is_day, timezone, localTime, latitude, longitude})
    }
}

const weatherData = (latitude, longitude, location, res, address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b6d3a0339b963f2994f1dba1054057f&query=' + latitude.toString() + ',' + longitude.toString() + '&units=f'
    
    // request will have only one or error or response not both.
    // so if one exists, other does not.
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Weather Service!', res, undefined)
        } else if (body['error']) {
            callback('Cannot find weather data for coordinates = [' + latitude + ',' + longitude + ']!', res, undefined)
        }
        else {
            const locationDict = body['location']
            const timezone = locationDict['timezone_id']
            const localTime = locationDict['localtime']
            const current = body['current']
            const temperature = current['temperature']
            const feelslike = current['feelslike']
            const is_day = current['is_day']
            callback(undefined, res, {temperature, feelslike, location, address, is_day, timezone, localTime, latitude, longitude})
        }
    })
}

const forecast = (latitude, longitude, location, res, address) => {
    weatherData(latitude, longitude, location, res, address, weatherCallback)
}

module.exports = forecast