import Api, { ApiForm } from './Api'
import Csrf from './Csrf'

class Product {

    async paginate(url = '/', options) {
        await Csrf.getCookie();
        return Api.post('api/v1/products' + url, options);
    }


    async create(product) {
        await Csrf.getCookie();
        ApiForm;

        const formData = new FormData();
        formData.append('name',  product.name)
        formData.append('buying_price',  product.buyingPrice)
        formData.append('selling_price',  product.sellingPrice)
        formData.append('link_video',  product.link_video)
        formData.append('link_store',  product.link_store)
        formData.append('ref',  product.reference)
        formData.append('variations',  JSON.stringify(product.variants))
        formData.append('offers',  JSON.stringify(product.offers))
        formData.append('description',  product.description)
        formData.append('image',  product.image)
        formData.append('deliveries',  JSON.stringify(product.selectedDeliveries))
        formData.append('status',  1)

        return ApiForm.post('api/products/new', formData)
        // return ApiForm.post('api/products/new', {
        //     name: product.name,
        //     buying_price: product.buyingPrice,
        //     selling_price: product.sellingPrice,
        //     ref: product.reference,
        //     variations: product.variants,
        //     description: product.description,
        //     image: product.image,
        //     deliveries: product.selectedDeliveries,
        //     status: 1
        // });
    }

    async update(id, product) {
        await Csrf.getCookie();
        const formData = new FormData();
        formData.append('name',  product.name)
        formData.append('buying_price',  product.buyingPrice)
        formData.append('selling_price',  product.sellingPrice)
        formData.append('link_video',  product.link_video)
        formData.append('link_store',  product.link_store)
        formData.append('ref',  product.reference)
        formData.append('variations',  JSON.stringify(product.variants))
        formData.append('offers',  JSON.stringify(product.offers))
        formData.append('description',  product.description)
        formData.append('image',  product.image)
        formData.append('deliveries',  JSON.stringify(product.selectedDeliveries))
        formData.append('status',  1)
        
        return ApiForm.post('api/products/update/' + id, formData)
        // return Api.post('api/products/update/' + id, {
        //     name: product.name,
        //     buying_price: product.buyingPrice,
        //     selling_price: product.sellingPrice,
        //     ref: product.reference,
        //     variations: product.variants,
        //     description: product.description,
        //     status: 1,
        //     deliveries: product.selectedDeliveries
        // });
    }

    async all() {
        await Csrf.getCookie();
        return Api.get('api/products');
    }

    async allForOrder() {
        await Csrf.getCookie();
        return Api.get('api/products/for-order');
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