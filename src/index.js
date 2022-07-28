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

  return `${day} ${dates} ${month}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#currcity").innerHTML = response.data.name;

  document.querySelector("#currtemp").innerHTML = Math.round(
    response.data.main.temp
  );

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
//

searchCity("Buenos Aires");
