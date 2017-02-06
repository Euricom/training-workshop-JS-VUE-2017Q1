<template>
  <div id="app" class="container">
    <vue-toast ref='toast'></vue-toast>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import VueToast from 'vue-toast'
import NavBar from './components/navBar.vue'
import eventBus from './core/eventBus'
import events from './events'

export default {
  components: {
    NavBar,
    VueToast,
  },
  data: () => ({
    title: 'User App',
  }),
  mounted() {
    // setup toast
    const toast = this.$refs.toast
    this.$refs.toast.setOptions({
      position: 'right bottom',
    })

    // listen for notification
    eventBus.listen(events.requestFailed, (error) => {
      toast.showToast(`ERROR:<br> ${error.message}`, {
        timeLife: 3000,
        theme: 'error',
        closeBtn: false,
      })
    })
  },
}
</script>

<style lang="less">
  @import "~bootstrap/dist/css/bootstrap.css";
  @import "~vue-toast/dist/vue-toast.css";

  /* add global styling here */
</style>

