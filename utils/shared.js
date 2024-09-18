export const baseURLApi = "https://divarapi.liara.run/v1/"

// Get All Cities
export const getAllCities = async () => {
    const res = await fetch(`${baseURLApi}location`)
    return await res.json()
}

export const selectElem = param => document.querySelector(param)

export const insertElemToDom = (parent, elem) => parent.insertAdjacentHTML("beforeend", elem)