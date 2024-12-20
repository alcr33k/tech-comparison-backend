const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }
`
