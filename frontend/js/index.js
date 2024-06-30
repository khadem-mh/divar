import { fetchCitiesPopular, setCityCookie, getCityCookie, fetchCities } from "./utils/cities.js"

//var
const $ = document
const citiesPopularList = $.querySelector('.main__cities-list .row')
const citySearchInput = $.querySelector('.main__input')
const fragmentCities = $.createDocumentFragment()


//! Funcs Helper
const cityClickHandler = (event, city) => {
    event.preventDefault()
    setCityCookie(city)
    window.location.href = `${window.location.origin}/frontend/pages/main.html?city=${city}`
}

const showPopularCities = cities => {
    citiesPopularList.innerHTML = ''
    cities.map(city => {
        const divElem = $.createElement('div')
        divElem.className = 'col-2 d-flex justify-content-center'
        divElem.innerHTML = `  
            <li class="main__cities-item">
                <a class="main__cities-link" href="#" onclick="cityClickHandler(event, '${city.href}')">${city.name}</a>
            </li>
        `
        fragmentCities.appendChild(divElem)
    })
    citiesPopularList.appendChild(fragmentCities)
}


//! Functions Rendering DOM
const citySearchHandler = value => {
    console.log(value);
}


//! Binding
window.cityClickHandler = cityClickHandler


//! EventListener
window.addEventListener('keyup', event => citySearchHandler(event.target.value))
window.addEventListener('load', async () => {
    const citiesPopular = await fetchCitiesPopular()
    const cities = await fetchCities()
    showPopularCities(citiesPopular)
    let cityNmae = getCityCookie()
    if (cityNmae.length) {
        window.location.href = `${window.location.origin}/frontend/pages/main.html?city=${cityNmae}`
    }
})