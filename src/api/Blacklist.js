import Api from './Api'
import Csrf from './Csrf'

class Blacklist {

   
    async all(options) {
        await Csrf.getCookie();
        return Api.get('api/blacklist', {params: options});
    }

    async create(blacklist) {
        await Csrf.getCookie();
        return Api.post('api/blacklist', blacklist);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/blacklist/' + id, );
    }

}



export default new Blacklist();