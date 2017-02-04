<template>
  <div id="app" class="container">
    <h1>{{title}}</h1>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
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

  // add here your custom styling
</style>

