import { getAllCities, selectElem, insertElemToDom } from "../../utils/shared.js"

window.addEventListener('load', () => {

    const loadingContainer = selectElem('#loading-container')

    getAllCities()
        .then(res => {

            loadingContainer.style.display = 'none'

            const popularCitiesContainer = selectElem("#popular-cities")

            const popularCities = res.data.cities.filter(city => city.popular)

            popularCities.forEach(city => {

                insertElemToDom(
                    popularCitiesContainer,
                    `
                        <li class="main__cities-item">
                            <a class="main__cities-link" href="#">${city.name}</a>
                        </li>
                    `
                )

            })

        })

})