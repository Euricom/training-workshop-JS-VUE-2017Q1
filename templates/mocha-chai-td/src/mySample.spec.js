/* eslint-env mocha */

import { expect } from 'chai'
import td from 'testdouble'

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
            var ask = td.function()

            // act
            ask('age')

            // assert
            expect(ask).to.have.been.calledWith('age')
        })

        it('should return 42', () => {
            // arrange
            var ask = td.function()
            td.when(ask('age')).thenReturn(42)

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
            const stubbedCat = td.object(cat) // { meow: [test double function], age: 9 }
            td.when(stubbedCat.meow('aaw')).thenReturn('heeist')

            // act
            const result = stubbedCat.meow('aaw')

            // assert
            expect(result).to.equal('heeist')
            expect(stubbedCat.meow).to.have.been.called
        })
    })
})
