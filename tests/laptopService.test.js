const laptopService = require('../services/laptopService')

const Database = require('better-sqlite3')
jest.mock('better-sqlite3')

const db = new Database()

describe('fetchLaptopData', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
  })

  it('should return laptop details for a given product ID', async () => {
    db.prepare().all.mockReturnValue([{
      batteryLife: '10 hours',
      batteryPower: '5000 mAh',
      screenSize: '15 inches',
      resolution: '1920x1080',
      displayType: 'LED',
      refreshRate: '144Hz',
      ram: '16GB',
      storageSize: '512GB'
    }])
    const productId = 123
    const result = await laptopService.fetchLaptopData({ productId })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE laptop_id = ?'))
    expect(db.prepare().all).toHaveBeenCalledWith(productId)
    expect(result).toEqual({
      batteryLife: '10 hours',
      batteryPower: '5000 mAh',
      screenSize: '15 inches',
      resolution: '1920x1080',
      displayType: 'LED',
      refreshRate: '144Hz',
      ram: '16GB',
      storageSize: '512GB'
    })
  })

  it('should handle empty results correctly', async () => {
    db.prepare().all.mockReturnValue([])
    const productId = 999 // Assuming 999 is an ID that does not exist
    const result = await laptopService.fetchLaptopData({ productId })

    expect(result).toBeUndefined()
  })
})
