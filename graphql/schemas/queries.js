const { gql } = require('apollo-server')

const queries = gql`
  type Query {
    articles(onlyPublished: Boolean): [Article]
    articleContent(url: String): ArticleContent
    articleData(url: String): ArticleData
    articleUrls(limit: Int, onlyUnpublished: Boolean, onlytoPublish: Boolean): [String]
    internalLinks(url: String): [LinkList]
    laptop(productId: Int!): LaptopSpecsSlim
    latestComparisons(limit: Int): [LinkList]
  }
`

module.exports = queries
