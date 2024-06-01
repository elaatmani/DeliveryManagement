import Api from './Api'
import Csrf from './Csrf'

class Adaccount {

    async create(ad_account) {
        await Csrf.getCookie();
        return Api.post('api/adaccount/new' , ad_account );
    }
    async update(id, ad_account) {
        await Csrf.getCookie();
        return Api.post('api/adaccount/update/' + id , ad_account);
    }
    async updateAutoFetch(id, value) {
        await Csrf.getCookie();
        return Api.post('api/adaccount/' + id + '/auto_fetch', {autoFetch: value});
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/adaccount/delete/' + id)
    }
    async paginate(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/adaccounts' + url, options);
    }
}



export default new Adaccount();