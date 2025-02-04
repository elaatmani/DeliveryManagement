import Api from './Api'
import Csrf from './Csrf'

class CashFlow {

    async all(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow', {
            params
        });
    }

    async create(data) {
        await Csrf.getCookie();

        return Api.post('api/cash-flow', data);
    }

    async update(id, data) {
        await Csrf.getCookie();

        return Api.post('api/cash-flow/' + id, data);
    }

    async destroy(id) {
        await Csrf.getCookie();

        return Api.delete('api/cash-flow/' + id);
    }


}



export default new CashFlow();