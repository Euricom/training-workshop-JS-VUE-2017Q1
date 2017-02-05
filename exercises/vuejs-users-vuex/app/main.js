import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import App from './app.vue'
import Home from './containers/home/home.vue'
import Users from './containers/users/users.vue'
import UserEdit from './containers/userEdit/userEdit.vue'
import About from './containers/about/about.vue'
import store from './store'

/* init routes */
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

// sync router to store
sync(store, router)

/* setup app */
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
