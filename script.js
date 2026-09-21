const API_KEY = "ea35ca0e1016478dac082542262109"; // Replace with your own key if desired
const API_URL = "https://api.weatherapi.com/v1/current.json";

// Get HTML elements
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");

const city = document.getElementById("city");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const uv = document.getElementById("uv");
const updated = document.getElementById("updated");


// Get weather data
async function getWeather(location) {
    try {
        clearError();
        setLoading(true);

        const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Weather API error");
        }

        if (!data.location || !data.current) {
            throw new Error("Unexpected API response");
        }

        // Display data
        city.textContent = data.location.name;
        country.textContent = data.location.country;

        temperature.textContent = `${data.current.temp_c}`;
        condition.textContent = data.current.condition.text;

        weatherIcon.src = `https:${data.current.condition.icon}`;
        weatherIcon.alt = data.current.condition.text;

        feelsLike.textContent = `${data.current.feelslike_c}°C`;
        humidity.textContent = `${data.current.humidity}%`;
        wind.textContent = `${data.current.wind_kph} km/h`;
        uv.textContent = data.current.uv;

        updated.textContent = data.current.last_updated;

    } catch (error) {
        console.error("Weather error:", error);
        showError(error.message || "Unable to get weather");
    } finally {
        setLoading(false);
    }
}


// Search button
searchBtn.addEventListener("click", () => {
    const location = locationInput.value.trim();

    if (location !== "") {
        getWeather(location);
    }
});


// Press Enter to search
locationInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});


// Load London initially
// helper UI functions
function showError(message) {
    if (!errorMessage) return;
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

function clearError() {
    if (!errorMessage) return;
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
}

function setLoading(isLoading) {
    if (!searchBtn) return;
    searchBtn.disabled = isLoading;
    searchBtn.textContent = isLoading ? "Loading..." : "Search";
}

getWeather("London");