import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import Home from './containers/home.vue'
import Users from './containers/users.vue'
import UserEdit from './containers/userEdit.vue'
import About from './containers/about.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
      { path: '/', redirect: '/home' },
      { name: 'home', path: '/home', component: Home },
      { name: 'users', path: '/users', component: Users },
      { name: 'edit', path: '/edit/:id?', component: UserEdit },
      { name: 'about', path: '/about', component: About },
  ],
})

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
