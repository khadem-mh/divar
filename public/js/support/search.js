import { baseUrl } from "../../../utils/shared.js";
import { getUrlParam } from "../../../utils/utils.js";

window.addEventListener("load", async () => {
  const key = getUrlParam("key");

  const loading = document.querySelector("#loading-container");
  const searchTitleSpan = document.querySelector(".search-title span");
  const searchResults = document.querySelector("#search-results");

  const res = await fetch(`${baseUrl}/v1/support/articles/search?s=${key}`);
  const response = await res.json();

  loading.style.display = "none";

  console.log("Search Response ->", response);

  searchTitleSpan.innerHTML = `«${key}»`;

  if (response.data.articles.length) {
    response.data.articles.map((article) => {
      searchResults.insertAdjacentHTML(
        "beforeend",
        `
            <a href="/pages/support/article.html?id=${article._id}">
                <div>
                    <p>${article.title}</p>
                </div>
                <i class="bi bi-chevron-left"></i>
            </a>
        `
      );
    });
  } else {
    searchResults.insertAdjacentHTML(
      "beforeend",
      `
        <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
        <p>نتیجه‌ای برای جستجوی شما یافت نشد</p>
        <span>پیشنهاد می‌کنیم:</span>
        <span>نگارش کلمات خود را بررسی نمایید.</span>
        <span>کلمات کلیدی دیگری را انتخاب کنید.</span>
      `
    );
  }
});
