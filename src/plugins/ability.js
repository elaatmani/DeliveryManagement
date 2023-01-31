
const Ability = {
    install(app) {
        
        app.config.globalProperties.$can = function(permission) {
            const permissions = this.$store.getters['user/permissions'];
            return permissions.includes(permission)
        }
    }
}

export default Ability