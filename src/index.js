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

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forcast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tues", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <h5>${day}</h5>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img
                    src="http://openweathermap.org/img/wn/10d@2x.png"
                    alt="Clear"
                    class="float-left"
                    id="icontwo" />
                  <p class="temp">46°</p>
                </div>
                <div class="flip-card-back">
                  <p>Cloudy</p>
                  <p>Humidity: 60%</p>
                  <p>Wind: 10 mph</p>
                </div>
              </div>
            </div>
          </div>
        `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#tempe");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = Math.round(fahrenTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#tempe");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemperature = null;

function getForecast(coordinates) {
  let apiKey = `374d348affb35ed40a6f8a1oa7fc8tc6`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function weather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperature = document.querySelector("#tempe");
  temperature.innerHTML = Math.round(celsiusTemperature);

  let description = document.querySelector("#describe");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;

  let iconCloudy = document.querySelector("#iconCloudy");
  iconCloudy.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCloudy.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
