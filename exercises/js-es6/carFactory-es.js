// car.js
export class Car {
    constructor(options) {
        const default = {
            engine: '200D',
            luxLevel: 'standard',
        }
        Object.assign(this, default, options)
    }

    depreciate ({ value }) {
        this.value -= value
    }

    set value (value) {
        if (value < 0)
            throw new Error('invalid value')
        this.value = value
    }

    delayLogName (timeout = 100) {
        setTimeout(() => {
            console.log('name', this.make)
        }, timeout)
    }

    sayWroom () {
        return `Wroom ${this.make} ${this.model}`
    }

    setOptions(optionList) {
        this.options.push(...optionList)
    }

    start(callback) {
        return new Promise(resolve => {
            engine.start(resolve);
        })
    }

}

// main.js
import { Car } from './car'

const value = 50000
var car = new Car({
    make,
    model: '520',
    value
})

