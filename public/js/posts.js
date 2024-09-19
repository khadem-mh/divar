import { getCityAdvertisments, hiddenLoading } from "../../utils/shared"

window.addEventListener('load', () => {

    getCityAdvertisments().then(res => {

        //Hidden Loading
        hiddenLoading()

    })
    
})