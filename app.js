const searchButton = document.getElementById('inputDivSearchButton')
searchButton.addEventListener('click', renderLocationData)

class Location {
    constructor(name, windSpeed, tempCelcius, humidity, realFeel, description){
        this.name = name;
        this.windSpeed = windSpeed;
        this.tempCelcius = tempCelcius;
        this.humidity = humidity;
        this.realFeel = realFeel
        this.description = description
    }
}

async function _getLocationData () {
    let userInput = document.getElementById('inputDivUserInput').value
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&APPID=41183a89436afb18722ec0e4d0552f76`)
    let weather = await data.json()
    return weather
}

async function _setLocationData () {
    let weatherObject = new Location()
    let weather = await _getLocationData()
        weatherObject.name = weather.name
        weatherObject.windSpeed = weather.wind.speed
        weatherObject.tempCelcius = weather.main.temp
        weatherObject.humidity = weather.main.humidity
        weatherObject.realFeel = weather.main.feels_like
        weatherObject.description = weather.weather[0].description
    return weatherObject
}

async function renderLocationData() {
    let temperature = document.getElementById('infoDivTemperature')
    let description = document.getElementById('infoDivDescription')
    let location = document.getElementById('infoDivLocation')
    let wind = document.getElementById('infoDivDetailsWind')
    let humidity = document.getElementById('infoDivDetailsHumidity')
    let realFeel = document.getElementById('infoDivDetailsRealFeel')
    let weatherObject =  await _setLocationData()

    description.textContent = weatherObject.description
    location.textContent = weatherObject.name
    temperature.textContent = `${weatherObject.tempCelcius} C`
    wind.textContent = `Wind Speed: ${weatherObject.windSpeed}`
    humidity.textContent = `Humidity: ${weatherObject.humidity}`
    realFeel.textContent = `Feels like: ${weatherObject.realFeel}`
}