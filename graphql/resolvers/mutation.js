const { createProduct } = require('../../services/productService')
const { generateInternalLinks } = require('../../services/internalLinkService')
const { updatePublishedDate, updateArticle } = require('../../services/articleService')

const mutationResolvers = {
  createProduct: (_, { product }) => createProduct(product),
  generateInternalLinks: (_, { articleUrls }) => generateInternalLinks({ articleUrls }),
  updatePublished: (_, { articleUrls }) => updatePublishedDate({ articleUrls }),
  updateArticle: (_, { articleId, sectionsToChange }) => updateArticle({ articleId, sectionsToChange })
}

module.exports = mutationResolvers
