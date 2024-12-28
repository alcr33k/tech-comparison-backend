const { gql } = require('apollo-server')

const mutations = gql`
  type Mutation {
    generateInternalLinks(articleUrls: [String]): Boolean
    updateArticle(articleId: ID!, sectionsToChange: ArticleSection): Boolean
    updatePublished(articleUrls: [String]): UpdatedPublishedOutput
  }
`

module.exports = mutations
