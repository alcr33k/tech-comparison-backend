const userType = require('./types/User')
const postType = require('./types/Post')
const productType = require('./types/Product')
const queryType = require('./queries')
const articleType = require('./types/Article')
const laptopType = require('./types/Laptop')
const mutationType = require('./mutations')

const typeDefs = [userType, postType, productType, queryType, mutationType, articleType, laptopType]

module.exports = typeDefs
