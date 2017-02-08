import { expect } from 'chai'
import { format } from './dateUtil'

describe('dateUtil', () => {
  it('should format date correctly', () => {
    const date = new Date(2011, 10, 30)
    const result = format(date)
    expect(result).to.equal('30-11-2011 00:00')
  })

  it('should format time correctly', () => {
    const date = new Date(2011, 1, 1, 12, 1, 22)
    const result = format(date)
    expect(result).to.equal('01-02-2011 12:01')
  })
})

