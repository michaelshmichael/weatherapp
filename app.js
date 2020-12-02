const searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', setLocationData)

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

async function getLocationData () {
    let weatherObject = new Location()
    let userInput = document.getElementById('userInput').value
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&APPID=41183a89436afb18722ec0e4d0552f76`)
    let weather = await data.json()
    //console.log(weather)
        weatherObject.name = weather.name
        weatherObject.windSpeed = weather.wind.speed
        weatherObject.tempCelcius = weather.main.temp
        weatherObject.humidity = weather.main.humidity
        weatherObject.realFeel = weather.main.feels_like
        weatherObject.description = weather.weather[0].description
    return weatherObject
}

async function setLocationData () {
    let weatherObject = await getLocationData()
    console.log(weatherObject)
}