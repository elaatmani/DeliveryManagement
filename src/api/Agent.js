import Api from './Api'
import Csrf from './Csrf'

class Agent {

    // async all() {
    //     await Csrf.getCookie();
    //     return Api.get('api/Agent');
    // }

    async statistics(filters) {
        await Csrf.getCookie();
        return Api.post('api/v1/agent/statistics', filters);
    }

    async paginate(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/v1/agent/orders' + url, options);
    }

    async counts() {
        await Csrf.getCookie();
        return Api.get('api/v1/agent/orders/counts');
    }

    async update(id, order) {
        await Csrf.getCookie();
        return Api.post('api/v1/agent/orders/' + id + '/update', order);
    }

    async toConfirm() {
        await Csrf.getCookie();
        return Api.get('api/orders/toconfirmate');
    }

    async getOrder() {
        await Csrf.getCookie();
        return Api.get('api/orders/add');
    }

    async create(order) {
        await Csrf.getCookie();
        return Api.post('api/v1/agent/orders/create', order);
    }
}



export default new Agent();