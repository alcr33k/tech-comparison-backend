const linkService = require('../services/internalLinkService')

const Database = require('better-sqlite3')
jest.mock('better-sqlite3')

const db = new Database()

describe('fetchInternalLinks', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
  })

  it('should return internal links for a given article URL', async () => {
    // Mock data returned by the database for a specific article URL
    db.prepare().all.mockReturnValue([
      { url: 'https://example.com/article1', title: 'Interesting Article 1' },
      { url: 'https://example.com/article2', title: 'Interesting Article 2' }
    ])
    const url = 'https://example.com/main'
    const result = await linkService.fetchInternalLinks({ url })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE a_from.url = ?'))
    expect(db.prepare().all).toHaveBeenCalledWith(url)
    expect(result).toEqual([
      { url: 'https://example.com/article1', title: 'Interesting Article 1' },
      { url: 'https://example.com/article2', title: 'Interesting Article 2' }
    ])
  })

  it('should handle empty results correctly', async () => {
    db.prepare().all.mockReturnValue([])
    const url = 'https://example.com/nonexistent'
    const result = await linkService.fetchInternalLinks({ url })

    expect(result).toEqual([])
  })
})

describe('generateInternalLinks', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
    db.prepare().get.mockClear()
    db.prepare().run.mockClear()
  })

  it('should insert internal links for articles without existing links', async () => {
    const urls = ['https://example.com/article1']
    db.prepare().get.mockReturnValue({ id: 1 })
    db.prepare().all.mockReturnValueOnce([]).mockReturnValueOnce([{ id: 5 }, { id: 7 }, { id: 12 }, { id: 22 }, { id: 26 }])
    const result = await linkService.generateInternalLinks({ articleUrls: urls })

    expect(db.prepare().get).toHaveBeenCalledWith(urls[0])
    expect(db.prepare().get).toHaveBeenCalledTimes(1)
    expect(db.prepare().all).toHaveBeenCalledTimes(2)
    expect(db.prepare().run).toHaveBeenCalledTimes(5)
    expect(result).toBe(true)
  })

  it('should skip insertion if article already has links', async () => {
    const urls = ['https://example.com/article1']
    db.prepare().get.mockReturnValue({ id: 1 })
    db.prepare().all.mockReturnValue([{ id: 123 }]).mockReturnValueOnce([])

    const result = await linkService.generateInternalLinks({ articleUrls: urls })

    expect(db.prepare().all).toHaveBeenCalledWith(1)
    expect(db.prepare().run).not.toHaveBeenCalled()
    expect(result).toBe(true)
  })

  it('should return false on database errors', async () => {
    const urls = ['https://example.com/article1']
    db.prepare().get.mockImplementation(() => { throw new Error('DB Error') })

    const result = await linkService.generateInternalLinks({ articleUrls: urls })

    expect(result).toBe(false)
  })

  it('should return true on empty article urls', async () => {
    const urls = []
    const result = await linkService.generateInternalLinks({ articleUrls: urls })
    expect(result).toBe(true)
  })

  it('should insert skip first urls with existing links but add links for the second with links', async () => {
    const urls = ['https://example.com/article-with-links-already', 'https://example.com/article-with-no-links']
    db.prepare().get.mockReturnValueOnce([]).mockReturnValueOnce({ id: 1 })
    db.prepare().all.mockReturnValueOnce([]).mockReturnValueOnce([{ id: 5 }, { id: 7 }, { id: 12 }, { id: 22 }, { id: 26 }])
    const result = await linkService.generateInternalLinks({ articleUrls: urls })

    expect(db.prepare().get).toHaveBeenCalledWith(urls[1])
    expect(db.prepare().get).toHaveBeenCalledTimes(2)
    expect(db.prepare().all).toHaveBeenCalledTimes(3)
    expect(db.prepare().run).toHaveBeenCalledTimes(5)
    expect(result).toBe(true)
  })
})
