import Api from './Api'
import Csrf from './Csrf'

class Shop {

    async create(shop) {
        await Csrf.getCookie();
        
        return Api.post('api/shops/new', {
            name: shop.name,
        });
    }

    async update(id, shop) {
        await Csrf.getCookie();
        
        return Api.post('api/shops/update/' + id, {
            name: shop.name
        });
    }

    async all() {
        await Csrf.getCookie();
        return Api.get('api/shops');
    }

    async getShop(id) {
        await Csrf.getCookie();
        return Api.get('api/shops/' + id);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/shops/delete/' + id)
    }
}



export default new Shop();