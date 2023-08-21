import Api from './Api'
import Csrf from './Csrf'

class FollowUp {

    async statistics() {
        await Csrf.getCookie();
        return Api.post('api/v1/followup/statistics');
    }

    async paginate(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/v1/followup/orders' + url, options);
    }

    async update(id, order) {
        await Csrf.getCookie();
        return Api.post('api/v1/followup/orders/' + id + '/update', order);
    }

    async create(order) {
        await Csrf.getCookie();
        return Api.post('api/v1/followup/orders/create', order);
    }
}



export default new FollowUp();