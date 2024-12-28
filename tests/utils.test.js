const { getRandomSubarray } = require('../utils')

describe('getRandomSubarray', () => {
  test('returns a subarray of the correct size', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const size = 3
    const result = getRandomSubarray(inputArray, size)

    expect(result).toHaveLength(size)
    result.forEach(item => {
      expect(inputArray).toContain(item)
    })
  })

  test('returns unique elements in the subarray', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const size = 3
    const result = getRandomSubarray(inputArray, size)

    const uniqueElements = new Set(result)
    expect(uniqueElements.size).toBe(size)
  })

  test('returns the entire array when size equals the array length', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const size = inputArray.length
    const result = getRandomSubarray(inputArray, size)

    expect(result).toHaveLength(size)
    expect(new Set(result)).toEqual(new Set(inputArray))
  })

  test('returns an empty array when size is 0', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const size = 0
    const result = getRandomSubarray(inputArray, size)

    expect(result).toEqual([])
  })

  test('returns an empty array when size is greater than array length', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const size = 10
    const result = getRandomSubarray(inputArray, size)

    expect(result).toEqual([])
  })

  test('returns an empty array when input array is empty and size is 0', () => {
    const inputArray = []
    const size = 0
    const result = getRandomSubarray(inputArray, size)

    expect(result).toEqual([])
  })

  test('returns an empty array when trying to retrieve elements from an empty array', () => {
    const inputArray = []
    const size = 3
    const result = getRandomSubarray(inputArray, size)

    expect(result).toEqual([])
  })

  test('returns an empty array when size is negative', () => {
    const inputArray = [1, 2, 3]
    const size = -1
    const result = getRandomSubarray(inputArray, size)

    expect(result).toEqual([])
  })

  test('returns an empty array when size is 0', () => {
    const inputArray = [1, 2, 3, 4, 5]
    const size = 0
    const result = getRandomSubarray(inputArray, size)

    expect(result).toEqual([])
  })
})
