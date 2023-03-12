import Api from './Api'
import Csrf from './Csrf'

class Sale {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/sales');
    }

    async agenteOrders() {
        await Csrf.getCookie();
        return Api.get('api/orders');
    }

    async agenteConfirmedOrders() {
        await Csrf.getCookie();
        return Api.get('api/orders/confirmer');
    }

    async agenteAddOrder() {
        await Csrf.getCookie();
        return Api.get('api/orders/add');
    }

    async agenteGetOrder() {
        await Csrf.getCookie();
        return Api.get('api/orders/toconfirmate');
    }

    async agenteUpdateConfirmation(id, confirmation) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/confirmation/' + id, {confirmation});
    }
}



export default new Sale();