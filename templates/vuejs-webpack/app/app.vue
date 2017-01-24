<template>
  <div id="app">
    <h1>{{title}}</h1>
    <message/>
    <sample/>
  </div>
</template>

<script>
import Message from './components/message.vue'
import Sample from './components/sample/sample'
export default {
  components: {
    Message,
    Sample
  },
  data () {
    return {
        title: 'Vue with WebPack'
    }
  }
}
</script>
