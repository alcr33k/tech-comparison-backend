const { mapArticleData, mapArticleContent, mapLinkList, mapSectionId } = require('./mappingFunctions')

/**
 * Generates a random subset of elements from the given array.
 *
 * @param {Array} arr - The original array from which to pick elements.
 * @param {number} size - The number of random elements to pick.
 * @returns {Array} An array containing `size` randomly picked, unique elements from `arr`.
 */
function getRandomSubarray (arr, size) {
  if (size <= 0 || arr.length === 0 || size > arr.length) {
    return []
  }

  const result = []
  const filledIndices = new Set()

  while (result.length < size) {
    const index = Math.floor(Math.random() * arr.length)
    if (!filledIndices.has(index)) {
      result.push(arr[index])
      filledIndices.add(index)
    }
  }

  return result
}

module.exports = {
  mapArticleData,
  mapArticleContent,
  mapLinkList,
  mapSectionId,
  getRandomSubarray
}
