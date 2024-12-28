const mockAll = jest.fn()
const mockGet = jest.fn()
const mockRun = jest.fn()

const mockPrepare = jest.fn(sql => ({
  all: mockAll,
  get: mockGet,
  run: mockRun,
  sql
}))

class MockDatabase {
  prepare = mockPrepare
}

module.exports = function () {
  return new MockDatabase()
}
module.exports.mockPrepare = mockPrepare
module.exports.mockAll = mockAll
module.exports.mockGet = mockGet
module.exports.mockRun = mockRun
