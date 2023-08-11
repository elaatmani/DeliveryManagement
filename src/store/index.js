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
import warehouse from './modules/warehouse'
import factorisation from './modules/factorisation'
import sheet from './modules/sheet'
import agent from './modules/agent'


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
    notification,
    warehouse,
    factorisation,
    sheet,
    agent
  }
})
