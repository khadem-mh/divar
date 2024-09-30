import { getAllCities } from "../../utils/shared.js";
import { saveInLocalStorage } from "../../utils/utils.js";

window.addEventListener("load", () => {
  const loadingContainer = document.querySelector("#loading-container");

  getAllCities().then((response) => {
    loadingContainer.style.display = "none";
    const popularCitiesContainer = document.querySelector("#popular-cities");
    const searchInput = document.querySelector("#search-input");
    const searchResult = document.querySelector(".search-result-cities");

    searchInput.addEventListener("keyup", (event) => {
      if (event.target.value.length) {
        searchResult.classList.add("active");

        const searchResultCities = response.data.cities.filter((city) =>
          city.name.startsWith(event.target.value)
        );

        if (searchResultCities.length) {
          searchResult.innerHTML = "";
          searchResultCities.forEach((city) => {
            searchResult.insertAdjacentHTML(
              "beforeend",
              `
                <li onclick="cityClickHandler('${city.name}', '${city.id}')">${city.name}</li>
              `
            );
          });
        } else {
          searchResult.innerHTML = "";
          searchResult.insertAdjacentHTML(
            "beforeend",
            `
              <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
              <p class="empty">نتیجه‌ای برای جستجوی شما پیدا نشد.</p>
            `
          );
        }
      } else {
        searchResult.classList.remove("active");
      }
    });

    const popularCities = response.data.cities.filter((city) => city.popular);

    popularCities.forEach((city) => {
      popularCitiesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li class="main__cities-item" onclick="cityClickHandler('${city.name}', '${city.id}')">
            <p class="main__cities-link">${city.name}</p>
        </li>
      `
      );
    });

    window.cityClickHandler = (cityName, cityID) => {
      saveInLocalStorage("cities", [{ title: cityName, id: cityID }]);
      location.href = "/pages/posts.html";
    };
  });
});
