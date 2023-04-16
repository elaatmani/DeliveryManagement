import Api from './Api'
import Csrf from './Csrf'

class Inventory {

    async inventoryStates() {
        await Csrf.getCookie()
        return Api.get('api/inventorystates')
    }

    async inventoryMovements() {
        await Csrf.getCookie()
        return Api.get('api/inventorymovements')
    }

    async getMovement(id) {
        await Csrf.getCookie()
        return Api.get('api/inventorymovements/'+ id)
    }

    async inventoryMovementCreate({
        product_id, delivery_id, variants,  quantity
    }) {
        await Csrf.getCookie()
        return Api.post('api/inventorymovements/new', { product_id, delivery_id, variants, quantity })
    }

    async inventoryMovementUpdate(id, {
        product_id, delivery_id, variants,  quantity
    }) {
        await Csrf.getCookie()
        return Api.post('api/inventorymovements/update/' + id, { product_id, delivery_id, variants, quantity })
    }

    async deliveryUpdateMovement(id, is_received, note) {
        await Csrf.getCookie()
        return Api.post('api/delivery/inventorymovements/update/' + id, { is_received, note })
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/inventorymovements/delete/' + id)
    }
}



export default new Inventory();