import Api from './Api'
import Csrf from './Csrf'

class Agent {

    // async all() {
    //     await Csrf.getCookie();
    //     return Api.get('api/Agent');
    // }

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
}



export default new Agent();