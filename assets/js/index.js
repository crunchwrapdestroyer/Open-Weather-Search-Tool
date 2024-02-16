function handleFormSubmit (event){
    event.preventDefault()
    var userInput = document.getElementById('user-input');
    console.log(userInput.value)
    fetchWeatherAPI(userInput.value)
}

function fetchWeatherAPI(cityToSearchFor){
    console.log("fetch weather for : ", cityToSearchFor)
    var APIKey = "581c60614709af9baad1e46a5eafeff5";
    var fullURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityToSearchFor}&appid=${APIKey}&units=imperial`
    fetch(fullURL).then(function(response){
        // console.log(response)
        return response.json()
    }).then(function(data){
        makeMainCard(data)
        fetchForecastAPI(cityToSearchFor)
    })
}

function fetchForecastAPI(cityToSearchFor){
    var APIKey = "581c60614709af9baad1e46a5eafeff5";
    var fullURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearchFor}&appid=${APIKey}&units=imperial`
    fetch(fullURL).then(function(response){
        // console.log(response)
        return response.json()
    }).then(function(data){
        makeForecastCards(data)
    })
}

function makeMainCard(weatherData) {
    console.log(weatherData) 
    var currentWeatherContainer = document.getElementById('currentweather-container')
    var dateAndTime = new Date(weatherData.dt * 1000)
    var date = dateAndTime.toLocaleDateString()
        console.log(date)
        var cardInnerHTML = `
            <p>${date}</p>
            <h1>${weatherData.name}</h1>
            <p>${weatherData.main.temp} °F</p>
            <p>Wind: ${weatherData.wind.speed} MPH</p>
            <p>Humidity: ${weatherData.main.humidity}</p>
            <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png"><img>
        `
        currentWeatherContainer.innerHTML = cardInnerHTML
    }

function makeForecastCards (forecastData) {
    console.log(forecastData)
    var foreCastList = forecastData.list
    var forecastContainerParent = document.getElementById('forecast-container')

    for (let i = 0; i < foreCastList.length; i+=8) {
        const dayWeather = foreCastList[i];
        console.log(dayWeather)
        var dateAndTime = new Date(forecastData.dt * 1000)
        var date = dateAndTime.toLocaleDateString()

        var cardInnerHTML = `
            <p>${date}</p>
            <h1>${dayWeather.list.name}</h1>
            <p>${dayWeather.main.temp} °F</p>
            <p>Wind: ${dayWeather.wind.speed} MPH</p>
            <p>Humidity: ${dayWeather.main.humidity}</p>
            <img src="https://openweathermap.org/img/w/${dayWeather.weather[0].icon}.png"><img>
        `
        forecastContainer.innerHTML = cardInnerHTML
        forecastContainerParent.appendChild(forecastContainer)
    }
}
    
const searchForm = document.getElementById('search-form');
searchForm.addEventListener("submit",handleFormSubmit)
