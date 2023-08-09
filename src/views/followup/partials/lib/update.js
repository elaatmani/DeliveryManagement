export const update = (app) => {
    app.isLoading = true;

    setTimeout(() => {
        app.isLoading = false;
        app.$alert({
            title: 'Updated Successfully',
            type: 'success'
        });

        app.cancel();
    }, 3000)
}