
// expect is globally defined by frameworks: ['mocha', 'chai']
// import { expect } from 'chai'
import Vue from 'vue'
import { Sample1 } from './sample1'

describe('Sample1', () => {
  // Inspect the component instance on mount
  it.skip('correctly sets the message when created', () => {
    const vm = new Vue(Sample1).$mount()
    console.log('home', vm.$el)
    // expect(vm.$el.textContent).to.be.ok
  })
})
