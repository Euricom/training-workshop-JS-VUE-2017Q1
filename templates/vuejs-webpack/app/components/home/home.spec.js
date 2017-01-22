// import { expect } from 'chai'
import Vue from 'vue'
import Home from './home'

describe('Home', () => {
  // Inspect the component instance on mount
  it('correctly sets the message when created', () => {
    const vm = new Vue(Home).$mount()
    // console.log(vm)
    console.log(vm.$el.textContent)

    // expect(true).to.equal(false)
  })
})
