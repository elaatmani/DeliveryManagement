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
    
    async turnoverPerDay(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/turnover-per-day', {
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

    async assignedPerDay(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/assigned-per-day', {
            params
        });
    }
  
    async agentsRanking(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/agents-ranking', {
            params
        });
    }
    async Goalprogression(month) {
        await Csrf.getCookie();
        return Api.get('api/analytics/goal-progression', {
            params: {
                month: month,
            },
        });
    }
    async goalprogressionmarketer(params) {
        await Csrf.getCookie();
        return Api.get('api/analytics/goal-progression-marketer', {
            params
        });
    }
    async updateGoal(goal) {
        await Csrf.getCookie();
        return Api.post('api/analytics/update-goal',goal)
    }
    async marketersRanking() {
        await Csrf.getCookie();
        return Api.get('api/analytics/marketers-ranking');
    }
    
}

export default new Analytics();