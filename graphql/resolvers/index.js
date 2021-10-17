const authresolver = require('./auth')
const bookingResolver = require('./booking')
const eventResolver = require('./events')

const rootResolver = {
  ...authresolver,
  ...bookingResolver,
  ...eventResolver
}

module.exports = rootResolver
