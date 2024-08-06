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
    async TotalSpendFbTik(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/total_spend_tik_fb',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async AmountPerLeadFbTik(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/amount_per_lead_tik_fb',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async TotalCostAndLeadPerProduct(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/amount_lead_product',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async compareFbTiktok(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/compare_fb_tik',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async stats(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/stat',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async topMarketersByLeadsAndCost(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/marketer_stats',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async TotalLeadFbTik(date_avant, date_apres, marketer_id,product_id) {
        await Csrf.getCookie();
        return Api.get('api/charts/total_lead_tik_fb',{ params: { date_avant, date_apres,marketer_id,product_id} });
    }
    async TopProductSelles(sort_by, sort_order, per_page) {
        await Csrf.getCookie();
        return Api.get('api/v1/admin/get_top_products',{ params: { sort_by, sort_order, per_page } });
    }
    async statistics(filters) {
        await Csrf.getCookie();
        return Api.post('api/v1/marketer/statistics', filters);
    }

    //---------- KPAI Agente -----------//
    async treatedOrHandledOrders(filters){
        await Csrf.getCookie();
        return Api.get('api/agentekpi/treated_or_handled', {params: filters});
    }

    async DroppedOrders(filters){
        await Csrf.getCookie();
        return Api.get('api/agentekpi/dropped_orders', {params: filters});
    }

    async ConfirmedOrders(filters){
        await Csrf.getCookie();
        return Api.get('api/agentekpi/confirmed_orders', {params: filters});
    }

    async DeliveredOrders(filters){
        await Csrf.getCookie();
        return Api.get('api/agentekpi/delivered_orders', {params: filters});
    }

}



export default new Dashboard();