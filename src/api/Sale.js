import Api from './Api'
import Csrf from './Csrf'

class Sale {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/sales');
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.get('api/sales/delete/' + id);
    }

    async update(id, order) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/' + id, order);
    } 

    async create(sale) {
        await Csrf.getCookie();
        return Api.post('api/sales/new', sale);
    } 

    async getNewOrders(ids) {
        await Csrf.getCookie();
        return Api.post('api/sales/fresh', {ids});
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

    async agenteUpdateConfirmation(id, confirmation, order = {}) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/confirmation/' + id, {confirmation, ...order});
    }

    async agenteUpdateConfirmationWithNote(id, confirmation, note) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/confirmationandnote/' + id, {confirmation, note});
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

    async deliveryUpdateDelivery(id, delivery, order) {
        await Csrf.getCookie();
        return Api.post('api/orders/update/delivery/' + id, {delivery, ...order});
    }

    async history(id) {
        await Csrf.getCookie();
        return Api.get('api/orders/history/show/' + id)
    }

    async itemHistory(id) {
        await Csrf.getCookie();
        return Api.get('api/orders/item/history/show/' + id)
    }

    async resetSale(ids) {
        await Csrf.getCookie();
        return Api.post('api/sales/reset',{ids})
    }

    async scanSale(id) {
        await Csrf.getCookie();
        return Api.post('api/sales/scan',id)
    }

    async availableOrders() {
        await Csrf.getCookie();
        return Api.get('api/orders/count')
    }
}



export default new Sale();