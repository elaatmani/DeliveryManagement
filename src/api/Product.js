import Api from './Api'
import Csrf from './Csrf'

class Product {

    async create(product) {
        await Csrf.getCookie();
        
        return Api.post('api/products/new', {
            name: product.name,
            buying_price: product.buyingPrice,
            selling_price: product.sellingPrice,
            ref: product.reference,
            variations: product.variants,
            description: product.description,
            deliveries: product.selectedDeliveries,
            status: 1
        });
    }

    async update(id, product) {
        await Csrf.getCookie();
        
        return Api.post('api/products/update/' + id, {
            name: product.name,
            buying_price: product.buyingPrice,
            selling_price: product.sellingPrice,
            ref: product.reference,
            variations: product.variants,
            description: product.description,
            status: 1,
            deliveries: product.selectedDeliveries
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

    async stockAlert() {
        await Csrf.getCookie();
        return Api.get('api/product/stockAlert')
    }
}



export default new Product();