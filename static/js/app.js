const getWeatherInfo = (location, message_1, message_2, message_3, message_4, message_5, message_6, message_7, message_8, message_9, weatherTable) => {
    message_1.textContent = 'Loading....'
    message_2.textContent = message_3.textContent = message_4.textContent = ''
    message_5.textContent = message_6.textContent = message_7.textContent = message_8.textContent = ''
    message_5.textContent = ''
    fetch('/weather?address=' + decodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message_1.style.display = 'flex'
            message_1.textContent = data.error
        }
        else {
            message_1.style.display = 'none'
            weatherTable.style.display = 'flex'
            message_2.textContent = data.temperature
            message_3.textContent = data.feelslike
            message_4.textContent = data.location
            message_5.textContent = data.timezone
            message_6.textContent = data.localTime
            message_7.textContent = data.latitude
            message_8.textContent = data.longitude
            var time = ''
            if(data.is_day == 'no') { 
                time = 'night'
                
            } else {
                time = 'day'
            }
            message_9.textContent = time
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
const message_9 = document.querySelector('#message_9')
const weatherTable = document.querySelector('#weatherTable')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    weatherTable.style.display = 'none'
    getWeatherInfo(location, message_1, message_2, message_3, message_4, message_5, message_6, message_7, message_8, message_9, weatherTable)
})