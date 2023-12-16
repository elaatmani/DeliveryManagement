import Api from './Api'
import Csrf from './Csrf'

class Dashboard {

    async delivery() {
        await Csrf.getCookie();
        return Api.get('api/dashboard/delivery');
    }


    async agente() {
        await Csrf.getCookie();
        return Api.get('api/dashboard/agente');
    }

    async productPerformanceByConfirmation() {
        await Csrf.getCookie();
        return Api.get('api/charts/products-performance/confirmation');
    }

    async productPerformanceByDelivery() {
        await Csrf.getCookie();
        return Api.get('api/charts/products-performance/delivery');
    }

}



export default new Dashboard();