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

    async productPerformance() {
        await Csrf.getCookie();
        return Api.get('api/charts/productsPerformance');
    }

}



export default new Dashboard();