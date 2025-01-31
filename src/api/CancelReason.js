import Api from './Api'
import Csrf from './Csrf'

class CancelReason {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/cancel-reasons');
    }

    async analytics(data = {}) {
        await Csrf.getCookie();
        return Api.get('api/cancel-reasons/analytics', { params: data });
    }

    async products(data = {}) {
        await Csrf.getCookie();
        return Api.get('api/cancel-reasons/products', { params: data });
    }

    async create(data) {
        await Csrf.getCookie();

        return Api.post('api/cancel-reasons', data);
    }


}



export default new CancelReason();