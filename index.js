async function getWeatherData(cityName) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ea62a80e0665de9807ac66ce6c9793ce&units=metric`, {mode: 'cors'});
        const mainData = await data.json();
        console.log(mainData.main);
        displayData(mainData.main.temp, mainData.main.feels_like, mainData.main.temp_max,
            mainData.main.temp_min, mainData.main.pressure, mainData.main.humidity);
    } catch (error) {
        console.log(error);
    }
}

let displayResults = document.querySelector('.results');

function displayDataElement(name, data) {
    let element = document.createElement('div');
    element.textContent = `${name}:`;
    element.setAttribute('class', 'data-name');
    displayResults.appendChild(element);
    let dataElement = document.createElement('div');
    dataElement.textContent = data;
    displayResults.appendChild(dataElement);
}

function displayData(temp, feelsLikeTemp, tempMax, tempMin, pressure, humidity) {
    displayResults.textContent = '';

    displayDataElement('Temperature', temp);
    displayDataElement('Feels like', feelsLikeTemp);
    displayDataElement('Max temperature', tempMax);
    displayDataElement('Min temperature', tempMin);
    displayDataElement('Pressure', pressure);
    displayDataElement('Humidity', humidity);
}


let searchButton = document.querySelector('.search-button');
let cityField = document.querySelector('#city');
searchButton.addEventListener('click', () => {
    let city = cityField.value;
      let weatherData = getWeatherData(city);
});