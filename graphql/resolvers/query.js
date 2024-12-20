const { getProducts, getProductById } = require('../../services/productService') // To remove
const { fetchLaptopData } = require('../../services/laptopService')
const { fetchArticles, fetchArticleList, fetchLatestComparisons, fetchArticleContent, fetchArticleData } = require('../../services/articleService')
const { fetchInternalLinks } = require('../../services/internalLinkService')

const queryResolvers = {
  products: () => getProducts(),
  product: (_, { id }) => getProductById(id),
  laptops: () => fetchLaptopData(),
  articles: (_, { onlyPublished }) => fetchArticles({ onlyPublished }),
  articleList: (_, { limit, onlyUnpublished, onlytoPublish }) => fetchArticleList({ limit, onlyUnpublished, onlytoPublish }),
  latestComparisons: (_, { limit }) => fetchLatestComparisons(limit),
  articleContent: (_, { url }) => fetchArticleContent({ url }),
  articleData: (_, { url }) => fetchArticleData({ url }),
  internalLinks: (_, { url }) => fetchInternalLinks({ url })
}

/*
// Endpoints to add
// fetchArticleList (returns all article urls, takes in limit so it only returns first x articles)
// fetchLatestComparisons (returns latest vs articles base on publishedDT)
// fetchArticleContent (will return articleSections, reasonsToGet)
// fetchArticleData (ratings, laptopSizes, benchmarks, specs)

// articleSections, gets all article sections based on url
// reasonsToGet (based on new table, for reasons to get table)
// ratings, returns data from the ratings table based on url
// laptopSizes (based on url)
// benchmarks (based on url, get from benchmarks table)
// specs (based on url, get some battery data)
)
*/

module.exports = queryResolvers
