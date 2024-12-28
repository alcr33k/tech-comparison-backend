const { fetchLaptopData } = require('../../services/laptopService')
const { fetchArticles, fetchArticleUrls, fetchLatestComparisons, fetchArticleContent, fetchArticleData } = require('../../services/articleService')
const { fetchInternalLinks } = require('../../services/internalLinkService')

const queryResolvers = {
  articles: (_, { onlyPublished }) => fetchArticles({ onlyPublished }),
  articleContent: (_, { url }) => fetchArticleContent({ url }),
  articleData: (_, { url }) => fetchArticleData({ url }),
  articleUrls: (_, { limit, onlyUnpublished, onlytoPublish }) => fetchArticleUrls({ limit, onlyUnpublished, onlytoPublish }),
  internalLinks: (_, { url }) => fetchInternalLinks({ url }),
  laptop: (_, { productId }) => fetchLaptopData({ productId }),
  latestComparisons: (_, { limit }) => fetchLatestComparisons(limit)
}

module.exports = queryResolvers
