<template>
  <div>
      <h2>products组件</h2>
    <ul>
        <li
            v-for="item in products"
            :key="item.id">
            <span>{{item.title}}</span>
            -
            <span>{{item.price}}</span>
            <br/>
            <button @click="addProductToCart(item)">Add to cart</button>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('products', {
      products: 'all'
    })
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
  },
  methods: {
    ...mapActions('cart', ['addProductToCart'])
  }

}
</script>

<style>
</style>
