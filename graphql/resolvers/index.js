const queryResolvers = require('./query')
const mutationResolvers = require('./mutation')

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers
}

module.exports = resolvers
