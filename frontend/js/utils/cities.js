const fetchCities = async () => {
    const res = await fetch('http://localhost:4000/api/cities')
    const cities = await res.json()
    return cities
}

export {
    fetchCities
}