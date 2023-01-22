// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const customTheme = {
  colors: {
    'primary-indigo': '#1B2850',
    'primary-orange': '#FF9F43',
    'primary-blue':   '#00CFE8',
    'primary-green': '#28C76F'
  }
}

export default createVuetify(
  {
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme
      }
    }
  }
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
)
