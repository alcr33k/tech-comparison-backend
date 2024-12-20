const Database = require('better-sqlite3')
const db = new Database('./products.db')

const fetchLaptopData = (productId) => {
  return Promise.resolve(products.find(p => p.id === productId))
}

module.exports = {
  fetchLaptopData
}
