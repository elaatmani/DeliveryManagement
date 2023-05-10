import Api from './Api'
import Csrf from './Csrf'

class Warehouse {

    async create(warehouse) {
        await Csrf.getCookie();
        
        return Api.post('api/warehouses/new', {
            name: warehouse.name,
        });
    }

    async update(id, warehouse) {
        await Csrf.getCookie();
        
        return Api.post('api/warehouses/update/' + id, {
            name: warehouse.name
        });
    }

    async all() {
        await Csrf.getCookie();
        return Api.get('api/warehouses');
    }

    async getWarehouse(id) {
        await Csrf.getCookie();
        return Api.get('api/warehouses/' + id);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/warehouses/delete/' + id)
    }
}



export default new Warehouse();