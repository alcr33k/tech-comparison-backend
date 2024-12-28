const Database = require('better-sqlite3')
const db = new Database('./products.db')
const { mapArticleData, mapArticleContent, mapLinkList, mapSectionId } = require('../utils')

/**
 * Fetch a list of article urls.
 *
 * @param {Object} input - The options for fetching articles.
 * @param {number} [input.limit] - How many articles to fetch.
 * @param {boolean} [input.onlyUnpublished] - Whether to fetch only unpublished articles.
 * @param {boolean} [input.onlytoPublish] - Whether to fetch only articles with a date_to_publish < NOW().
 * @returns {Array} - An array of articles.
 */
const fetchArticleUrls = ({ limit, onlyUnpublished, onlytoPublish }) => {
  let sql = 'SELECT url FROM article'
  const params = []
  const conditions = []

  if (onlyUnpublished) {
    conditions.push('published_date IS NULL')
  }

  if (onlytoPublish) {
    conditions.push('date_to_publish < CURRENT_TIMESTAMP')
  }

  if (typeof limit === 'number') {
    conditions.push('id <= ?')
    params.push(limit)
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ')
  }

  const rows = db.prepare(sql).all(...params)
  return rows.map(row => row.url)
}

/**
 * Fetches all articles, can also limit it to only return published articles
 *
 * @param {Object} input - The options for fetching articles.
 * @param {boolean} [input.onlyUnpublished] - Whether to fetch only unpublished articles.
 * @returns {Promise<Array>} - A promise that resolves to an array of articles.
 */
const fetchArticles = ({ onlyPublished }) => {
  let sql = `
  SELECT 
    article.id, 
    article.url, 
    article_meta.title 
  FROM article
    JOIN article_meta ON article.id = article_meta.article_id
  `
  const params = []

  if (onlyPublished) {
    sql += ' WHERE published_date IS NOT NULL'
  }

  return db.prepare(sql).all(params)
}

/**
 * Updates the published_date of an article to the current date.
 *
 * @param {Object} input - The input specifying the article id.
 * @param {number} input.article_id - The ID of the article to update.
 * @returns {Promise<Object>} - A promise that resolves when the update is complete.
 */
const updatePublishedDate = ({ articleUrls }) => {
  try {
    const urlParams = articleUrls.map(() => '?').join(', ')
    const sql = `
    UPDATE article 
    SET published_date = ? 
    WHERE url IN (${urlParams})
    `
    const now = new Date().toISOString()
    db.prepare(sql).run([now, ...articleUrls])
    return {
      updatedPublishedDate: true
    }
  } catch (e) {
    console.log(e)
    return {
      updatedPublishedDate: false
    }
  }
}

/**
 * Updates the content of an article on one or multiple sections
 *
 * @param {Object} input - The input specifying the article id.
 * @param {number} input.article_id - The ID of the article to update.
 * @param {number} input.sectionsToChange - The sections and content to change.
 * @returns {Boolean} - A promise that resolves when the update is complete.
 */
const updateArticle = ({ articleId, sectionsToChange }) => {
  try {
    Object.entries(sectionsToChange).forEach(([sectionName, content]) => {
      const sectionId = mapSectionId(sectionName)
      if (!sectionId) {
        return false
      }

      const sql = `
      UPDATE article_content 
        SET content = ? 
      WHERE 
        article_id = ? AND 
        section_id = ?
      `
      db.prepare(sql).run([content, articleId, sectionId])
    })
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

/**
 * Fetches article data for a given URL, including details about laptops.
 *
 * @param {Object} input - The input containing the article URL.
 * @param {string} input.url - The URL of the article to fetch data for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing laptop data, such as names, ratings, sizes, benchmarks, and specifications.
 */
const fetchArticleData = ({ url }) => {
  const sql = `
  SELECT
    l1.name AS laptop1FullName, l1.short_name AS laptop1ShortName,
    l2.name AS laptop2FullName, l2.short_name AS laptop2ShortName,
    s1.laptop_id AS laptop1Id, s1.width AS laptop1Width, s1.height AS laptop1Height, s1.thickness AS laptop1Thickness, s1.battery_life AS laptop1BatteryLife, s1.battery_power AS laptop1BatteryPower, s1.screen_size AS laptop1ScreenSize, s1.resolution AS laptop1Resolution, s1.display_type AS laptop1ScreenType, s1.refresh_rate AS laptop1RefreshRate, s1.ram AS laptop1Ram, s1.internal_storage AS laptop1Storage,
    s2.laptop_id AS laptop2Id, s2.width AS laptop2Width, s2.height AS laptop2Height, s2.thickness AS laptop2Thickness, s2.battery_life AS laptop2BatteryLife, s2.battery_power AS laptop2BatteryPower, s2.screen_size AS laptop2ScreenSize, s2.resolution AS laptop2Resolution, s2.display_type AS laptop2ScreenType, s2.refresh_rate AS laptop2RefreshRate, s2.ram AS laptop2Ram, s2.internal_storage AS laptop2Storage,
    r1.overall AS laptop1Overall, r1.design AS laptop1Design, r1.display AS laptop1Display, r1.performance AS laptop1Performance, r1.benchmarks AS laptop1Benchmarks, r1.connectivity AS laptop1Connectivity, r1.battery AS laptop1Battery, r1.features AS laptop1Features,
    r2.overall AS laptop2Overall, r2.design AS laptop2Design, r2.display AS laptop2Display, r2.performance AS laptop2Performance, r2.benchmarks AS laptop2Benchmarks, r2.connectivity AS laptop2Connectivity, r2.battery AS laptop2Battery, r2.features AS laptop2Features,
    b1.geekbench_5_multi AS laptop1Geekbench5Multi, b1.geekbench_5_single AS laptop1Geekbench5Single, b1.passmark AS laptop1Passmark, b1.passmark_single AS laptop1PassmarkSingle, b1.cinebench_r20_multi AS laptop1CinebenchR20Multi, b1.cinebench_r20_single AS laptop1CinebenchR20Single, b1.blender AS laptop1Blender,
    b2.geekbench_5_multi AS laptop2Geekbench5Multi, b2.geekbench_5_single AS laptop2Geekbench5Single, b2.passmark AS laptop2Passmark, b2.passmark_single AS laptop2PassmarkSingle, b2.cinebench_r20_multi AS laptop2CinebenchR20Multi, b2.cinebench_r20_single AS laptop2CinebenchR20Single, b2.blender AS laptop2Blender
  FROM article a
    JOIN laptop l1 on a.laptop_1_id = l1.laptop_id
    JOIN laptop l2 on a.laptop_2_id = l2.laptop_id
    JOIN specs s1 ON a.laptop_1_id = s1.laptop_id
    JOIN specs s2 ON a.laptop_2_id = s2.laptop_id
    JOIN ratings r1 ON s1.laptop_id = r1.laptop_id
    JOIN ratings r2 ON s2.laptop_id = r2.laptop_id
    JOIN benchmark b1 ON s1.laptop_id = b1.laptop_id
    JOIN benchmark b2 ON s2.laptop_id = b2.laptop_id
  WHERE a.url = ?
  `
  const stmt = db.prepare(sql).get(url)
  return mapArticleData(stmt)
}

/**
 * Fetches article content for a given URL, including sections like introduction, design, performance, and more.
 *
 * @param {Object} input - The input containing the article URL.
 * @param {string} input.url - The URL of the article to fetch content for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing various sections of article content.
 */
const fetchArticleContent = ({ url }) => {
  const sql = `
  SELECT 
    article_meta.*, 
    article_content.*
  FROM article
    JOIN article_meta ON article_meta.article_id = article.id
    JOIN article_content ON article_content.article_id = article.id
  WHERE article.url = ?
  `
  const stmt = db.prepare(sql).all(url)
  return mapArticleContent(stmt)
}

/**
 * Fetches latest articles base on publishedDT
 *
 * @param {Object} input - The options for fetching articles.
 * @param {number} [input.limit] - The amount of articles to fetch, deafult 5 articles.
 * @returns {Promise<Array>} - A promise that resolves to an array of article names and urls.
 */
const fetchLatestComparisons = ({ limit = 5 }) => {
  let sql = `
  SELECT 
    a.url,
    am.title 
  FROM article a
    JOIN article_meta am ON am.article_id = a.id
  WHERE a.published_date IS NOT null
  ORDER BY a.published_date DESC
  `
  const params = []

  if (typeof limit === 'number') {
    sql += ' LIMIT ?'
    params.push(limit)
  }

  const stmt = db.prepare(sql).all(params)
  return mapLinkList(stmt)
}

module.exports = {
  fetchArticles,
  fetchArticleUrls,
  updatePublishedDate,
  fetchArticleData,
  fetchArticleContent,
  fetchLatestComparisons,
  updateArticle
}
