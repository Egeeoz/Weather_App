async function getWeather() {
  const weatherApiKey = 'Your-api-key';
  const city = document.getElementById('city-input');

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
  const weatherIcon = document.querySelector('.weather-icon');
  const hourlyForecastContainer = document.querySelector('.forecast');

  // Clear previous content
  tempInfoContainer.innerHTML = '';
  weatherInfoContainer.innerHTML = '';
  hourlyForecastContainer.innerHTML = '';
}
