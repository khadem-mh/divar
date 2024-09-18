import { getAllCities, selectElem, insertElemToDom } from "../../utils/shared.js"

window.addEventListener('load', () => {

    const loadingContainer = selectElem('#loading-container')

    getAllCities()
        .then(res => {

            const popularCitiesContainer = selectElem("#popular-cities")
            const searchInput = selectElem("#search-input")
            const searchResult = selectElem(".search-result-cities")
            const cities = res.data.cities

            //Hidden Loading
            loadingContainer.style.display = 'none'

            //Handle Logic Searching
            searchInput.addEventListener('keyup', event => {

                const val = event.target.value
                searchResult.innerHTML = ""

                if (val.length) {

                    searchResult.classList.add("active")

                    const searchResultCities = cities.filter(city => city.name.startsWith(val))

                    if (searchResultCities.length) {

                        searchResultCities.forEach(city => {
                            insertElemToDom(
                                searchResult,
                                `<li>${city.name}</li>`
                            )
                        })

                    } else
                        insertElemToDom(
                            searchResult,
                            `
                            <img src="https://support-faq.divarcdn.com/web/2024/03/static/media/magnifier.7f88b2e3f8ae30f4333986d0b0fbcf1d.svg" />
                            <p class="empty">نتیجه‌ای برای جستجوی شما پیدا نشد.</p>
                            `
                        )

                } else
                    searchResult.classList.remove("active")


            })

            //Show Popular Cities
            const popularCities = [...cities].filter(city => city.popular)

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