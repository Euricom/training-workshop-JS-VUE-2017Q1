<template>
    <div>
        <h1>{{message}}</h1><h2>test</h2>
    </div>
</template>

<script>
import Home from './home/home'
export default {
    components: {
        Home,
    },
    data() {
        return {
            message: 'Hello from VueJS'
        }
    },
    created () {
      // console.log('i am created')
    }
}
</script>
