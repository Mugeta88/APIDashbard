const detailsContainer = document.getElementById("details-container");
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});


const params = new URLSearchParams(window.location.search);
const code = params.get("code");


async function loadDetails() {
    const response = await fetch("data.json");
    const countries = await response.json();

    const country = countries.find(country => country.alpha3Code === code);

    if (!country) {
        detailsContainer.innerHTML = "<h2>Country not found</h2>";
        return;
    }

   renderDetails(country, countries);
}
loadDetails();



function renderDetails(country, countries) {
    detailsContainer.innerHTML = `
        <div class="details-card">
            <img src="${country.flags.png}" alt="${country.name} flag">

            <div class="details-info">
                <h2>${country.name}</h2>
                
                <p><strong>Native Name:</strong> ${country.nativeName}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${country.subregion || "N/A"}</p>
                <p><strong>Capital:</strong> ${country.capital || "N/A"}</p>
                
                <p><strong>Languages:</strong> 
                    ${country.languages.map(lang => lang.name).join(", ")}
                </p>
                <p><strong>Currencies:</strong> 
                    ${country.currencies.map(cur => cur.name).join(", ")}
                </p>

                <div class="borders">
                    <strong>Border Countries:</strong>
                    <div id="border-buttons"></div>
                </div>

            </div>
        </div>
    `;

    renderBorderButtons(country.borders, countries);
}



function renderBorderButtons(borders, countries) {
    const container = document.getElementById("border-buttons");

    if (!borders || borders.length === 0) {
        container.innerHTML = "<p>No border countries</p>";
        return;
    }

    borders.forEach(borderCode => {
        const borderCountry = countries.find(country => country.alpha3Code === borderCode);

        const btn = document.createElement("button");
        btn.classList.add("border-btn");

        btn.textContent = borderCountry ? borderCountry.name : borderCode;
 

        btn.addEventListener("click", () => {
            window.location.href = `countryDetails.html?code=${borderCode}`;
        });

        container.appendChild(btn);
    });
}



const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});