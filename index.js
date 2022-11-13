let searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', () => {
    getWeatherData();
});

function getUnit() {
    return (document.querySelector('input[name="temperature"]:checked')).value;
}

function getCity() {
    let cityField = document.querySelector('#city');
    return cityField.value;
}

/* function getWeatherData() {
    let params = [26, 11, 12, 13, 14, 15];
    displayData(params);
    return params;
} */

async function getWeatherData() {
    try {
        let tempUnit = getUnit();
        let cityName = getCity();
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=786f8991633c836ff45fc0636663f50c&units=${tempUnit}`, {mode: 'cors'});
        const mainData = await data.json();
        let params = [mainData.main.temp, mainData.main.feels_like, mainData.main.temp_max,
            mainData.main.temp_min, mainData.main.pressure, mainData.main.humidity];
        displayData(params);
        let weather = weatherDescription(mainData.main.temp);
        getImage(weather);
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

function displayData(params) {
    displayResults.textContent = '';
    let unitVal = getUnit();
    let unit = '';
    if (unitVal === 'metric') {
        unit = ' \xB0' + 'C';
    } else {
        unit = ' \xB0' + 'F';
    }

    displayDataElement('Temperature', params[0] + unit);
    displayDataElement('Feels like', params[1] + unit);
    displayDataElement('Max temperature', params[2] + unit);
    displayDataElement('Min temperature', params[3] + unit);
    displayDataElement('Pressure', params[4] + ' hPa');
    displayDataElement('Humidity', params[5] + ' %');
}




const img = document.querySelector('img');

function weatherDescription(temp) {
    let weather = '';
    let tempUnit = getUnit();
    if (tempUnit !== 'metric') {
        temp = (temp - 32) / 1.8;
    }
    if (temp < 5) {
        weather =  'snow';
    } else if (temp < 15) {
        weather =  'autumn';
    } else if (temp < 30) {
        weather =  'sunny';
    } else {
        weather =  'heatwave';
    }
    return weather;
}

function getImage(weather) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=nqIKYa5RrruB2FzH1wAmvlJXP6KkdaOW&s=${weather}`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        img.src = response.data.images.original.url;
    });
}
