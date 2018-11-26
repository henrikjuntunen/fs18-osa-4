const palindrom = require('../utils/first_helper').palindrom

describe('palindrom', () => {

    test('palindrom of a', () => {
        const result = palindrom('a')
        expect(result).toBe('a')
    })

    test('palindrom of react', () => {
        const result = palindrom('react')
        expect(result).toBe('tcaer')
    })

    test('palindrom of saippuakauppias', () => {
        const result = palindrom('saippuakauppias')
        expect(result).toBe('saippuakauppias')
    })

})

const average = require('../utils/first_helper').average

describe('average', () => {

    test('of one value is the value itself', () => {
      expect(average([1])).toBe(1)
    })
  
    test('of many is calculated right', () => {
      expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
    })
  
    test('of empty array is zero', () => {
      expect(average([])).toBe(0)
    })
  
})
