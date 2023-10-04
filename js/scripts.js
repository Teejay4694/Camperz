
    const carousel = new bootstrap.Carousel('#homeCarousel', {
        interval: 2000,
        pause: false
    });

    const carouselButton = document.getElementById('carouselButton');
    const faIcon = document.getElementById('faButton');

    carouselButton.addEventListener('click', function () {
        if (faIcon.classList.contains('fa-pause')) {
            faIcon.classList.remove('fa-pause');
            faIcon.classList.add('fa-play');
            carousel.pause();
        } else {
            faIcon.classList.remove('fa-play');
            faIcon.classList.add('fa-pause');
            carousel.cycle();
        }
    });

    async function fetchWeather() {
        try {
            const apiKey = process.env.OPEN_WEATHER_API_KEY;
            const city = "Cleveland";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }

            const data = await response.json();

            displayWeather(data);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    function displayWeather(data) {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const weatherIcon = document.createElement('img');
        weatherIcon.src = iconUrl;

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${temperature} \u00B0`;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${description}`;

        const weatherContainer = document.getElementById('weather');

        weatherContainer.appendChild(weatherIcon);
        weatherContainer.appendChild(temperatureElement);
        weatherContainer.appendChild(descriptionElement);
    }

    fetchWeather();

