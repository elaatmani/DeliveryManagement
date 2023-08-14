import Agent from "@/api/Agent";


const success = (app, res) => {
    app.$alert({
        title: 'Updated Successfully',
        type: 'success'
    });

    const order = res.data.order;
    app.$emit('update', order);
    app.cancel();
    app.errors  = {};
}

const failed = (app, res) => {
    app.$alert({
        title: res.message,
        type: 'warning'
    });

    app.errors  = res.errors;
}

export const update = (app, order) => {
    app.isLoading = true;
    app.errors  = {};
    Agent.update(order.id, order)
    .then((res) => success(app, res.data))
    .catch((err) => failed(app, err.response.data))
    .finally(() => app.isLoading = false);
}