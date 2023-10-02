import Bulk from '@/api/Bulk'

export default (app, options) => {

    app.isLoading = true;

    Bulk.execute(options)
    .then((res) => success(app, res.data))
    .catch(app.$handleApiError)
    .finally(() => {
        app.isLoading = false;
    })
}


const success = (app, data) => {
    if(data.code == 'SUCCESS') {
        app.$alert({
            title: 'Updated Successfully',
            type: 'success'
        })
        
        app.$emit('update:visible', false)
        app.$emit('update')
    }
}

// const failed = (app) => {

// }