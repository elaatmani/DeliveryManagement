const Alert = {
    install(app) {
        
        app.config.globalProperties.$alert = function(alert) {
            
            this.$store.dispatch('alert/toggleAlert', alert);
        }
    }
}

export default Alert