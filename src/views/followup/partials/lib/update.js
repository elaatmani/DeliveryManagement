import FollowUp from "@/api/FollowUp";


const success = (app, res) => {
    app.$alert({
        title: 'Updated Successfully',
        type: 'success'
    });
    app.cancel();
    app.errors  = {};
    console.log(res);
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
    FollowUp.update(order.id, order)
    .then((res) => success(app, res.data))
    .catch((err) => failed(app, err.response.data))
    .finally(() => app.isLoading = false);
}