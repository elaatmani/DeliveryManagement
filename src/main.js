import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ability from './plugins/ability'
import alert from './plugins/alert'
import apiErrorHandler from './plugins/apiErrorHandler'
import VueNumber from 'vue-number-animation'

import LoadingAnimation from '@/components/LoadingAnimation'
import PopupVue from '@/components/PopupVue'
import PopupFull from '@/components/PopupFull'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

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
  .use(VueNumber)

  // Registering Global Components
  .component('LoadingAnimation', LoadingAnimation)
  .component('Popup', PopupVue)
  .component('PopupFull', PopupFull)
  .component('VueDatePicker', VueDatePicker)

  .mount('#app')
