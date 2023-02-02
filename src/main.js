import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ability from './plugins/ability'
import alert from './plugins/alert'
import apiErrorHandler from './plugins/apiErrorHandler'

import LoadingAnimation from '@/components/LoadingAnimation'

// import styling and tailwind
import '@/assets/style.css'
import '@/assets/css/main.css'

createApp(App)

  // Registering plugins
  .use(router)
  .use(store)
  .use(vuetify)
  .use(ability)
  .use(alert)
  .use(apiErrorHandler)

  // Registering Global Components
  .component('LoadingAnimation', LoadingAnimation)


  .mount('#app')
