function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  let formattedDate = `${currentDay} ${currentHour}: ${currentMin}`;
  return formattedDate;
}
let currentTime = new Date();
let time = document.querySelector("#date");
time.innerHTML = currentDate(currentTime);

function convertToCelsius(event) {
  event.preventDefault();
  let celTemp = document.querySelector("#tempe");
  celTemp.innerHTML = 8;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let farTemp = document.querySelector("#tempe");
  farTemp.innerHTML = 48;
}

function weather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let temperature = document.querySelector("#tempe");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let description = document.querySelector("#describe");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
}

function searchCity(city) {
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#enterhere-input").value;
  searchCity(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchButton);

function searchLocation(position) {
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}
function locate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("button");
currentButton.addEventListener("click", locate);

searchCity("Woodbridge");
