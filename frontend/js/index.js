import { fetchCities } from "./utils/cities.js"

//var
const $ = document
const citiesRandomList = $.querySelector('.main__cities-list .row')
const fragmentCities = $.createDocumentFragment()

const showPopularCities = cities => {
    citiesRandomList.innerHTML = ''
    cities.map(city => {
        const divElem = $.createElement('div')
        divElem.className = 'col-2 d-flex justify-content-center'
        divElem.innerHTML = `  
            <li class="main__cities-item">
                <a class="main__cities-link" href="${city.href}">${city.name}</a>
            </li>
        `
        fragmentCities.appendChild(divElem)
    })
    console.log(citiesRandomList);
    citiesRandomList.appendChild(fragmentCities)

}

window.addEventListener('load', async () => {
    const cities = await fetchCities()
    const chooseRandomCity = cities.sort(() => .5 - Math.random()).slice(0, 12)
    showPopularCities(chooseRandomCity)
})