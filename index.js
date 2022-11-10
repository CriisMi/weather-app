async function getWeatherData(cityName) {
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ea62a80e0665de9807ac66ce6c9793ce&units=metric`, {mode: 'cors'});
        const mainData = await data.json();
        console.log(mainData.main);
        return mainData.main;
    } catch (error) {
        console.log(error);
    }
}

let searchButton = document.querySelector('.search-button');
let cityField = document.querySelector('#city');
searchButton.addEventListener('click', () => {
    let city = cityField.value;
    getWeatherData(city);
})