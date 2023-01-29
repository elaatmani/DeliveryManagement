import Api from './Api'
import Cookie from 'js-cookie'

export default {
    getCookie() {
        let csrf = Cookie.get("XSRF-TOKEN");

        if (csrf) {
            return new Promise(resolve => {
                    resolve(csrf);
                });
        }  

        return Api.get("sanctum/csrf-cookie");
    }
};