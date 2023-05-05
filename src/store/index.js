import { createStore } from 'vuex'
import user from './modules/user'
import alert from './modules/alert'
import product from './modules/product'
import sale from './modules/sale'
import order from './modules/order'
import inventory from './modules/inventory'
import city from './modules/city'
import shop from './modules/shop'
import notification from './modules/notification'

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
    alert,
    sale,
    order,
    inventory,
    city,
    shop,
    notification
  }
})
