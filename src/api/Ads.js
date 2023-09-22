import Api from './Api'
import Csrf from './Csrf'

class Ads {

   
    async create(ads) {
        await Csrf.getCookie();
        return Api.post('api/ads/new', ads);
    }

    async update(id, ads) {
        await Csrf.getCookie();
        return Api.post('api/ads/update/' + id , ads);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/ads/delete/' + id)
    }

    async paginate(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/ads' + url, options);
    }
}



export default new Ads();