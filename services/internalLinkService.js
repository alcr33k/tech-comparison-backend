const Database = require('better-sqlite3')
const db = new Database('./products.db')
const { mapLinkList } = require('../utils/mappingFunctions')

/**
 * Inserts internal links for given article ids
 *
 * @param {Object} input - The input with the articles to create internal links for
 * @param {Array<String>} [input.articleUrls] - The urls of the articles to create internal links for
 * @returns {Promise<Object>} - A promise that resolves when the insert is complete.
 */
const generateInternalLinks = ({ articleUrls }) => {
  try {
    for (url of articleUrls) {
      // Get current article id
      const sql1 = 'SELECT * FROM article WHERE url = ?'
      const currentArticleData = db.prepare(sql1).get(url)
      const currentArticleId = currentArticleData.id
      // Check if url already has internal links, if it has continue
      const sql2 = 'SELECT * FROM internal_link WHERE article_link_from = ?'
      const existingLinks = db.prepare(sql2).all(currentArticleId)
      if (existingLinks?.length && articleUrls.length > 0) {
        continue
      }
      // Get all published articles
      const sql3 = 'SELECT id FROM article WHERE published_date IS NOT NULL'
      const publishedArticles = db.prepare(sql3).all()
      const publishedIds = publishedArticles.map(v => v.id)
      // For now take 5 random published articles, later use more complex logic for deciding what to link to
      const randomIds = getRandomSubarray(publishedIds, 5)
      const insertSQL = db.prepare('INSERT INTO internal_link (article_link_from, article_link_to, anchor) VALUES (?, ?, (SELECT title FROM article_meta WHERE article_id = ?))')
      for (id of randomIds) {
        insertSQL.run(currentArticleId, id, id)
      }
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

const fetchInternalLinks = ({url}) => {
  const sql = `
  SELECT 
    a_to.url, 
    a_to_meta.title
  FROM internal_link as link
    JOIN article as a_from ON link.article_link_from = a_from.id
    JOIN article as a_to ON link.article_link_to = a_to.id
    JOIN article_meta AS a_to_meta ON a_to.id = a_to_meta.article_id
  WHERE a_from.url = ?
  `
  const stmt = db.prepare(sql).all(url)
  return mapLinkList(stmt)
}

/**
 * Generates a random subset of elements from the given array.
 *
 * @param {Array} arr - The original array from which to pick elements.
 * @param {number} size - The number of random elements to pick.
 * @returns {Array} An array containing `size` randomly picked, unique elements from `arr`.
 */
function getRandomSubarray(arr, size) {
  let result = [];
  let filledIndices = new Set();

  while (result.length < size) {
    let index = Math.floor(Math.random() * arr.length);
    if (!filledIndices.has(index)) {
      result.push(arr[index]);
      filledIndices.add(index);
    }
  }

  return result;
}

module.exports = {
  generateInternalLinks,
  fetchInternalLinks
}
