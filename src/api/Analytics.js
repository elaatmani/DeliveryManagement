import Api from './Api'
import Csrf from './Csrf'

class Analytics {

    async getProductsByProfit(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/products-by-profit', {
            params
        });
    }

    async kpis(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/kpis', {
            params
        });
    }
}

export default new Analytics();