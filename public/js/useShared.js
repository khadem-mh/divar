import { getSocialsAndShow } from "../../utils/shared.js";
import { addParamToURL, selectElem } from "../../utils/utils.js";

window.addEventListener('load', (e) => {
    getSocialsAndShow()

    const inpElem = selectElem("#global_search_input")

    const searchGlobalHandler = e => {
        let val = e.target.value.trim()
        val && e.keyCode === 13 && addParamToURL("value", val)
    }

    inpElem?.addEventListener("keyup", e => searchGlobalHandler(e))

})


