const getWeatherInfo = (location, message_1, message_2, message_3, message_4, message_5, message_6, message_7, message_8) => {
    message_1.textContent = 'Loading....'
    message_2.textContent = message_3.textContent = message_4.textContent = ''
    message_5.textContent = message_6.textContent = message_7.textContent = message_8.textContent = ''
    fetch('/weather?address=' + decodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message_1.textContent = data.error
        }
        else {
            message_1.textContent = 'Temperature is ' + data.temperature + ' degrees F'
            message_2.textContent = 'Feels Like ' + data.feelslike + ' degrees F'
            message_3.textContent = 'Location is ' + data.location
            message_4.textContent = 'Timezone is ' + data.timezone
            message_5.textContent = 'Local Time is ' + data.localTime
            message_6.textContent = 'Latitude is ' + data.latitude + ' degrees'
            message_7.textContent = 'Longitude is ' + data.longitude + ' degrees'
            var time = ''
            if(data.is_day == 'no') { 
                time = 'night'
                
            } else {
                time = 'day'
            }
            message_8.textContent = 'It is ' + time + ' here right now!'
        }
    })
})
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message_1')
const message_2 = document.querySelector('#message_2')
const message_3 = document.querySelector('#message_3')
const message_4 = document.querySelector('#message_4')
const message_5 = document.querySelector('#message_5')
const message_6 = document.querySelector('#message_6')
const message_7 = document.querySelector('#message_7')
const message_8 = document.querySelector('#message_8')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    getWeatherInfo(location, message_1, message_2, message_3, message_4, message_5, message_6, message_7, message_8)
})