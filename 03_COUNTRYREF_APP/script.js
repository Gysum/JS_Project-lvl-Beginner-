document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById("search-btn");
    const countryInput = document.getElementById("country-input");
    const countryInfo = document.getElementById("country-info");
    const countryNameDisplay = document.getElementById("country-name");
    const countryCapitalDisplay = document.getElementById("country-capital");
    const countryPopulationDisplay = document.getElementById("country-population");
    const countryFlagDisplay = document.getElementById("country-flag");
    const errorMessage = document.getElementById("error-msg");

    searchButton.addEventListener('click', async () => {
        const country = countryInput.value.trim();
        if(!country) return;

        try {
            const countryData = await fetchCountryData(country);
            displayCountryData(countryData);
        } catch (error) {
            sendError();
        }
        countryInput.value = "";
    });

    async function fetchCountryData(country) {
        // fetch data
        const url = `https://restcountries.com/v3.1/name/${country}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
        console.log(data);
        return data;
    };

    function displayCountryData(data) {
        // display
        // console.log(data);
        const country = data[0];
        countryNameDisplay.textContent = `${country.name.common}`;
        countryCapitalDisplay.textContent = `Capital : ${country.capital
          ? country.capital[0]
          : "N/A"}`;
        countryPopulationDisplay.textContent =
          `Population : ${country.population.toLocaleString()}`;
        countryFlagDisplay.src = country.flags.png;
        countryInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    };

    function sendError() {
        countryInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});