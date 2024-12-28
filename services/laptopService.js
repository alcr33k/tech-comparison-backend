const Database = require('better-sqlite3')
const db = new Database('./products.db')

/**
 * Fetches data for a laptop given its product ID.
 *
 * @param {Object} input - The input with the product ID to fetch laptop data for.
 * @param {number} input.productId - The product ID of the laptop to fetch data for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the laptop specifications.
 */
const fetchLaptopData = ({ productId }) => {
  const sql = `
  SELECT
    battery_life AS batteryLife, 
    battery_power AS batteryPower, 
    screen_size AS screenSize, resolution, 
    display_type AS displayType, 
    refresh_rate AS refreshRate, 
    ram,
    internal_storage AS storageSize
  FROM specs
  WHERE laptop_id = ?
  `
  const stmt = db.prepare(sql).all(productId)
  return stmt[0]
}

module.exports = {
  fetchLaptopData
}
