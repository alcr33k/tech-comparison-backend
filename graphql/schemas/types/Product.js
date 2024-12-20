const { gql } = require('apollo-server')

module.exports = gql`
  type Product {
    id: Int
    name: String
    description: String
  }

  input ProductInput {
    name: String
    description: String
  }
`
