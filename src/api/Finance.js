import Api from './Api'
import Csrf from './Csrf'

class Finance {

    async get_top_products(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/v1/admin/get_top_products/table' + url, options);
    }

}



export default new Finance();