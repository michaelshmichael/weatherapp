const searchButton = document.getElementById('inputDivSearchButton')
const userInput = document.getElementById('inputDivUserInput')
searchButton.addEventListener('click', renderLocationData)

userInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
      renderLocationData()
    }
});

class Location {
    constructor(name, country, windSpeed, tempCelcius, humidity, realFeel, description){
        this.name = name;
        this.country = country
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
    console.log(weather)
    return weather
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

async function _setLocationData () {
    let weatherObject = new Location()
    let weather = await _getLocationData()
    let roundedTemp = Math.floor(weather.main.temp)
    let roundedRealFeel = Math.floor(weather.main.feels_like)
    let capitalisedDescription = capitalize(weather.weather[0].description)
    
    weatherObject.name = weather.name
    weatherObject.country = weather.sys.country
    weatherObject.windSpeed = weather.wind.speed
    weatherObject.tempCelcius = roundedTemp
    weatherObject.humidity = weather.main.humidity
    weatherObject.realFeel = roundedRealFeel
    weatherObject.description = capitalisedDescription
    return weatherObject
}

async function renderLocationData() {
    let temperature = document.getElementById('infoDivTemperature')
    let description = document.getElementById('infoDivDescription')
    let location = document.getElementById('infoDivLocation')
    let wind = document.getElementById('infoDivDetailsWind')
    let humidity = document.getElementById('infoDivDetailsHumidity')
    let realFeel = document.getElementById('infoDivDetailsRealFeel')

    let loaderAnimation = document.querySelector('.hidden')
    loaderAnimation.classList.remove('hidden')
    loaderAnimation.classList.add('lds-ellipsis')
    let weatherObject =  await _setLocationData()
    loaderAnimation.classList.remove('lds-ellipsis')
    loaderAnimation.classList.add('hidden')

    description.textContent = weatherObject.description
    location.textContent = `${weatherObject.name}, ${weatherObject.country}`
    temperature.textContent = `${weatherObject.tempCelcius} C`
    wind.textContent = `Wind Speed: ${weatherObject.windSpeed}`
    humidity.textContent = `Humidity: ${weatherObject.humidity}`
    realFeel.textContent = `Feels like: ${weatherObject.realFeel} C`
}
