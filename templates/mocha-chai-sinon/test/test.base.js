/* eslint-env mocha */

import sinon from 'sinon'

before(() => {
    // global before
    global.sinon = sinon.sandbox.create()
})

after(() => {
    // global after
    sinon.sandbox.restore()
})
