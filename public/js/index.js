import { getAllCities, selectElem, insertElemInDom } from "../../utils/shared.js"

window.addEventListener('load', () => {

    getAllCities()
        .then(res => {
            const popularCitiesContainer = selectElem(".main__cities-list")

            const popularCities = res.data.cities.filter(city => city.popular)

            popularCities.forEach(city => {

                insertElemInDom(
                    popularCitiesContainer.firstElementChild,
                    `
                    <div class="col-2 d-flex justify-content-center">
                        <li class="main__cities-item">
                            <a class="main__cities-link" href="#">${city.name}</a>
                        </li>
                    </div>
                    `
                )

            })

        })

})