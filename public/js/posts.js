import { getCityAdvertisments } from "../../utils/shared.js"
import { hiddenLoading } from "../../utils/utils.js";

window.addEventListener('load', () => {

    console.log("opk");
    

    getCityAdvertisments().then(res => {
        console.log(res);

        //Hidden Loading
        hiddenLoading()

        

    })
    
})