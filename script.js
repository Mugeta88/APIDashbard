
const container = document.getElementById("country-container");
const searchInput = document.querySelector("#search input");
const regionFilter = document.getElementById("regionFilter");

let countries = [];


async function fetchCountries() {
    try {
        const response = await fetch("data.json");
        console.log("Response NOT ok:", response.status, response.statusText);

        if (!response.ok) {
            console.error("Error loading countries:", response.status, response.statusText);
        }
        const data = await response.json();
        countries = data;
        renderedCountries(data);
    } catch (error) {
        console.log("Error loading countries", error);
    }
}
fetchCountries();



function renderedCountries(countries) {
    container.innerHTML = "";

    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");

        card.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name} flag">
        <div class="info">
            <h3>${country.name}</h3>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital : "N/A"}</p>
        </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `countryDetails.html?code=${country.alpha3Code}`;
        });



        container.appendChild(card);
    });

}



searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(term)
    );
    renderedCountries(filtered);
});


regionFilter.addEventListener("change", () => {
    const region = regionFilter.value;
    if (region === "") {
        renderedCountries(countries);
    } else {
        const filtered = countries.filter(country => country.region === region);
        renderedCountries(filtered);
    }
});




const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});