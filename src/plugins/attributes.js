import { localUrl, serverUrl } from "@/config/config"

export default {
    install(app) {
        app.config.globalProperties.$frontend = url => localUrl + url;
        app.config.globalProperties.$backend = url => serverUrl + url;

        const handler = {
            get: (target, key) => {
                return app.config.globalProperties.$store.getters['user/user'][key];
            }
        }
        
        app.config.globalProperties.$user = new Proxy(app.config.globalProperties.$store.getters['user/user'], handler);
    }
}