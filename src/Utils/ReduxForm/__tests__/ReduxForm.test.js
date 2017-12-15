// @flow

import { convertStringToNumber } from '../index'

test('convertStringToNumber - should convert string to number', () => {
  const value = '30'
  const name = 'price'

  const result = 30

  expect(convertStringToNumber(value, name)).toBe(result)
})

test('convertStringToNumber - should return nothing if value empty', () => {
  const value = null
  const name = 'price'

  expect(convertStringToNumber(value, name)).toBeUndefined()
})
