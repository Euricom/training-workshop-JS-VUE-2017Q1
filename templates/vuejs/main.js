var MyComponent = Vue.extend({
    props: ['title', 'sub-title'],
    name: 'MyComponent',
    template: `
        <div>
            <h1>{{title}}</h1>
            <h3>{{subTitle}}</h3>
            <slot></slot>
        </div>
    `,
    data () {
        return {
        }
    },
})

// Register the constructor with id: my-component
Vue.component('my-component', MyComponent)

// eslint-disable-next-line
new Vue({
    el: '#root',
    data () {
        return {
            message: 'Hello World',
            names: ['Joe', 'Mary', 'Jane', 'Jack'],
        }
    },
})



