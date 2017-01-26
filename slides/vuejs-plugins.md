# VueJS - Plugins
<img src="./images/vue-plugins.jpeg" width="700px" /><br>
<small>by Peter Cosemans</small>
<small>v1.0 - 25 jan 2017</small>

- Vue Router
- Vuex

---

# Routing

> Multiple views in the single page app

https://router.vuejs.org/en/

----

## Setup

Install

```bash
npm install vue-router --save
```

Setup

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

----

## Routes

Create routes

```js
// Import components
import Foo from './components/foo.vue'
import Bar from './components/bar.vue'

```

Create router and assign to app

```js
// Create the router instance
const router = new VueRouter({
  routes: [
      { path: '/foo', component: Foo },
      { path: '/bar', component: Bar }
  ]
})

const app = new Vue({
  router
}).$mount('#app')
```

Verify

[http://localhost:8080/#/foo](http://localhost:8080/#/foo)<br>
[http://localhost:8080/#/bar](http://localhost:8080/#/bar)

----

## Navigate

```html
<p>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
</p>
```

The `<router-link>` gets the `.router-link-active` class when its target route is matched.

You can add the style

```html
<style>
.router-link-active {
  color: red;
}
</style>
```

----

## HTML5 History Mode

The default mode for vue-router is hash mode. To get rid of the hash, we can use the router's history mode.

```js
const router = new VueRouter({
    mode: 'history',
    routes: [...]
})
```

> Make sure your server will fallback to the index.html file for all non resolved routes.

----

## Router parameters

Specify parameter with a colon

```js
routes: [
    { path: '/foo/:id', component: Foo }
]
```

they will map to corresponding fields on `$route.params`.

```html
<template>
    <div>
        <h1>Foo</h1>
        <span>Route param: {{ $route.params.id }}</span>
    </div>
</template>
```

you can have multiple parameters

```js
routes: [
    { path: '/foo/:username/post/:id', component: Foo }
]
```

----

## Access router from code

route parameters

```js
ready () {
    getContent(this.$route.params.id)
        .then(result => {
            this.content = result
        })
}
```

navigate

```js
router.push('bar')
router.push({ path: 'bar' })
router.push({ path: 'foo', params: { id: 123 }})

// named (you have to specify a name on the route)
router.push({ name: 'Foo', params: { id: 123 }})

// go back
router.go(-1)
```

----

## Navigation Guards

Global guards

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
  next();   // or to abort: next(false)
})

router.afterEach((to, from) => {
  // ...
  next();   // or to abort: next(false)
})
```

Guards can also be define at 'route' and at 'component' level: <br>
http://router.vuejs.org/en/advanced/navigation-guards.html

----

## Navigation Guards Sample

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      meta: { requiresAuth: true }
    }
  ]
})
```

```js
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth)) {
        if (!auth.loggedIn()) {
            return next('/login')
        }
    }
    // continue with route
    next()
})

```

---

# VUEX

> Get that state under control

https://vuex.vuejs.org/en/


----

## Centralized State Management

<img src="./images/vuex.png" width="900px" />

----

## Setup

Install

```bash
npm install vuex --save
```

Setup

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
```

> It's the same as any other vue plugin

----

## The Simplest Store

Provide an initial state object, and some mutations:

```js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        incrementBy: (state, n) => state.count += n,
    }
})
```

You can access the state object as store.state, and trigger a state change with the store.commit method

```js
const app = new Vue({
    el: '#app',
    computed: {
        count () {
            return store.state.count
        }
    },
    methods: {
        increment () {
            store.commit('increment')
        },
        incrementBy (n) {
            store.commit('decrement', n)
        }
    }
})
```

----

## A more practical use

The store

```js
// store.js
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        incrementBy: (state, n) => state.count += n,
    }
})
```

The app

```js
// main.js
const app = new Vue({
    el: '#app',
    store: store,
    render: h => h(App),
})

```

By providing the store option to the root instance, the store will be injected into all child components of the root and will be available on them as this.$store

----

## A more practical use

The component

```js
// app.js (or app.vue)
const app = {
    template: '<div>{{count}}</div>'
    computed: {
        count () {
            return this.$store.state.count
        }
    },
    methods: {
        increment () {
            this.$store.commit('increment')
        },
        decrement () {
            this.$store.commit('decrement')
        }
    }
})
```

----

## Commit object

If you want to pass multiple arguments

```js
methods: {
    addProduct (product, price) {
        this.$store.commit('increment', { product, price } )
    },
}
```

Alternative you can write

```js
// or
addProduct (product, price) {
    this.$store.commit('addProduct', {
        product,
        price
    })
},

// or
addProduct (product, price) {
    this.$store.commit({
        type: 'addProduct',
        product,
        price
    })
},

```

And use it in your mutations

```js
mutations: {
    addProduct: (state, playload) => {
        console.log('add product', payload.product, payload.price)
    }
}
```

----

## Object state

```js
const store = new Vuex.Store({
    state: {
        customers: {
            items: [],
            loading: false
        }
    },
    mutations: {
        getCustomerSuccess: (state, payload) => {
            state.customers = payload.customers
            state.loading = false
            // for any new property (not already defined as default state)
            state.$set('other', payload.other)
            // or Vue.set(state, 'other', payload.other)
        },
    }
})
```

----

## Getters

Often we need a derived state

```js
computed: {
    doneTodosCount () {
        return this.$store.state.todos.filter(todo => todo.done).length
    }
}
```

This can be moved to the store itself

```js
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})

// access via
// this.$store.getters.doneTodos

```

> In Redux (flux) this calls a 'selector' function.

----

## Actions

Actions can perform one or more commits. <br> And can be asynchronous!

```js
const store = new Vuex.Store({
    state: {
        customers: {
            items: [],
            loading: false,
        }
    },
    mutations: {
        getCustomerRequest (state) {
            state.loading = true;
        },
        getCustomerResult (state, playload) {
            state.items = playload.result;
            state.loading = false;
        }
    },
```
```js
    actions: {
        getCustomer ({ commit, getters, state }) {
            commit('getCustomerRequest')
            return service.getCustomers()
                .then(result => {
                    commit('getCustomerResult', result })
                })
        }
    }
})
```

----

## Actions

Actions are triggered with the store.dispatch method

```js
// triggers an async action
this.$store.dispatch('getCustomer')
```

You can also handle async behavior in the component

```js
this.$store.dispatch('getCustomer')
    .then(result => {
        ...
    })
```

`Dispatch` can take a payload like `commit` does.

----

## Form handling

This doesn't work with vuex (you get an error in develop mode)

```js
<input v-model="obj.message">
```

The 'Vuex' way

```html
<input :value="message" @input="updateMessage()">
```

```js
computed: {
    message() {
        return this.$store.obj.message;
    }
},
methods: {
    updateMessage (e) {
        this.$store.commit('updateMessage', e.target.value)
    }
}
```

----

## Vuex Helpers

> To make writing vuex app's easier

----

## The mapState helper

```js
import { mapState } from 'vuex'

export default {
  // ...
```

```js
  data() {
        return {
            title: 'Hallo',
        }
  },
```

```js
  computed: {
        // all store states is auto mapped to computed property
        ...mapState({
            count: state => state.count,
            countAlias: 'count',    // identical to above
        }),
        // classic computed property
        upperTitle() {
            return this.title.toUpperCase();
        }
    }
```
```js
}

```

> The above syntax requires 'object spead operators' in ES7+

----

## The mapGetters helper

```js
computed: {
    doneTodosCount () {
        return this.$store.getters.doneTodosCount;
    }
}
```

vs

```js
import { mapGetters } from 'vuex'

export default {
    // ...
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            // ...
        ])
    }
}
```

```html
    <span>{{doneTodosCount}}</span>
```

----

## The mapMutations helper

```js
methods: {
    increment () {
        this.$store.commit('increment')
    },
}
```

vs

```js
import { mapMutations } from 'vuex'

export default {
    // ...
    methods: {
        ...mapMutations({
            // map this.inc() to this.$store.commit('increment')
            inc: 'increment'
        }),
    }
}
```

## The mapActions helper

```js
import { mapActions } from 'vuex'

export default {
    // ...
    ...mapActions({
        // map this.add() to this.$store.dispatch('increment')
        add: 'increment'
    })

    // alternative style (without alias)
    ...mapActions([
        'increment'
    ])
}
```

----

## Typical use helpers

```js
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
    ]),
    ...mapMutations([
        'incrementAmount'
    ]),
    ...mapActions({
        add: 'addCustomer'
    }),
    otherLocalmethod() {

    },
}
```

----

## Vuex Modules

> Decompose your state

----

## Vuex Modules sample

```js
// store/modules/customer.js
export const customers = {
    state: {
        items: [],
        loading: false,
    },
    mutations: { ... },
    actions: { ... }
    getters: { ... }
}

```
```js
// store/modules/user.js
export const user = {
    state: {
        profile: null,
        email: '',
    },
    mutations: { ... },
    actions: { ... }
}
```
```js
// store/index.js
const store = new Vuex.Store({
    modules: {
        customers,
        user
    }
})

store.state.customers // -> moduleA's state
store.state.user // -> moduleB's state
```

----

## Application structure

```
├─ index.thml
├─ main.js
├─ core
│   ├── util.js             # re-usable utilities
│   └── util.spec.js
│   └── ...
```
```
├─ services                 # app services
│   ├── cartApi
│   ├── cartApi.spec.js
│   ├── authService
│   └── ...
```
```
├─ components
│   └── App.vue
│   └── ...
```
```
└─ store
    ├── index.js            # init store
    ├── actions.js          # root actions
    ├── actions.spec.js
    ├── mutations.js        # root mutations
    ├── mutations.spec.js
    ├── getters.js          # root getters
    ├── getters.spec.js
    └── modules
         ├── cart.js        # cart module
         ├── products.js    # products module
```

## Vuex Plugins

> Want to extend vuex

----

## Build in plugins

Vuex comes with a logger plugin for common debugging usage:

```js
import createLogger from 'vuex/dist/logger'

const store = new Vuex.Store({
    ...
    plugins: [createLogger()]
})
```

3th party plugins

- [vuex-persistedstate](https://www.npmjs.com/package/vuex-persistedstate)
- ...

> You can write your own plugins

---

# Resources

- [vuex-action: Utility for vuex to create actions](https://github.com/varHarrie/vuex-action)
- [Vue2, JSX and redux](https://github.com/aweber1/tour-of-heroes-vue2)
