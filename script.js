async function getWeather() {
  const weatherApiKey = 'YOUR-API-KEY';
  const city = document.getElementById('city-input').value;

  if (!city) {
    alert('Please enter a city');
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}`;

  try {
    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentWeatherResponse.ok || !forecastResponse.ok) {
      throw new Error('Network response error');
    }

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    displayWeather(currentWeatherData);
    displayHourlyForecast(forecastData.list);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data. Please try again.');
  }
}

function displayWeather(data) {
  const tempInfoContainer = document.querySelector('.temp-container');
  const weatherInfoContainer = document.querySelector('.weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastContainer = document.querySelector('.forecast');

  if (
    !tempInfoContainer ||
    !weatherInfoContainer ||
    !weatherIcon ||
    !hourlyForecastContainer
  ) {
    console.error('One or more elements not found');
    return;
  }

  // Clear previous content
  tempInfoContainer.innerHTML = '';
  weatherInfoContainer.innerHTML = '';
  hourlyForecastContainer.innerHTML = '';

  if (data.cod === '404') {
    weatherInfoContainer.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temp = Math.round(data.main.temp - 273.15); //Convert to celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const tempHtml = `<p>${temp}°C</p>`;
    const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

    tempInfoContainer.innerHTML = tempHtml;
    weatherInfoContainer.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastContainer = document.querySelector('.forecast');

  if (!hourlyForecastContainer) {
    console.error('Forecast container not found');
    return;
  }

  hourlyForecastContainer.innerHTML = ''; // Clear previous forecast
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temp = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
    <section class="hourly-item">
      <span>${hour}:00</span>
      <img src="${iconUrl}" alt="Hourly Weather Icon"/>
      <span>${temp}°C</span>
    </section>`;
    hourlyForecastContainer.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block';
}
