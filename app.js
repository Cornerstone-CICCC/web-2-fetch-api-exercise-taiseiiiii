// YOUR JS CODE HERE
window.addEventListener("DOMContentLoaded", () => {
  const weatherContainer = document.getElementById("weather-container");
  fetchWeatherInfo(weatherContainer);
});

async function fetchWeatherInfo(weatherContainer) {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1"
    );
    const data = await res.json();
    // temperature
    const temperature = document.createElement("p");
    temperature.textContent = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;
    temperature.classList.add("temperature");
    weatherContainer.appendChild(temperature);

    // wind speed
    const windSpeed = document.createElement("p");
    windSpeed.textContent = `Wind Speed: ${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`;
    windSpeed.classList.add("wind-speed");
    weatherContainer.appendChild(windSpeed);

    // timezone
    const timeZone = document.createElement("p");
    timeZone.textContent = data.timezone;
    timeZone.classList.add("timezone");
    weatherContainer.appendChild(timeZone);

    // last updated
    const lastUpdated = document.createElement("p");
    const date = new Date(data.current.time);
    const formatted = date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    lastUpdated.textContent = `Last updated: ${formatted}`;
    lastUpdated.classList.add("last-updated");
    weatherContainer.appendChild(lastUpdated);
  } catch (e) {
    console.log(e);
  }
}
