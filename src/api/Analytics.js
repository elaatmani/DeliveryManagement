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

    async ordersPerDay(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/orders-per-day', {
            params
        });
    }

    async deliveredPerDay(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/delivered-per-day', {
            params
        });
    }

    async confirmedPerDay(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/confirmed-per-day', {
            params
        });
    }
}

export default new Analytics();