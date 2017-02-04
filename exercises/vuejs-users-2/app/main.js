import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import Home from './containers/home.vue'
import UserEdit from './containers/userEdit.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
      { name: 'home', path: '/', component: Home },
      { name: 'edit', path: '/edit/:id?', component: UserEdit },
  ],
})

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
