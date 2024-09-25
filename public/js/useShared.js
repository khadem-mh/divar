import { getSocialsAndShow } from "../../utils/shared.js";
import { addParamToURL, getUrlParam, removeParamFromUrl, selectElem } from "../../utils/utils.js";

window.addEventListener('load', (e) => {
    getSocialsAndShow()

    // Global Search Handler
    const inpElem = selectElem("#global_search_input")
    const inpElemCls = selectElem("#remove-search-value-icon")
    let urlVal = ""

    if (location.search.includes("value")) {

        urlVal = getUrlParam("value")
        inpElemCls.style.display = "block"

        inpElemCls.addEventListener("click", () => {

            inpElemCls.style.display = "none"
            inpElem.value = ""
            removeParamFromUrl("value")
        })

    }

    inpElem.value = urlVal && urlVal

    const searchGlobalHandler = e => {
        let val = e.target.value.trim()
        val && e.keyCode === 13 && addParamToURL("value", val)
    }

    inpElem?.addEventListener("keyup", e => searchGlobalHandler(e))

})


