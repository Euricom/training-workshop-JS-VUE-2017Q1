<template>
  <div id="app" class="container">
    <nav-bar></nav-bar>
    <h3 class="error" v-show="requestError">{{requestError}}</h3>
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
  computed: {
    requestError() {
      let errorMessage = ''
      if (this.$store.state.users.error) {
        errorMessage = 'Fail to retrieve data'
      }
      return errorMessage
    },
  },
}
</script>

<style lang="less">
  @import "~bootstrap/dist/css/bootstrap.css";

  /* add global styling here */
  .error {
    color: red;
  }
</style>

