import {
  getFromLocalStorage,
  getUrlParam,
  getToken,
  saveInLocalStorage,
  isLogin,
  getMe,
  showModal,
} from "./utils.js";

const baseUrl = "https://divarapi.liara.run";

const getAllCities = async () => {
  const res = await fetch(`${baseUrl}/v1/location`);
  const cities = await res.json();

  return cities;
};

const getAllLocations = async () => {
  const res = await fetch(`${baseUrl}/v1/location`);
  const respose = await res.json();

  return respose.data;
};

const getAndShowSocials = async () => {
  const socialMediaContainer = document.querySelector("#footer__social-media");
  const res = await fetch(`${baseUrl}/v1/social`);
  const socialsResponse = await res.json();

  socialsResponse.data.socials.forEach((social) => {
    socialMediaContainer?.insertAdjacentHTML(
      "beforeend",
      `
        <a href="${social.link}" class="sidebar__icon-link">
            <img width="18px" height="18px" alt="${social.name}" src="${social.icon}" class="sidebar__icon bi bi-twitter" />
        </a>
      `
    );
  });
};

const getAndShowHeaderCityLocation = async () => {
  const headerCityTitle = document.querySelector("#header-city-title");
  const cities = getFromLocalStorage("cities");

  if (headerCityTitle) {
    if (!cities) {
      saveInLocalStorage("cities", [{ title: "تهران", id: 301 }]);
      const cities = getFromLocalStorage("cities");
      headerCityTitle.innerHTML = cities[0].title;
    } else {
      if (cities.length === 1) {
        headerCityTitle.innerHTML = cities[0].title;
      } else {
        headerCityTitle.innerHTML = `${cities.length} شهر`;
      }
    }
  }
};

const getPosts = async (citiesIDs) => {
  const categoryID = getUrlParam("categoryID");
  const searchValue = getUrlParam("value");
  let url = `${baseUrl}/v1/post/?city=${citiesIDs}`;

  if (categoryID) {
    url += `&categoryId=${categoryID}`;
  }

  if (searchValue) {
    url += `&search=${searchValue}`;
  }

  const res = await fetch(url);
  const posts = await res.json();

  return posts;
};

const getPostCategories = async () => {
  const res = await fetch(`${baseUrl}/v1/category`);
  const response = await res.json();

  return response.data.categories;
};

const getPostDetails = async () => {
  const postID = getUrlParam("id");
  const token = getToken();

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}/v1/post/${postID}`, {
    headers,
  });

  const response = await res.json();

  return response.data.post;
};

const showPanelLinks = async () => {
  const dropDown = document.querySelector(".header_dropdown_menu");
  const userLogin = await isLogin();

  dropDown.innerHTML = "";

  if (dropDown) {
    if (userLogin) {
      getMe().then((user) => {
        dropDown.insertAdjacentHTML(
          "beforeend",
          `
              <li class="header__left-dropdown-item header_dropdown-item_account">
                <a
                  href="/pages/userPanel/posts.html"
                  class="header__left-dropdown-link login_dropdown_link"
                >
                  <i class="header__left-dropdown-icon bi bi-box-arrow-in-left"></i>
                  <div>
                    <span>کاربر دیوار </span>
                    <p>تلفن ${user.phone}</p>
                  </div>
                </a>
              </li>
              <li class="header__left-dropdown-item">
                <a class="header__left-dropdown-link" href="/pages/userPanel/verify.html">
                  <i class="header__left-dropdown-icon bi bi-bookmark"></i>
                  تایید هویت
                </a>
              </li>
              <li class="header__left-dropdown-item">
                <a class="header__left-dropdown-link" href="/pages/userPanel/bookmarks.html">
                  <i class="header__left-dropdown-icon bi bi-bookmark"></i>
                  نشان ها
                </a>
              </li>
              <li class="header__left-dropdown-item">
                <a class="header__left-dropdown-link" href="/pages/userPanel/notes.html">
                  <i class="header__left-dropdown-icon bi bi-journal"></i>
                  یادداشت ها
                </a>
              </li>
              <li class="header__left-dropdown-item logout-link" id="login_btn">
                <p class="header__left-dropdown-link" href="#">
                  <i class="header__left-dropdown-icon bi bi-shop"></i>
                  خروج
                </p>
              </li>
          `
        );
      });
    } else {
      dropDown.insertAdjacentHTML(
        "beforeend",
        `
          <li class="header__left-dropdown-item">
            <span id="login-btn" class="header__left-dropdown-link login_dropdown_link">
              <i class="header__left-dropdown-icon bi bi-box-arrow-in-left"></i>
              ورود
            </span>
          </li>
          <li class="header__left-dropdown-item">
            <div class="header__left-dropdown-link" href="#">
              <i class="header__left-dropdown-icon bi bi-bookmark"></i>
              نشان ها
            </div>
          </li>
          <li class="header__left-dropdown-item">
            <div class="header__left-dropdown-link" href="#">
              <i class="header__left-dropdown-icon bi bi-journal"></i>
              یادداشت ها
            </div>
          </li>
          <li class="header__left-dropdown-item">
            <div class="header__left-dropdown-link" href="#">
              <i class="header__left-dropdown-icon bi bi-clock-history"></i>
              بازدید های اخیر
            </div>
          </li>
        `
      );

      dropDown.addEventListener("click", () => {
        showModal("login-modal", "login-modal--active");
      });
    }
  }
};

const getSupportArticles = async () => {
  const res = await fetch(`${baseUrl}/v1/support/category-articles`);
  const response = await res.json();

  return response.data.categories;
};

const getArticleByID = async (id) => {
  const res = await fetch(`${baseUrl}/v1/support/articles/${id}`);
  const response = await res.json();

  return response.data.article;
};

const getArticlesByCategory = async (id) => {
  const res = await fetch(`${baseUrl}/v1/support/categories/${id}/articles`);
  const response = await res.json();

  return response.data.articles;
};

const getArticles = async () => {
  const res = await fetch(`${baseUrl}/v1/support/category-articles`);
  const response = await res.json();

  return response.data.categories;
};

export {
  baseUrl,
  getAllCities,
  getAllLocations,
  getAndShowSocials,
  getPosts,
  getPostCategories,
  getAndShowHeaderCityLocation,
  getPostDetails,
  showPanelLinks,
  getSupportArticles,
  getArticleByID,
  getArticlesByCategory,
  getArticles,
};
