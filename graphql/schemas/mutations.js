const { gql } = require('apollo-server')

const mutations = gql`
  type Mutation {
    createProduct(product: ProductInput): String
    generateInternalLinks(articleUrls: [String]): Boolean
    updatePublished(articleUrls: [String]): UpdatedPublishedOutput
    updateArticle(articleId: ID!, sectionsToChange: ArticleSection): Boolean
  }
`

module.exports = mutations
