import Api from './Api'
import Csrf from './Csrf'

class Admin {

    async statistics(filters) {
        await Csrf.getCookie();
        return Api.post('api/v1/admin/statistics', filters);
    }

    async paginate(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/v1/admin/orders' + url, options);
    }

    async update(id, order) {
        await Csrf.getCookie();
        return Api.post('api/v1/admin/orders/' + id + '/update', order);
    }
}



export default new Admin();