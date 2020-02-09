import Vue from 'vue'
import Vuex from 'vuex'
import creatLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// import * as plugins from './plugins'

import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  modules: {
    products,
    cart
  },
  plugins: [
    ...(debug ? [creatLogger()] : []),
    createPersistedState()],
  state,
  mutations,
  actions,
  getters
})

export default store
