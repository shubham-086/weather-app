async function fetchWeather() {
  const city = document.getElementById("searchCity").value || "Lucknow";
  const apiUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9198aaca27msh3ed14986f5ed910p1b3b8djsncff0341ebe94",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    let data = await response.json();

    console.log(data); //to display data in console.

    displayCurrentWeather(data);
    displayForecast(data.forecast.forecastday);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// window.onload(fetchWeather());
window.addEventListener("load", fetchWeather());

function displayCurrentWeather(data) {
  const current = data.current;
  const location = data.location;

  const currentWeatherHtml = `
    <h3>Weather in ${location.name}, ${location.country}</h3>
    <p><img src="${current.condition.icon}" alt="${current.condition.text}" /> ${current.condition.text}</p>
    <p class="lead">Temp: ${current.temp_c}°C (Feels like ${current.feelslike_c}°C)</p>
    <p>Wind: ${current.wind_kph} kph | Humidity: ${current.humidity}% | UV: ${current.uv}</p>
  `;

  const weatherCard = document.getElementById("currentWeather");
  weatherCard.innerHTML = currentWeatherHtml;
  weatherCard.classList.add("show");
}

function displayForecast(forecastDays) {
  const forecastHtml = forecastDays
    .map((day) => {
      return `
      <div class="col-md-4">
        <div class="card glassmorphism p-3">
          <h5 class="card-title">${new Date(day.date).toDateString()}</h5>
          <div class="card-body">
            <img src="${day.day.condition.icon}" alt="${
        day.day.condition.text
      }" />
            <div>
              <p>${day.day.condition.text}</p>
              <p>Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C</p>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  document.getElementById("forecast").innerHTML = forecastHtml;
}
