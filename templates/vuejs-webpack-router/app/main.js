import Vue from 'vue'
import App from './app.vue'
import { router } from './router'

// eslint-disable-next-line
new Vue({
    el: '#app',
    router,
    render: h => h(App),
})
