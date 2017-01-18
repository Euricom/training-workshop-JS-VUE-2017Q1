/* eslint-env mocha */

import { expect } from 'chai'
import { doAction } from './mySample'

describe('mySample', () => {
    beforeEach(() => {
        // setup before each test
    })

    afterEach(() => {
        // cleanup after each
    })

    describe('doAction', () => {
        it('should uppercase input', () => {
            // act
            const result = doAction('abc')

            // assert
            expect(result).to.equal('ABC')
        })
    })

    describe('test double function', () => {
        it('should been called with "age"', () => {
            // arrange
            var ask = sinon.stub()

            // act
            ask('age')

            // assert
            expect(ask).to.have.been.calledWith('age')
        })

        it('should return 42', () => {
            // arrange
            var ask = sinon.stub()
            ask.withArgs('age').returns(42)

            // act
            var result = ask('age')

            // assert
            expect(result).to.equal(42)
        })
    })

    describe('test double object', () => {
        it('should', () => {
            // arrange
            const cat = {
                meow: function () {
                    console.log('test2')
                },
                age: 9
            }
            var meowStub = sinon.stub(cat, 'meow')
                                .withArgs('aaw').returns('heeist')

            // act
            const result = cat.meow('aaw')

            // assert
            expect(result).to.equal('heeist')
            expect(meowStub).to.have.been.called
        })
    })
})
