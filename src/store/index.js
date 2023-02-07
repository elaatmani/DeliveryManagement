import { createStore } from 'vuex'
import user from './modules/user'
import alert from './modules/alert'
import product from './modules/product'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    product,
    alert
  }
})
