const getWeatherInfo = (location, message_1, message_2, message_3, message_4) => {
    message_1.textContent = 'Loading....'
    message_2.textContent = message_3.textContent = message_4.textContent = ''
    fetch('http://localhost:3000/weather?address=' + decodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message_1.textContent = data.error
        }
        else {
            message_1.textContent = 'Temperature is ' + data.temperature + ' degrees'
            message_2.textContent = 'Feels Like ' + data.feelslike + ' degrees'
            message_3.textContent = 'Location is ' + data.location
            var time = ''
            if(data.is_day == 'no') { 
                time = 'day'
                
            } else {
                time = 'night'
            }
            message_4.textContent = 'It is ' + time + ' here right now!'
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

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    getWeatherInfo(location, message_1, message_2, message_3, message_4)
})