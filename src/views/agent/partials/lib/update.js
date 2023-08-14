import FollowUp from "@/api/FollowUp";


const success = (app, res) => {
    app.$alert({
        title: 'Updated Successfully',
        type: 'success'
    });

    const order = res.data.order;
    app.$emit('update', order);
    app.isLoading = false;
    app.cancel();
    app.errors  = {};
}

const failed = (app, res) => {
    app.$alert({
        title: res.message,
        type: 'error'
    });

    if(res.code == 'VALIDATION_ERROR') {
        app.errors  = res.errors;
    }
    
    app.isLoading = false;
}

export const update = (app, order) => {
    app.isLoading = true;
    app.errors  = {};
    FollowUp.update(order.id, order)
    .then((res) => success(app, res.data))
    .catch((err) => failed(app, err.response.data))
    .finally(() => app.isLoading = false);
}