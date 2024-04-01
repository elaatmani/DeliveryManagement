import Api from './Api'
import Csrf from './Csrf'

class Alert {

    async paginate(url = '', options) {
        await Csrf.getCookie();
        return Api.get('api/alerts' + url, { params: options });
    }

    async alerts() {
        await Csrf.getCookie();
        return Api.get('api/my-alerts');
    }

    async create(sourcing) {
        await Csrf.getCookie();
        return Api.post('api/alerts', sourcing);
    }

    async update(id, sourcing) {
        await Csrf.getCookie();
        return Api.post('api/alerts/' + id, sourcing);
    }

    async get(id) {
        await Csrf.getCookie();
        return Api.get('api/alerts/' + id);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/alerts/' + id);
    }
}

export default new Alert();