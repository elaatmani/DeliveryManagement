import Api from './Api'
import Csrf from './Csrf'

class Product {

    async create(product) {
        await Csrf.getCookie();

        return Api.post('api/products/new', {
            name: product.name,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            quantity: product.quantity,
            size: product.size,
            color: product.color,
            image: product.image,
            description: product.description,
            status: 1
        })
    }

    async logout() {
        await Csrf.getCookie();

        return Api.get('api/auth/logout')
    }
}



export default new Product();