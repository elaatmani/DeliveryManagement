import Api from './Api'
import Csrf from './Csrf'

class FollowUp {

    // async all() {
    //     await Csrf.getCookie();
    //     return Api.get('api/followup');
    // }

    async paginate(url = 'followup', options) {
        await Csrf.getCookie();
        return Api.post('api/' + url, options);
    }

    async update(id, order) {
        await Csrf.getCookie();
        return Api.post('api/followup/' + id + '/update', order);
    }
}



export default new FollowUp();