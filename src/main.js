import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { abilitiesPlugin } from '@casl/vue'
import ability from './config/ability'

// import styling and tailwind
import '@/assets/style.css'
import '@/assets/css/main.css'

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(abilitiesPlugin, ability, {
    useGlobalProperties: true
  })
  .mount('#app')
