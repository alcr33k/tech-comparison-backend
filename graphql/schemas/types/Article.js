const { gql } = require('apollo-server')

module.exports = gql`
  type Article {
    id: ID!
    url: String
    title: String
  }

  input ArticleInput {
    limit: Int
    onlyUnpublished: Boolean
    onlytoPublish: Boolean
  }

  type LinkList {
    url: String
    title: String
  }

  type ArticleContent {
    intro: String
    design: String
    screen: String
    hardware: String
    performance: String
    battery: String
    userReviews: String
    priceComparison: String
    reasonsToGetLaptop1: String
    reasonsToGetLaptop2: String
    metaTitle: String
    metaDescription: String
  }

  input ArticleSection {
    intro: String
    design: String
    screen: String
    hardware: String
    performance: String
    battery: String
    userReviews: String
    priceComparison: String
    reasonsToGetLaptop1: String
    reasonsToGetLaptop2: String
  }

  type ArticleData {
    names: [LaptopNames]
    ratings: [Rating]
    laptopSizes: [LaptopSize]
    benchmarks: [Benchmark]
    specs: [LaptopSpecsSlim]
  }

  type UpdatedPublishedOutput {
    updatedPublishedDate: Boolean
  }
  
`
