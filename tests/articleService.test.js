const articleService = require('../services/articleService')

const Database = require('better-sqlite3')
jest.mock('better-sqlite3')

const db = new Database()

describe('fetchArticleUrls', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
  })

  it('should fetch all article URLs with no conditions', async () => {
    db.prepare().all.mockReturnValue([
      { url: 'https://example.com/article1' },
      { url: 'https://example.com/article2' }
    ])
    const result = articleService.fetchArticleUrls({})

    expect(db.prepare).toHaveBeenCalledWith('SELECT url FROM article')
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual([
      'https://example.com/article1',
      'https://example.com/article2'
    ])
  })

  it('should fetch only unpublished article URLs', async () => {
    db.prepare().all.mockReturnValue([
      { url: 'https://example.com/unpublished1' }
    ])
    const result = articleService.fetchArticleUrls({ onlyUnpublished: true })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('published_date IS NULL'))
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual(['https://example.com/unpublished1'])
  })

  it('should fetch article URLs to be published before current timestamp', async () => {
    db.prepare().all.mockReturnValue([
      { url: 'https://example.com/to-publish' }
    ])
    const result = articleService.fetchArticleUrls({ onlytoPublish: true })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('date_to_publish < CURRENT_TIMESTAMP'))
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual(['https://example.com/to-publish'])
  })

  it('should handle combined conditions', async () => {
    db.prepare().all.mockReturnValue([
      { url: 'https://example.com/special' }
    ])
    const result = articleService.fetchArticleUrls({ onlyUnpublished: true, onlytoPublish: true })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('published_date IS NULL AND date_to_publish < CURRENT_TIMESTAMP'))
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual(['https://example.com/special'])
  })

  it('should limit the number of articles fetched', async () => {
    db.prepare().all.mockReturnValue([
      { url: 'https://example.com/limited1' },
      { url: 'https://example.com/limited2' }
    ])
    const result = articleService.fetchArticleUrls({ limit: 2 })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('id <= ?'))
    expect(db.prepare().all).toHaveBeenCalledWith(2)
    expect(result).toEqual([
      'https://example.com/limited1',
      'https://example.com/limited2'
    ])
  })

  it('should return an empty array if no articles match the criteria', async () => {
    db.prepare().all.mockReturnValue([])
    const result = articleService.fetchArticleUrls({ onlyUnpublished: true, limit: 1 })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('published_date IS NULL AND id <= ?'))
    expect(db.prepare().all).toHaveBeenCalledWith(1)
    expect(result).toEqual([])
  })
})

describe('fetchArticles', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
  })

  it('should fetch all articles when no conditions are specified', async () => {
    db.prepare().all.mockReturnValue([
      { id: 1, url: 'https://example.com/article1', title: 'Article One' },
      { id: 2, url: 'https://example.com/article2', title: 'Article Two' }
    ])
    const result = articleService.fetchArticles({})

    expect(db.prepare).toHaveBeenCalledWith(`
  SELECT 
    article.id, 
    article.url, 
    article_meta.title 
  FROM article
    JOIN article_meta ON article.id = article_meta.article_id
  `)
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual([
      { id: 1, url: 'https://example.com/article1', title: 'Article One' },
      { id: 2, url: 'https://example.com/article2', title: 'Article Two' }
    ])
  })

  it('should only fetch published articles when onlyPublished is true', async () => {
    db.prepare().all.mockReturnValue([
      { id: 3, url: 'https://example.com/article3', title: 'Published Article' }
    ])
    const result = articleService.fetchArticles({ onlyPublished: true })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE published_date IS NOT NULL'))
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual([
      { id: 3, url: 'https://example.com/article3', title: 'Published Article' }
    ])
  })

  it('should return an empty array if no articles are found', async () => {
    db.prepare().all.mockReturnValue([])
    const result = articleService.fetchArticles({ onlyPublished: true })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE published_date IS NOT NULL'))
    expect(db.prepare().all).toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('should handle database errors gracefully', async () => {
    db.prepare().all.mockImplementation(() => { throw new Error('DB Error') })
    try {
      await articleService.fetchArticles({ onlyPublished: true })
    } catch (error) {
      expect(error.message).toEqual('DB Error')
    }
  })
})

describe('updatePublishedDate', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().run.mockClear()
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      toISOString: () => '2023-12-01T00:00:00.000Z'
    }))
  })

  afterEach(() => {
    global.Date.mockRestore()
  })

  it('should update the published date of a single article', async () => {
    const articleUrls = ['https://example.com/article1']
    const result = articleService.updatePublishedDate({ articleUrls })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE url IN (?)'))
    expect(db.prepare().run).toHaveBeenCalledWith(['2023-12-01T00:00:00.000Z', ...articleUrls])
    expect(result).toEqual({ updatedPublishedDate: true })
  })

  it('should update the published date of multiple articles', async () => {
    const articleUrls = ['https://example.com/article1', 'https://example.com/article2']
    const result = articleService.updatePublishedDate({ articleUrls })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE url IN (?, ?)'))
    expect(db.prepare().run).toHaveBeenCalledWith(['2023-12-01T00:00:00.000Z', ...articleUrls])
    expect(result).toEqual({ updatedPublishedDate: true })
  })

  it('should handle errors gracefully', async () => {
    const articleUrls = ['https://example.com/faulty']
    db.prepare().run.mockImplementation(() => { throw new Error('DB Error') })

    const result = articleService.updatePublishedDate({ articleUrls })

    expect(result).toEqual({ updatedPublishedDate: false })
  })
})

describe('updateArticle', () => {
  beforeEach(() => {
    db.prepare().run.mockClear()
    db.prepare().run.mockReset()
    db.prepare.mockClear()
  })

  it('should update multiple sections of an article using the correct section IDs', async () => {
    const articleId = 123
    const sectionsToChange = {
      intro: 'New introduction text',
      battery: 'Updated battery section'
    }
    const result = articleService.updateArticle({ articleId, sectionsToChange })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('UPDATE article_content'))
    expect(db.prepare().run).toHaveBeenCalledTimes(2)
    expect(db.prepare().run).toHaveBeenCalledWith(['New introduction text', articleId, 1])
    expect(result).toBe(true)
  })

  it('should handle database errors gracefully', async () => {
    const articleId = 456
    const sectionsToChange = {
      design: 'Revised design section'
    }
    db.prepare().run.mockImplementation(() => { throw new Error('DB Error') })

    const result = articleService.updateArticle({ articleId, sectionsToChange })

    expect(result).toBe(false)
  })

  it('should not proceed with any updates if sectionsToChange is empty', async () => {
    const articleId = 789
    const sectionsToChange = {}
    const result = articleService.updateArticle({ articleId, sectionsToChange })

    expect(db.prepare).not.toHaveBeenCalled()
    expect(result).toBe(true)
  })

  it('should not update the article if section name does not exist in the mapping', async () => {
    const articleId = 1011
    const sectionsToChange = {
      nonExistentSection: 'This should not update anything'
    }
    const result = articleService.updateArticle({ articleId, sectionsToChange })

    expect(db.prepare).not.toHaveBeenCalled()
    expect(result).toBe(true)
  })
})

describe('fetchArticleData', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().get.mockClear()
  })

  it('should fetch laptop data for a given article URL and format it correctly', async () => {
    const url = 'https://example.com/article-about-laptops'
    const rawSqlData = {
      laptop1FullName: 'Laptop Model A',
      laptop1ShortName: 'LMA',
      laptop2FullName: 'Laptop Model B',
      laptop2ShortName: 'LMB',
      laptop1Overall: 4.5,
      laptop1Design: 3.5,
      laptop1Display: 4.0,
      laptop1Performance: 4.7,
      laptop1Benchmarks: 4.3,
      laptop1Connectivity: 4.1,
      laptop1Battery: 4.5,
      laptop1Features: 4.2,
      laptop2Overall: 4.2,
      laptop2Design: 3.8,
      laptop2Display: 4.1,
      laptop2Performance: 4.5,
      laptop2Benchmarks: 4.0,
      laptop2Connectivity: 3.9,
      laptop2Battery: 4.4,
      laptop2Features: 4.1,
      laptop1Width: 15,
      laptop1Height: 10,
      laptop1Thickness: 0.5,
      laptop2Width: 14.5,
      laptop2Height: 9.5,
      laptop2Thickness: 0.6,
      laptop1Geekbench5Multi: 1234,
      laptop1Geekbench5Single: 1100,
      laptop1Passmark: 2000,
      laptop1PassmarkSingle: 1500,
      laptop1CinebenchR20Multi: 750,
      laptop1CinebenchR20Single: 700,
      laptop1Blender: 600,
      laptop2Geekbench5Multi: 1250,
      laptop2Geekbench5Single: 1150,
      laptop2Passmark: 2100,
      laptop2PassmarkSingle: 1600,
      laptop2CinebenchR20Multi: 800,
      laptop2CinebenchR20Single: 750,
      laptop2Blender: 610,
      laptop1BatteryLife: 10,
      laptop1BatteryPower: 55,
      laptop1ScreenSize: 15.6,
      laptop1Resolution: '1920x1080',
      laptop1ScreenType: 'IPS',
      laptop1RefreshRate: 144,
      laptop1Ram: 16,
      laptop1Storage: 512,
      laptop2BatteryLife: 9,
      laptop2BatteryPower: 50,
      laptop2ScreenSize: 14.5,
      laptop2Resolution: '2560x1440',
      laptop2ScreenType: 'OLED',
      laptop2RefreshRate: 120,
      laptop2Ram: 8,
      laptop2Storage: 256
    }
    db.prepare().get.mockReturnValue(rawSqlData)

    const expectedData = {
      names: [
        { fullName: 'Laptop Model A', shortName: 'LMA' },
        { fullName: 'Laptop Model B', shortName: 'LMB' }
      ],
      ratings: [
        { overall: 4.5, design: 3.5, display: 4.0, performance: 4.7, benchmarks: 4.3, connectivity: 4.1, battery: 4.5, features: 4.2 },
        { overall: 4.2, design: 3.8, display: 4.1, performance: 4.5, benchmarks: 4.0, connectivity: 3.9, battery: 4.4, features: 4.1 }
      ],
      laptopSizes: [
        { width: 15, height: 10, thickness: 0.5 },
        { width: 14.5, height: 9.5, thickness: 0.6 }
      ],
      benchmarks: [
        { geekbench5Multi: 1234, geekbench5Single: 1100, passmark: 2000, passmarkSingle: 1500, cinebenchR20Multi: 750, cinebenchR20Single: 700, blender: 600 },
        { geekbench5Multi: 1250, geekbench5Single: 1150, passmark: 2100, passmarkSingle: 1600, cinebenchR20Multi: 800, cinebenchR20Single: 750, blender: 610 }
      ],
      specs: [
        { batteryLife: 10, batteryPower: 55, screenSize: 15.6, resolution: '1920x1080', displayType: 'IPS', refreshRate: 144, ram: 16, storageSize: 512 },
        { batteryLife: 9, batteryPower: 50, screenSize: 14.5, resolution: '2560x1440', displayType: 'OLED', refreshRate: 120, ram: 8, storageSize: 256 }
      ]
    }

    const result = articleService.fetchArticleData({ url })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('SELECT'))
    expect(db.prepare().get).toHaveBeenCalledWith(url)
    expect(result).toEqual(expectedData)
  })

  it('should handle errors gracefully', async () => {
    const url = 'https://example.com/error-article'
    db.prepare().get.mockImplementation(() => { throw new Error('DB Error') })

    expect(async () => {
      await articleService.fetchArticleData({ url })
    }).rejects.toThrow('DB Error')
  })
})

describe('fetchArticleContent', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().get.mockClear()
  })

  it('should fetch article content for a given URL and format it correctly', async () => {
    const url = 'https://example.com/detailed-article'
    const rawSqlData = [
      { section_id: 1, content: 'Introduction content', title: 'Article Title', description: 'Article Description' },
      { section_id: 2, content: 'Design content' },
      { section_id: 3, content: 'Screen content' },
      { section_id: 4, content: 'Hardware specs' },
      { section_id: 5, content: 'Performance metrics' },
      { section_id: 6, content: 'Battery life details' },
      { section_id: 7, content: 'User reviews' },
      { section_id: 8, content: 'Price comparison' },
      { section_id: 9, content: 'Reasons to buy Laptop 1', title: 'Why Buy Laptop 1', description: 'Benefits of Buying Laptop 1' },
      { section_id: 10, content: 'Reasons to buy Laptop 2' }
    ]
    db.prepare().all.mockReturnValue(rawSqlData)

    const result = articleService.fetchArticleContent({ url })

    const expectedData = {
      battery: 'Battery life details',
      design: 'Design content',
      hardware: 'Hardware specs',
      intro: 'Introduction content',
      metaDescription: 'Benefits of Buying Laptop 1',
      metaTitle: 'Why Buy Laptop 1',
      performance: 'Performance metrics',
      priceComparison: 'Price comparison',
      reasonsToGetLaptop1: 'Reasons to buy Laptop 1',
      reasonsToGetLaptop2: 'Reasons to buy Laptop 2',
      screen: 'Screen content',
      userReviews: 'User reviews'
    }

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('SELECT'))
    expect(db.prepare().all).toHaveBeenCalledWith(url)
    expect(result).toEqual(expectedData)
  })

  it('should handle cases when no data is found', async () => {
    const url = 'https://example.com/empty-article'
    db.prepare().all.mockReturnValue([])

    const result = articleService.fetchArticleContent({ url })
    const expectedData = {
      battery: null,
      design: null,
      hardware: null,
      intro: null,
      metaDescription: null,
      metaTitle: null,
      performance: null,
      priceComparison: null,
      reasonsToGetLaptop1: null,
      reasonsToGetLaptop2: null,
      screen: null,
      userReviews: null
    }

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('WHERE article.url = ?'))
    expect(db.prepare().all).toHaveBeenCalledWith(url)
    expect(result).toEqual(expectedData)
  })

  it('should handle database errors gracefully', async () => {
    const url = 'https://example.com/error-article'
    db.prepare().all.mockImplementation(() => { throw new Error('DB Error') })

    await expect(async () => {
      await articleService.fetchArticleContent({ url })
    }).rejects.toThrow('DB Error')
  })
})

describe('fetchLatestComparisons', () => {
  beforeEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
  })

  afterEach(() => {
    db.prepare.mockClear()
    db.prepare().all.mockClear()
  })

  it('should fetch the default number of latest articles when no limit is provided', async () => {
    const rawSqlData = [
      { url: 'https://example.com/article1', title: 'Article One' },
      { url: 'https://example.com/article2', title: 'Article Two' }
    ]
    db.prepare().all.mockReturnValue(rawSqlData)

    const result = articleService.fetchLatestComparisons({})

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('LIMIT ?'))
    expect(db.prepare().all).toHaveBeenCalledWith([5])
    expect(result).toEqual(rawSqlData)
  })

  it('should fetch a specified number of articles when limit is provided', async () => {
    const limit = 3
    const rawSqlData = [
      { url: 'https://example.com/article1', title: 'Article One' },
      { url: 'https://example.com/article2', title: 'Article Two' },
      { url: 'https://example.com/article3', title: 'Article Three' }
    ]
    db.prepare().all.mockReturnValue(rawSqlData)

    const result = articleService.fetchLatestComparisons({ limit })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('LIMIT ?'))
    expect(db.prepare().all).toHaveBeenCalledWith([limit])
    expect(result).toEqual(rawSqlData)
  })

  it('should handle cases when no articles are available', async () => {
    db.prepare().all.mockReturnValue([])

    const result = articleService.fetchLatestComparisons({ limit: 3 })

    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('LIMIT ?'))
    expect(db.prepare().all).toHaveBeenCalledWith([3])
    expect(result).toEqual([])
  })

  it('should handle database errors gracefully', async () => {
    db.prepare().all.mockImplementation(() => { throw new Error('DB Error') })

    await expect(async () => {
      await articleService.fetchLatestComparisons({ limit: 3 })
    }).rejects.toThrow('DB Error')
  })

  it('should use the default limit when a non-numeric limit is provided', async () => {
    const rawSqlData = [
      { url: 'https://example.com/article1', title: 'Article One' }
    ]
    db.prepare().all.mockReturnValue(rawSqlData)

    const result = await articleService.fetchLatestComparisons({ limit: 'five' })

    expect(db.prepare).not.toHaveBeenCalledWith(expect.stringContaining('LIMIT ?'))
    expect(db.prepare().all).toHaveBeenCalledWith([])
    expect(result).toEqual(rawSqlData)
  })
})
