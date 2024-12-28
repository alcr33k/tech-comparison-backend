const Database = require('better-sqlite3')
const db = new Database('./products.db')
const { mapLinkList, getRandomSubarray } = require('../utils')

/**
 * Inserts internal links for given article ids
 *
 * @param {Object} input - The input with the articles to create internal links for
 * @param {Array<String>} [input.articleUrls] - The urls of the articles to create internal links for
 * @returns {Boolean} - A boolean indicating if it sucessfully generated 
 */
const generateInternalLinks = ({ articleUrls }) => {
  try {
    for (const url of articleUrls) {
      // Get current article id
      const sql1 = 'SELECT * FROM article WHERE url = ?'
      const currentArticleData = db.prepare(sql1).get(url)
      const currentArticleId = currentArticleData.id
      // Check if url already has internal links, if it has continue
      const sql2 = 'SELECT * FROM internal_link WHERE article_link_from = ?'
      const existingLinks = db.prepare(sql2).all(currentArticleId)
      if (existingLinks?.length) { // existingLinks?.length && articleUrls.length > 0
        continue
      }
      // Get all published articles
      const sql3 = 'SELECT id FROM article WHERE published_date IS NOT NULL'
      const publishedArticles = db.prepare(sql3).all()
      const publishedIds = publishedArticles.map(v => v.id)
      // For now take 5 random published articles, later use more complex logic for deciding what to link to
      const randomIds = getRandomSubarray(publishedIds, 5)
      const insertSQL = db.prepare('INSERT INTO internal_link (article_link_from, article_link_to, anchor) VALUES (?, ?, (SELECT title FROM article_meta WHERE article_id = ?))')
      for (const id of randomIds) {
        insertSQL.run(currentArticleId, id, id)
      }
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

/**
 * Fetches internal links for a given article URL.
 *
 * @param {Object} input - The input with the article URL to fetch internal links for.
 * @param {String} input.url - The URL of the article to fetch internal links for.
 * @returns {Array<Object>} - An array of internal link objects.
 */
const fetchInternalLinks = ({ url }) => {
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

module.exports = {
  generateInternalLinks,
  fetchInternalLinks
}
