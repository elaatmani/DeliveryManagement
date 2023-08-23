import Api from './Api'
import Csrf from './Csrf'

class Bulk {

    async execute(options) {
        await Csrf.getCookie();
        return Api.post('api/v1/bulk/execute', options);
    }
}



export default new Bulk();