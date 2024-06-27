import { fetchCities, setCityCookie } from "./utils/cities.js"

//var
const $ = document
const citiesRandomList = $.querySelector('.main__cities-list .row')
const fragmentCities = $.createDocumentFragment()


//! Funcs Helper

const cityClickHandler = (event, city) => {
    event.preventDefault()
    setCityCookie(city)
    window.location.href = `${window.location.origin}/frontend/pages/main.html?city=${city}`
}

const showPopularCities = cities => {
    citiesRandomList.innerHTML = ''
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
    console.log(citiesRandomList);
    citiesRandomList.appendChild(fragmentCities)

}


//! Binding

window.cityClickHandler = cityClickHandler


// EventListener

window.addEventListener('load', async () => {
    const cities = await fetchCities()
    const chooseRandomCity = cities.sort(() => .5 - Math.random()).slice(0, 12)
    showPopularCities(chooseRandomCity)
})