import * as shop from '@/api/shop'

const state = {
  foo: 'bar',
  all: []
}

const getters = {

}

const mutations = {
  setProducts (state, { products }) {
    state.all = products
  },
  decrementProductInventory (state, payload) {
    const product = state.all.find(item => item.id === payload.id)
    product.inventory--
  }
}
const actions = {
  async getAllProducts ({ commit }) {
    const products = await shop.getAllProducts()
    commit({
      type: 'setProducts',
      products
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
