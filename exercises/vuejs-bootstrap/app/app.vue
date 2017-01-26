<template>
  <div id="app" class="container">
    <h1>{{title}}</h1>

    <!-- exercise: alert box -->
    <h3>Alert Demo</h3>
    <alert @closed="onClosed()">
      <strong>Alert: </strong> We have a problem.
    </alert>
  </div>
</template>

<script>
  import Alert from './components/alert.vue'
  export default {
    components: {
      Alert,
    },
    data () {
      return {
        title: 'Vue Alert Box',
      }
    },
    methods: {
      onClosed () {
        console.log('dialog is closed')
      },
    },

  }
</script>

<style lang="less">
  @import "~bootstrap/dist/css/bootstrap.css";

  // add here your custom styling

  @color-alert: red;  
  h1 {
    color: @color-alert
  }
</style>
