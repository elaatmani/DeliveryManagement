
const ApiErrorHandler = {
    install(app) {
        
        app.config.globalProperties.$handleApiError = function(err) {
            const code = err?.response?.data?.code;
            let type = 'error'
            let title = "Something wrong happened. Try again"
            let alert = true
            // const errors = ['SERVER_ERROR', 'NOT_ALLOWED', 'NOT_AUTHENTICATED', 'NOT_FOUND'];
            console.log(err);
            if (err.code == "ERR_NETWORK") {
                title = 'Network error. Check your connection'
            }


            switch (code) {
                case 'NOT_ALLOWED':
                    title = 'Your are not allowed to this resources'
                break;

                case 'NOT_AUTHENTICATED':
                    title = 'Your session expired'

                    setTimeout(() => {
                        app.config.globalProperties.$store.dispatch('user/logout')
                        app.config.globalProperties.$router.push('/login')
                    }, 2000)
                break;
                
                case 'NOT_FOUND':
                    alert = false
                    app.config.globalProperties.$router.push({ name: '404' })
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