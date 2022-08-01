function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let dates = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last updated: ${day} ${dates} ${month}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul id="daily">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
                <li id="day-one">
                  <span id="weather-forecast-day">${formatDay(
                    forecastDay.dt
                  )}</span>
                  <img id="icon-day-one" src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="" width="30">
                  <span id="weather-forecasttemp">
                    <span id="weather-forecast-temp-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                    <span id="weather-forecast-temp-max">/${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                  </span>
                </li>
    `;
    }
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "742a7afddcabe0ea280b64e9607b9a00";
  let units = "metric";
  let apiEndPointCoord = "https://api.openweathermap.org/data/2.5/onecall";
  let apiUrl = `${apiEndPointCoord}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureFeelsLike = response.data.main.feels_like;

  document.querySelector("#currcity").innerHTML = response.data.name;

  document.querySelector("#currtemp").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#currcondition").innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    "#weather-details-humidity"
  ).innerHTML = `Humidity ${response.data.main.humidity}%`;

  document.querySelector("#weather-details-wind").innerHTML = `Wind Speed ${
    Math.round(response.data.wind.speed) * 3.6
  } km/h`;

  document.querySelector(
    "#weather-details-pressure"
  ).innerHTML = `Pressure ${response.data.main.pressure} hPa`;

  document.querySelector("#icon").setAttribute(
    "src",
    `
      http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  document.querySelector(
    "#today-feels-like"
  ).innerHTML = `Feels like: ${Math.round(celsiusTemperatureFeelsLike)}`;

  document.querySelector("#temp-max").innerHTML = `Temp max: ${Math.round(
    response.data.main.temp_max
  )}`;

  document.querySelector("#temp-min").innerHTML = `Temp min: ${Math.round(
    response.data.main.temp_min
  )}`;

  document.querySelector("#today-sunrise").innerHTML = `Sunrise🌅: ${
    response.data.sys.sunrise * 1000
  }`;
  document.querySelector("#today-sunset").innerHTML = `Sunset🌇: ${
    response.data.sys.sunset * 1000
  }`;

  getForecast(response.data.coord);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#currtemp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#currtemp").innerHTML =
    Math.round(celsiusTemperature);
}

function searchInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-text").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "742a7afddcabe0ea280b64e9607b9a00";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function revealPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "742a7afddcabe0ea280b64e9607b9a00";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(revealPosition);
}
//Celsius
let celsiusTemperature = null;
//position
let button = document.querySelector("#search-location-button");
button.addEventListener("click", getCurrentPosition);

//function searchInput
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchInput);
//
//function formatDate
let currentTime = new Date();
document.querySelector("#currtime").innerHTML = formatDate(currentTime);

//function showFarenheitTemperature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
//functionCelsiusTemperature
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Buenos Aires");
displayForecast();
