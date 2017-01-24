import { expect } from 'chai'

describe('sample test', () => {
  it('should work', () => {
    expect(true).to.equal(true)
  })

  it('has document', function () {
    const div = document.createElement('div')
    expect(div.nodeName).to.equal('DIV')
  })
})
