const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/test').reverse
/////// For Jest library, in package.json file, in scripts set "test": "cross-env NODE_ENV=test jest --verbose --runInBand"

test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a') // In case of using supetest library
  // expect(result).toBe('tcear')  In case of using jest
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})