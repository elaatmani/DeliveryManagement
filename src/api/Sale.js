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

    async agenteUpdateConfirmationWithNote(id, confirmation, note) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/' + id, {confirmation, note});
    }

    async agenteUpdateUpsell(id, upsell) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/upsell/' + id, {upsell});
    }

    async agenteUpdateAffectaion(id, affectation) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/affectation/' + id, {affectation});
    }

    async agenteUpdateNote(id, note) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/note/' + id, {note});
    }

    async deliveryOrders() {
        await Csrf.getCookie();
        return Api.get('api/orders/todelivery')
    }

    async deliveryDeliveredOrders() {
        await Csrf.getCookie();
        return Api.get('api/orders/delivred')
    }

    async deliveryUpdateDelivery(id, delivery) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/delivery/' + id, {delivery});
    }
}



export default new Sale();