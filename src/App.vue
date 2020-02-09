<template>
  <div id="app">
    <products/>
    <hr/>
    <cart/>
  </div>
</template>

<script>
import Products from './components/Products'
import Cart from './components/Cart'

export default {
  name: 'App',
  components: {
    Products,
    Cart
  }
}
</script>

<style>
</style>
