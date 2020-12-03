const searchButton = document.getElementById('inputDivSearchButton')
searchButton.addEventListener('click', renderLocationData)
const userInput = document.getElementById('inputDivUserInput')
userInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
      renderLocationData()
    }
});
let loaderAnimation = document.querySelector('.hiddenLoader')

const defaultFunctions = {
    capitalize: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    removeLoader: () => {
        let animatedLoader = document.querySelector('.lds-ellipsis')
        animatedLoader.classList.remove('lds-ellipsis')
        animatedLoader.classList.add('hiddenLoader')
        loaderAnimation.classList.remove('lds-ellipsis')
        loaderAnimation.classList.add('hiddenLoader')
    },

    setLoader: () => {
        loaderAnimation.classList.remove('hiddenLoader')
        loaderAnimation.classList.add('lds-ellipsis')
    }
}

class Location {
    constructor(name, country, windSpeed, tempCelcius, humidity, realFeel, description, icon){
        this.name = name
        this.country = country
        this.windSpeed = windSpeed
        this.tempCelcius = tempCelcius
        this.humidity = humidity
        this.realFeel = realFeel
        this.description = description
        this.icon = icon
    }
}

async function _getLocationData () {
    let userInput = document.getElementById('inputDivUserInput').value
    
    try {
        let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&APPID=41183a89436afb18722ec0e4d0552f76`)
        let weather = await data.json()
        console.log(weather)
        return weather
    } catch (error){
        console.log(error)
        removeLoader()
    }
}

async function _setLocationData () {
    let weatherObject = new Location()
    try{
        let weather = await _getLocationData()
        let roundedTemp = Math.floor(weather.main.temp)
        let roundedRealFeel = Math.floor(weather.main.feels_like)
        let capitalisedDescription = defaultFunctions.capitalize(weather.weather[0].description)
        weatherObject.name = weather.name
        weatherObject.country = weather.sys.country
        weatherObject.windSpeed = weather.wind.speed
        weatherObject.tempCelcius = roundedTemp
        weatherObject.humidity = weather.main.humidity
        weatherObject.realFeel = roundedRealFeel
        weatherObject.description = capitalisedDescription
        weatherObject.icon = weather.weather[0].icon
        return weatherObject
    } catch {
        alert('City Not Found')
    }
}

async function renderLocationData() {
    let temperature = document.getElementById('infoDivTemperature')
    let description = document.getElementById('infoDivDescription')
    let location = document.getElementById('infoDivLocation')
    let wind = document.getElementById('infoDivDetailsWind')
    let humidity = document.getElementById('infoDivDetailsHumidity')
    let realFeel = document.getElementById('infoDivDetailsRealFeel')
    let icon = document.getElementById('iconURL')

    defaultFunctions.setLoader()
    let weatherObject =  await _setLocationData()
    defaultFunctions.removeLoader()

    description.textContent = `${weatherObject.description}`
    location.textContent = `${weatherObject.name}, ${weatherObject.country}`
    temperature.textContent = `${weatherObject.tempCelcius} C`
    wind.textContent = `Wind Speed: ${weatherObject.windSpeed}`
    humidity.textContent = `Humidity: ${weatherObject.humidity}`
    realFeel.textContent = `Feels like: ${weatherObject.realFeel} C`
    icon.src = `http://openweathermap.org/img/wn/${weatherObject.icon}@2x.png`
}
