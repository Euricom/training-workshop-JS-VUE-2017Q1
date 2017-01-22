<template>
  <div>
    <h1>{{message}}</h1>
    <Sample1></Sample1>
  </div>
</template>

<script>
  import { Sample1 } from './sample1/sample1'
  export default {
    components: {
      Sample1,
    },
    data () {
      return {
        message: 'Hello from VueJS'
      }
    },
    created() {
      // console.log('i am created')
    },
  }
</script>
