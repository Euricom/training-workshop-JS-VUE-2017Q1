// import { expect } from 'chai'
import Vue from 'vue'
import Test from './test.vue'

describe('Test', () => {
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    const vm = new Vue(Test).$mount()
    // const vm = new Vue({
    //   el: document.createElement('div'),
    //   render: (h) => h(App),
    // })

    console.log(vm.$el.innerHTML)

    // const vm = new Vue(App).$mount()
    // console.log(vm)
    // console.log(vm.$el.textContent)
    // expect(vm.message).to.equal('Hello from VueJS')
    // expect(vm.$el.textContent).to.equal('Hello from VueJS')
  })
})
