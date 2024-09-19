//? Helper Functions For Best Performance

export const selectElem = param => document.querySelector(param)

export const insertElemToDom = (parent, elem) => parent.insertAdjacentHTML("beforeend", elem)

export const setCityInStorage = (key, value) => { localStorage.setItem(key, JSON.stringify(value)) }

export const getCityInStorage = key => JSON.parse(localStorage.getItem(key))

export const addParamToURL = (param, value) => window.history.pushState(null, '', `posts.html?${param}=${value}`)

export const hiddenLoading = () => { selectElem('#loading-container').style.display = 'none' }

export const calculateRelativeTimeDifference = createdAt => {

    const hour = 60 * 60 * 1000 // MS
    //date
    const currentTime = new Date()
    const createdTime = new Date(createdAt)
    //calculate
    const timeDifference = currentTime - createdTime
    const pastHours = Math.floor(timeDifference / hour)
    const pastDays = Math.floor(pastHours / 24)

    if (pastHours > 24) return `${pastDays} روز گذشته`
    return `${pastHours} ساعت پیش`

}

//? Vars

export const baseURLApi = "https://divarapi.liara.run/v1/"

export const baseURL = "https://divarapi.liara.run/"