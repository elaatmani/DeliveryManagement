import Api from './Api'
import Csrf from './Csrf'

class Sourcing {

    async paginate(url = '', options) {
        await Csrf.getCookie();
        return Api.post('api/sourcings' + url, options);
    }

    async create(sourcing) {
        await Csrf.getCookie();
        return Api.post('api/sourcings/new', sourcing);
    }

    async update(id, sourcing) {
        await Csrf.getCookie();
        return Api.post('api/sourcings/' + id, sourcing);
    }

    async get(id) {
        await Csrf.getCookie();
        return Api.get('api/sourcings/' + id);
    }

    async history(id) {
        await Csrf.getCookie();
        return Api.get('api/sourcings/' + id + '/history');
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/sourcings/' + id);
    }
}

export default new Sourcing();