import { expect } from 'chai'
import Vue from 'vue'
import App from './app.vue'

describe('App', () => {
  //
  // Evaluate the results of functions in
  // the raw component options

  it('has a created hook', () => {
    expect(App.created).is.a('function')
  })

  it('sets the correct default data', () => {
    expect(App.data).is.a('function')
    const defaultData = App.data()
    expect(defaultData.message).to.equal('Hello from VueJS')
  })

  //
  // Inspect the component instance on mount
  //
  it('correctly sets the message when created', () => {
    const vm = new Vue(App).$mount()
    expect(vm.message).to.equal('Hello from VueJS')
    expect(($(vm.$el).find('h1'))[0].textContent).to.contain('Hello from VueJS')
  })
})
