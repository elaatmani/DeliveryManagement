import Api from './Api'
import Csrf from './Csrf'

class CashFlowCategory {

    async all(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-categories', {
            params
        });
    }

    async create(data) {
        await Csrf.getCookie();

        return Api.post('api/cash-flow-categories', data);
    }

    async update(id, data) {
        await Csrf.getCookie();

        return Api.post('api/cash-flow-categories/' + id, data);
    }

    async destroy(id) {
        await Csrf.getCookie();

        return Api.delete('api/cash-flow-categories/' + id);
    }


}



export default new CashFlowCategory();