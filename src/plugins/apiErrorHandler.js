
const ApiErrorHandler = {
    install(app) {
        
        app.config.globalProperties.$handleApiError = function(err) {
            const code = err?.response?.data?.code;
            let type = 'error'
            let title = "Something wrong happened. Try again"
            let alert = true
            const errors = ['VALIDATION_ERROR', 'NOT_ACTIVE_ERROR', 'INVALID_CREDENTIALS', 'PERMISSION_DENIED'];

            if (errors.includes(code)) {
                alert = false;
            }

            console.log(err);
            if (err.code == "ERR_NETWORK") {
                title = 'Network error. Check your connection'
            }


            switch (code) {
                case 'NOT_ALLOWED':
                    title = 'Your are not allowed to this resources'
                break;

                case 'ERROR':
                    title = err?.response?.data.message
                break;

                case 'NOT_AUTHENTICATED':
                    title = 'Your session expired'

                    setTimeout(() => {
                        app.config.globalProperties.$store.dispatch('user/logout')
                        app.config.globalProperties.$router.push('/login')
                    }, 2000)
                break;
                
                case 'NOT_FOUND':
                    alert = false;
                    app.config.globalProperties.$router.push({ name: '404' })
                    break;
                    
                case 'RELOAD':
                    alert = false;
                    console.log('reload');
                    location.reload(true);
                break;
                    
                case 'HIDE_APP':
                    alert = false;
                    document.getElementById('app').innerHTML = ''
                break;

                default:
                    break;
            }

            alert ? app.config.globalProperties.$alert({ type, title }) : '';
            return err
        }
    }
}

export default ApiErrorHandler