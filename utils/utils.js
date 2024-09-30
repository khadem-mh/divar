import { baseUrl } from "./shared.js";

const saveInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const addParamToUrl = (param, value) => {
  const url = new URL(location.href);
  const searchParams = url.searchParams;

  searchParams.set(param, value);
  url.search = searchParams.toString();

  location.href = url.toString();
};

const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get(param);
};

const removeParamFromUrl = (param) => {
  const url = new URL(location.href);
  url.searchParams.delete(param);
  window.history.replaceState(null, null, url);
  location.reload();
};

const calcuteRelativeTimeDifference = (createdAt) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  const timeDifference = currentTime - createdTime;
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return `لحظاتی پیش`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} دقیقه پیش`;
  } else {
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) {
      return `${hours} ساعت پیش`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} روز پیش`;
    }
  }

  if (hours < 24) {
    return `${hours} ساعت پیش`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days} روز پیش`;
  }
};

const showModal = (id, className) => {
  const element = document.querySelector(`#${id}`);
  element?.classList.add(className);
};

const hideModal = (id, className) => {
  const element = document.querySelector(`#${id}`);
  element?.classList.remove(className);
};

const showSwal = (title, icon, buttons, callback) => {
  swal({
    title,
    icon,
    buttons,
  }).then((result) => {
    callback(result);
  });
};

const getToken = () => {
  const token = getFromLocalStorage("token");
  return token;
};

const isLogin = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const res = await fetch(`${baseUrl}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.status === 200 ? true : false;
};

const getMe = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const res = await fetch(`${baseUrl}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await res.json();

  return response.data.user;
};

const paginateItems = (
  href,
  paginationContainer,
  currentPage,
  totalItems,
  itemPerPage
) => {
  paginationContainer.innerHTML = "";
  let paginatedCount = Math.ceil(totalItems / itemPerPage);

  for (let i = 1; i < paginatedCount + 1; i++) {
    paginationContainer.insertAdjacentHTML(
      "beforeend",
      `
        <li class="${i === Number(currentPage) ? "active" : ""}">
          <a href="${href}?page=${i}">${i}</a>
        </li>
      `
    );
  }
};

export {
  saveInLocalStorage,
  getFromLocalStorage,
  addParamToUrl,
  getUrlParam,
  calcuteRelativeTimeDifference,
  removeParamFromUrl,
  showModal,
  hideModal,
  isLogin,
  showSwal,
  getToken,
  getMe,
  paginateItems,
};
