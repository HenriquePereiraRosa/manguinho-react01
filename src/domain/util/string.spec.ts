import { isEmpty } from './string'

describe('Login Component', () => {
  test('Should return true if string is null', () => {
    const str = null
    expect(isEmpty(str)).toBe(true)
  })

  test('Should return true if string is undefined', () => {
    const str = undefined
    expect(isEmpty(str)).toBe(true)
  })

  test('Should return true if string is void', () => {
    const str = ''
    expect(isEmpty(str)).toBe(true)
  })

  test('Should return true if string is \' \'', () => {
    const str = ' '
    expect(isEmpty(str)).toBe(true)
  })

  test('Should return false if string has a value', () => {
    const str = 'String'
    expect(isEmpty(str)).toBe(false)
  })
})
