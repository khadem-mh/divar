import { baseURLApi, insertElemToDom, selectElem } from "./utils.js"

//? Functions for Handle Logic and Dynamic website

// Get All Cities
export const getAllCities = async () => {
    const res = await fetch(`${baseURLApi}location`)
    return await res.json()
}

// Get Social Medias
export const getSocialsAndShow = async () => {

    const socialsContainer = selectElem("#footer__social-media")

    const res = await fetch(`${baseURLApi}social`)
    const { data } = await res.json()
    
    data.socials.forEach(social => {

        insertElemToDom(
            socialsContainer,
            `
            <a href="${social.link}" class="sidebar__icon-link">
                <img width="18px" height="18px" alt="${social.name}" src="https://img.icons8.com/ios/100/${social.icon.filename}" class="sidebar__icon bi bi-twitter" />
            </a>
            `
        )

    })

}