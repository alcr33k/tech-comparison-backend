const { gql } = require('apollo-server')

const queries = gql`
  type Query {
    products: [Product]
    product(id: Int!): Product
    laptops: [Laptop]
    articles(onlyPublished: Boolean): [Article]
    articleList(limit: Int, onlyUnpublished: Boolean, onlytoPublish: Boolean): [String]
    latestComparisons(limit: Int): [LinkList]
    articleContent(url: String): ArticleContent
    articleData(url: String): ArticleData
    internalLinks(url: String): [LinkList]
  }
`

module.exports = queries
