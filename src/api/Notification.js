import Api from './Api'
import Csrf from './Csrf'

class Notification {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/notifications');
    }
}



export default new Notification();