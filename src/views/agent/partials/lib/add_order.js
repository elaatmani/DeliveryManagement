import Agent from "@/api/Agent";

export const toConfirm = (app) => {
    app.fetching = true;
    Agent.toConfirm()
    .then(res => {
        const data = res.data;
        
        if (data.code === 'NO_ORDER') {
            app.order_exists = false;
            return false;
        }

        if(data.code == "SUCCESS" && data.data.orders.length > 0) {
            app.order = data.data.orders[0];
            app.order_exists = true;
        }

        app.doubles = data.data.double == true ? data.data.double_orders.filter(o => o.id != app.order?.id) : [];
        

    })
    .catch(app.$handleApiError)
    .finally(() => {
        app.fetching = false;
    })
}


export const save = (app) => {
    if(app.order.confirmation == null) {
        app.$alert({
            title: 'Confirmation Not Changed',
            type: 'warning'
        });
        return false;
    }

    if(app.doubles.some(o => o.confirmation == null)) {
        app.$alert({
            title: 'Double Order Confirmation Not Changed',
            type: 'warning'
        });
        return false;
    }

    app.order_exists = false;
    app.order = null;
    app.doubles = [];
    app.$alert({
        title: 'Your changes has been saved !',
        type: 'success'
    });
}

export const getOrder = (app) => {

    let order = app.order;

    if(order != null && order.confirmation == null) {
        app.$alert({
            type: 'warning',
            title: 'Order Not Confirmed'
        })
        return false;
    }

    app.fetching = true;
    Agent.getOrder()
    .then(res => {
        let data = res.data;
        
        if (data.code == "ORDER_NOT_CONFIRMED") {
            app.$alert({
                type: 'warning',
                title: 'Order Not Confirmed'
            });
            
            let order = res.data.orders[0];
            app.order = JSON.parse(JSON.stringify(order));
            app.order_exists = true;
            
            return false;
        }

        if(data.code == "SUCCESS" && !res.data.orders?.id) {
            let order = data.data.orders;
            app.order = JSON.parse(JSON.stringify(order));
            app.order_exists = true;
        }
        
        if (data.code === 'NO_ORDERS') {
            app.order_exists = false;
            return false;
        }
        
        app.doubles = data.data.double == true ? data.data.double_orders?.filter(o => o.id != app.order?.id) : [];

    })
    .catch(app.$handleApiError)
    .finally(() => {
        app.fetching = false;
    })
}