//? Helper Functions For Best Performance

export const baseURLApi = "https://divarapi.liara.run/v1/"

export const selectElem = param => document.querySelector(param)

export const insertElemToDom = (parent, elem) => parent.insertAdjacentHTML("beforeend", elem)

export const setCityInStorage = (key, value) => { localStorage.setItem(key, JSON.stringify(value)) }

export const getCityInStorage = key => localStorage.getItem(key)