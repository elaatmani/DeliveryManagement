import Api from './Api'
import Csrf from './Csrf'

class Order {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/orders');
    }
}



export default new Order();