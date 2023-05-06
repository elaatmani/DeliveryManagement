import Api from './Api'
import Csrf from './Csrf'

class Notification {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/notifications');
    }
    
    async agente() {
        await Csrf.getCookie();
        return Api.get('api/notifications/agente');
    }

    async delivery() {
        await Csrf.getCookie();
        return Api.get('api/notifications/delivery');
    }

    
}



export default new Notification();