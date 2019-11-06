import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" 

Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      dark: false, // From 2.0 You have to select the theme dark or light here
      light: {
        primary: '#3f51b5',
        secondary: '#03a9f4',
        accent: '#9c27b0',
        error: '#f44336',
        warning: '#cddc39',
        info: '#8bc34a',
        success: '#4caf50'
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}