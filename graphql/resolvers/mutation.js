const { generateInternalLinks } = require('../../services/internalLinkService')
const { updatePublishedDate, updateArticle } = require('../../services/articleService')

const mutationResolvers = {
  generateInternalLinks: (_, { articleUrls }) => generateInternalLinks({ articleUrls }),
  updateArticle: (_, { articleId, sectionsToChange }) => updateArticle({ articleId, sectionsToChange }),
  updatePublished: (_, { articleUrls }) => updatePublishedDate({ articleUrls })
}

module.exports = mutationResolvers
