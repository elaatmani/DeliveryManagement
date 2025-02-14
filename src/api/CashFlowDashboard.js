import Api from './Api'
import Csrf from './Csrf'

class CashFlowCategory {

    async dailyCashflows(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-dashboard/daily-cashflows', {
            params
        });
    }

    async balance(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-dashboard/balance', {
            params
        });
    }


    async incomesByCategory(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-dashboard/income-by-category', {
            params
        });
    }


    async expensesByCategory(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-dashboard/expense-by-category', {
            params
        });
    }


    async users(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-dashboard/users', {
            params
        });
    }

    async lifetime(params) {
        await Csrf.getCookie();
        return Api.get('api/cash-flow-dashboard/lifetime', {
            params
        });
    }


}



export default new CashFlowCategory();