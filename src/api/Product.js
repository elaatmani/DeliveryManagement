import Api from './Api'
import Csrf from './Csrf'

class Product {

    async create(product) {
        await Csrf.getCookie();
        
        return Api.post('api/products/new', {
            name: product.name,
            buying_price: product.buyingPrice,
            quantity: product.quantity,
            size: product.size,
            color: product.color,
            image: product.image,
            description: product.description,
            status: 1
        });
    }

    async update(id, product) {
        await Csrf.getCookie();
        
        return Api.post('api/products/update/' + id, {
            name: product.name,
            buying_price: product.buyingPrice,
            quantity: product.quantity,
            size: product.size,
            color: product.color,
            image: product.image,
            description: product.description,
            status: 1
        });
    }

    async all() {
        await Csrf.getCookie();
        return Api.get('api/products');
    }

    async getProduct(id) {
        await Csrf.getCookie();
        return Api.get('api/products/' + id);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/products/delete/' + id)
    }
}



export default new Product();