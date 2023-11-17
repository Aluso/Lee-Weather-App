function displaytemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.dt * 1000);
  timeElement.innerHTML = formartDate(date);
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    ".png";

  getForecast(response.data.name);
}

function searchCity(city) {
  let apiKey = "324bf5756d5c6887ac717d9d18ca8c52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaytemperature);
  console.log(apiUrl);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  return fahrenheitTemperature;
}
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  return celsiusTemperature;
}
let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", showCelsiusTemperature);

function formartDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInputElement.value;
  searchCity(searchInputElement.value);
}

function formartDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "d4b9bcb1eb123d3d2ed7a0teac2o4f01";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);

  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${formartDay(day.time)}</div>
               <div class="weather-forecast-icon">
               <img src= "${day.condition.icon_url}"/>
               </div>
                <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature"><strong>${Math.round(
                    day.temperature.maximum
                  )}</strong>°</div>
                  <div class="weather-forecast-temperature">${Math.round(
                    day.temperature.minimum
                  )}°</div>
              </div>
              </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Oyugis");
