//? Helper Functions For Best Performance

export const selectElem = param => document.querySelector(param)

export const insertElemToDom = (parent, elem) => parent.insertAdjacentHTML("beforeend", elem)

export const setCityInStorage = (key, value) => { localStorage.setItem(key, JSON.stringify(value)) }

export const getCityInStorage = key => JSON.parse(localStorage.getItem(key))

export const addParamToURL = (param, value) => window.history.pushState(null, '', `posts.html?${param}=${value}`)

export const hiddenLoading = () => { selectElem('#loading-container').style.display = 'none' }


//? Vars

export const baseURLApi = "https://divarapi.liara.run/v1/"

export const baseURL = "https://divarapi.liara.run/"