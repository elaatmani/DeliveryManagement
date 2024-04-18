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
    async CostPerDay(date_avant, date_apres, period) {
        await Csrf.getCookie();
        return Api.get('api/charts/cost_per_day',{ params: { date_avant, date_apres, period } });
    }
    async LeadsPerDay(date_avant, date_apres, period) {
        await Csrf.getCookie();
        return Api.get('api/charts/leads_per_day',{ params: { date_avant, date_apres, period } });
    }
    async AmountPerLead(date_avant, date_apres, period) {
        await Csrf.getCookie();
        return Api.get('api/charts/amount_per_lead',{ params: { date_avant, date_apres, period } });
    }
    async CostPerMarketer(date_avant, date_apres, period) {
        await Csrf.getCookie();
        return Api.get('api/charts/cost_per_marketer',{ params: { date_avant, date_apres, period } });
    }
    async CostPerProduct(date_avant, date_apres, period,selectedOption) {
        await Csrf.getCookie();
        return Api.get('api/charts/cost_per_product',{ params: { date_avant, date_apres, period,selectedOption } });
    }
    async ConfirmationStatesDonuts(date_avant, date_apres, period) {
        await Csrf.getCookie();
        return Api.get('api/charts/confirmation_state_donuts',{ params: { date_avant, date_apres, period } });
    }
    async statistics(filters) {
        await Csrf.getCookie();
        return Api.post('api/v1/marketer/statistics', filters);
    }

}



export default new Dashboard();