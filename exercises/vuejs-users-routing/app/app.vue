<template>
  <div id="app" class="container">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBar from './components/navBar.vue'

export default {
  components: {
    NavBar,
  },
  data: () => ({
    title: 'User App',
  }),
  created() {
    console.log('created')
  },
}
</script>

<style lang="less">
  @import "~bootstrap/dist/css/bootstrap.css";

  /* add global styling here */
</style>

