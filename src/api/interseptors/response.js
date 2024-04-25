import axios from "axios";
import { abort } from "./request";
import useAlert from "@/composables/useAlert";
import router from "@/router";
import store from "@/store";

export const resolve = (response) => {
    return Promise.resolve(response);
}


export const reject = error => {


    if(axios.isCancel(error)) {
        return Promise.reject(error);
    }
    
    if(error?.response?.status == 401) {
        abort();
        store.dispatch('user/logout');
        useAlert('Session Expired', 'danger');
        router.push({name: 'login'});
    }

    if(error.response.status == 500) {
        if(error.data?.code == 'ERROR') {
            useAlert(error.data.message, 'danger')
        } else {
            useAlert('Something went wrong', 'danger')
        }
    }

    return Promise.reject(error);
}