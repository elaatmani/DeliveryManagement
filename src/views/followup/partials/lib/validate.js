export const validate = (app, order) => {
    app.isLoading = !app.isLoading;
    if(!order.fullname) {
        app.$alert({
            title: 'Client name is not valid'
        })
        return false;
    }


    return true;
} 