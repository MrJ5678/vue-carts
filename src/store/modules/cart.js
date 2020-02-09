import * as shop from '@/api/shop'

const state = {
  // 购物车数据
  //  { id: 商品id, quantity: 购物车商品数量 }
  items: [],
  // null | success | failed
  checkoutStatus: null
}

const getters = {
  cartProducts (state, getters, rootState) {
    return state.items.map((product) => {
      const prod = rootState.products.all.find(item => item.id === product.id)
      return {
        id: prod.id,
        title: prod.title,
        price: prod.price,
        quantity: product.quantity
      }
    })
  },
  totalPrice (state, getters) {
    return getters.cartProducts.reduce((total, prod) => {
      return total + prod.price * prod.quantity
    }, 0)
  }
}

const mutations = {
  pushProductToCart (state, { id }) {
    // console.log(id)
    state.items.push({
      id,
      quantity: 1
    })
  },
  increateItemQuantity (state, payload) {
    // console.log(cartItem)
    const cartItem = state.items.find(item => item.id === payload.id)
    cartItem.quantity++
  },
  setCheckoutStatus (state, payload) {
    state.checkoutStatus = payload
  },
  setItems (state, payload) {
    state.items = payload
  }
}
const actions = {
  checkout ({ state, commit }, products) {
    // console.log('checkout')
    // 备份购物车数据
    // console.log(products)
    const savedCartProducts = [...products]
    // 清空支付状态
    commit('setCheckoutStatus', null)
    // 清空购物车
    commit('setItems', [])
    // 发起结账请求
    //    成功，设置成功状态
    //    失败，设置失败状态，回滚购物车数据
    shop.buyProducts(products,
      () => {
        commit('setCheckoutStatus', 'success')
      },
      () => {
        commit('setCheckoutStatus', 'failed')
        commit('setItems', savedCartProducts)
      }
    )
  },
  addProductToCart ({ state, commit }, product) {
    // 如果商品数量 > 0, 执行添加购物车逻辑
    //    如果购物车中已存在该商品, 则让该商品的数量加1
    //    如果没有该商品，则添加商品到购物车
    // 最后,让商品本身数量减1
    if (product.inventory) {
      const cartItem = state.items.find(({ id }) => id === product.id)
      if (cartItem) {
        commit({
          type: 'increateItemQuantity',
          id: cartItem.id
        })
      } else {
        commit({
          type: 'pushProductToCart',
          id: product.id
        })
      }
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    } else {
      console.log('商品的库存已经为空了!')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
