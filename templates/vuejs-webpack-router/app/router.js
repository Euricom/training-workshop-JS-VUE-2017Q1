import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Foo from './components/foo.vue'
import Bar from './components/bar.vue'

// Create route array
const routes = [
  { path: '/foo/:id', component: Foo },
  { path: '/bar', component: Bar },
]

// Create the router instance
export const router = new VueRouter({
    mode: 'history',
    routes,
})
