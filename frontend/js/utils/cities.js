const fetchCitiesPopular = async () => {
    const res = await fetch('http://localhost:4000/api/cities/popular')
    const cities = await res.json()
    return cities
}

const setCityCookie = city => {
    document.cookie = `city=${city}; path=/`
}

const getCityCookie = () => {
    if (document.cookie) {
        let cookiesArr = document.cookie.split('; ')
        let cookieFilter = cookiesArr.filter(cookie => cookie.includes('city'))
        if (cookieFilter.length) {
            let cityNmae = cookieFilter[0].slice(cookieFilter[0].search('=') + 1)
            return cityNmae
        }
    }
}

export {
    fetchCitiesPopular,
    setCityCookie,
    getCityCookie
}