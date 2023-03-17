import { fetchData, url } from "./api.js";
import * as module from "./module.js";

const addEventOnELements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnELements(searchTogglers, "click", toggleSearch);

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", function () {
  searchTimeout ?? clearTimeout(searchTimeout);
  if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
  } else {
    searchField.classList.add("searching");
  }
  if (searchField.value) {
    searchTimeout = setTimeout(() => {
      fetchData(url.geo(searchField.value), function (locations) {
        searchField.classList.remove("searching");
        searchResult.classList.add("active");
        searchResult.innerHTML = `
        <ul class="view-list" data-search-list >
        </ul>
    `;

        const item = [];

        for (const { name, lat, lon, country, state } of locations) {
          const searchItem = document.createElement("li");
          searchItem.classList.add("view-item");

          searchItem.innerHTML = `
            <span class="m-icon">location_on</span>
            <div>
                <p class="item-title">${name}</p>
                <p class="label-2 item-subtitle">${state || ""}${country}</p>
            </div>
            <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name}" weather data-search-toggler></a>
          `;
          searchResult
            .querySelector("[data-search-list]")
            .appendChild(searchItem);

          item.push(searchItem.querySelector("[data-search-toggler]"));
        }

        addEventOnELements(items,)
      });
    }, searchTimeoutDuration);
  }
});

const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector(
  "[data-current-location-btn]"
);
const errorContent = document.querySelector("[data-error-content]");




export const updateWeather = function (lat, lon) {
  loading.style.display = grid;
  container.style.overflow = "hidden";
  container.classList.contains("fade-in") ??
    container.classList.remove("fade-in");
  errorContent.style.display = "none";

  const currentWeatherSection = document.querySelector(
    "[data-current-weather]"
  );

  const highlightSection = document.querySelector("[data-highlights]");
  const hourlySection = document.querySelector("[data-hourly-forecast]");
  const forecastSection = document.querySelector("[data-5-day-forecast]");

  currentWeatherSection.innerHTML = "";
  highlightSection.innerHTML = "";
  hourlySection.innerHTML = "";
  forecastSection.innerHTML = "";

  if (window.location.hash === "#/current-location") {
    currentLocationBtn.setAttribute("disable", "");
  } else {
    currentLocationBtn.removeAttribute("disabled");
  }

  fetchData(url.currrentWeather(lat, lon), function (currentWeather) {
    const {
      weather,
      dt: dateUnix,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      main: { temp, feels_like, pressure, humidity },
      visibility,
      timezone,
    } = currentWeather;

    const [{ description, icon }] = weather;
    const card = document.createElement("div");
    card.classList.add("card", "card-lg", "current-weather-card");
    card.innerHTML = `
      <h2 class="title2 card-title">Now</h2>
      <div class="weapper">
          <p class="heading">${parseInt(temp)}&deg;<sup>c</sup></p>
          <img src="./assets/images/weather_icons/${icon}.png" height="64" alt="${description}"
              class="weather-icon">
      </div>

      <p class="body-3">${description}</p>

      <ul class="meta-list">
          <li class="meta-item">
              <span class="m-icon">calendar_today</span>
              <p class="title-3 meta-text">${module.getDate(
                dateUnix,
                timezone
              )}</p>
          </li>
          <li class="meta-item">
              <span class="m-icon">location_on</span>
              <p class="title-3 meta-text" data-location></p>
          </li>
      </ul>
    `;
    fetchData(url.reverseGeo(lat, lon), function ([{ name, country }]) {
      (card.querySelector("[data-location]").innerHTML = "${name}"),
        "${country}";
    });
    currentWeatherSection.appendChild(card);
  });
};

export const error404 = ()=>{

}
