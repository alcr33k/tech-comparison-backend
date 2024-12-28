const { mapSectionId, mapLinkList, mapArticleContent, mapArticleData } = require('../utils')

describe('mapArticleData', () => {
  test('maps sqlData correctly with complete input', () => {
    const sqlData = {
      laptop1FullName: 'Laptop 1 Full Name',
      laptop1ShortName: 'Laptop 1',
      laptop2FullName: 'Laptop 2 Full Name',
      laptop2ShortName: 'Laptop 2',
      laptop1Overall: 9.2,
      laptop1Design: 8.5,
      laptop1Display: 9.0,
      laptop1Performance: 9.5,
      laptop1Benchmarks: 8.7,
      laptop1Connectivity: 8.0,
      laptop1Battery: 9.1,
      laptop1Features: 8.9,
      laptop2Overall: 8.8,
      laptop2Design: 8.3,
      laptop2Display: 8.9,
      laptop2Performance: 9.0,
      laptop2Benchmarks: 8.4,
      laptop2Connectivity: 7.9,
      laptop2Battery: 8.7,
      laptop2Features: 8.6,
      laptop1Width: 34.5,
      laptop1Height: 24.5,
      laptop1Thickness: 2.1,
      laptop2Width: 35.2,
      laptop2Height: 25.0,
      laptop2Thickness: 2.3,
      laptop1Geekbench5Multi: 12000,
      laptop1Geekbench5Single: 1500,
      laptop1Passmark: 8000,
      laptop1PassmarkSingle: 1200,
      laptop1CinebenchR20Multi: 4500,
      laptop1CinebenchR20Single: 1000,
      laptop1Blender: 150,
      laptop2Geekbench5Multi: 11000,
      laptop2Geekbench5Single: 1400,
      laptop2Passmark: 7800,
      laptop2PassmarkSingle: 1100,
      laptop2CinebenchR20Multi: 4300,
      laptop2CinebenchR20Single: 950,
      laptop2Blender: 140,
      laptop1BatteryLife: '10 hours',
      laptop1BatteryPower: '70Wh',
      laptop1ScreenSize: '15.6 inches',
      laptop1Resolution: '1920x1080',
      laptop1ScreenType: 'IPS',
      laptop1RefreshRate: '144Hz',
      laptop1Ram: '16GB',
      laptop1Storage: '512GB SSD',
      laptop2BatteryLife: '8 hours',
      laptop2BatteryPower: '60Wh',
      laptop2ScreenSize: '14 inches',
      laptop2Resolution: '2560x1440',
      laptop2ScreenType: 'OLED',
      laptop2RefreshRate: '60Hz',
      laptop2Ram: '8GB',
      laptop2Storage: '256GB SSD'
    }

    const expectedOutput = {
      names: [
        {
          fullName: 'Laptop 1 Full Name',
          shortName: 'Laptop 1'
        },
        {
          fullName: 'Laptop 2 Full Name',
          shortName: 'Laptop 2'
        }
      ],
      ratings: [
        {
          overall: 9.2,
          design: 8.5,
          display: 9.0,
          performance: 9.5,
          benchmarks: 8.7,
          connectivity: 8.0,
          battery: 9.1,
          features: 8.9
        },
        {
          overall: 8.8,
          design: 8.3,
          display: 8.9,
          performance: 9.0,
          benchmarks: 8.4,
          connectivity: 7.9,
          battery: 8.7,
          features: 8.6
        }
      ],
      laptopSizes: [
        {
          width: 34.5,
          height: 24.5,
          thickness: 2.1
        },
        {
          width: 35.2,
          height: 25.0,
          thickness: 2.3
        }
      ],
      benchmarks: [
        {
          geekbench5Multi: 12000,
          geekbench5Single: 1500,
          passmark: 8000,
          passmarkSingle: 1200,
          cinebenchR20Multi: 4500,
          cinebenchR20Single: 1000,
          blender: 150
        },
        {
          geekbench5Multi: 11000,
          geekbench5Single: 1400,
          passmark: 7800,
          passmarkSingle: 1100,
          cinebenchR20Multi: 4300,
          cinebenchR20Single: 950,
          blender: 140
        }
      ],
      specs: [
        {
          batteryLife: '10 hours',
          batteryPower: '70Wh',
          screenSize: '15.6 inches',
          resolution: '1920x1080',
          displayType: 'IPS',
          refreshRate: '144Hz',
          ram: '16GB',
          storageSize: '512GB SSD'
        },
        {
          batteryLife: '8 hours',
          batteryPower: '60Wh',
          screenSize: '14 inches',
          resolution: '2560x1440',
          displayType: 'OLED',
          refreshRate: '60Hz',
          ram: '8GB',
          storageSize: '256GB SSD'
        }
      ]
    }

    expect(mapArticleData(sqlData)).toEqual(expectedOutput)
  })

  test('handles missing fields gracefully', () => {
    const sqlData = {
      laptop1FullName: 'Laptop 1 Full Name',
      laptop1ShortName: 'Laptop 1',
      // laptop2FullName and laptop2ShortName are missing
      laptop1Overall: 9.2,
      // laptop1Design is missing
      laptop1Display: 9.0,
      laptop1Performance: 9.5,
      // Ratings for laptop 2 are completely missing
      laptop1Width: 34.5,
      laptop1Height: 24.5,
      // laptop1Thickness is missing
      laptop2Width: 35.2,
      laptop2Height: 25.0,
      laptop2Thickness: 2.3,
      // Benchmarks for laptop 1 are missing
      laptop2Geekbench5Multi: 11000,
      laptop2Geekbench5Single: 1400,
      // Specs for laptop 1 are partially missing
      laptop1BatteryLife: '10 hours',
      // laptop1BatteryPower is missing
      laptop1ScreenSize: '15.6 inches'
      // laptop2Specs are completely missing
    }

    const expectedOutput = {
      names: [
        {
          fullName: 'Laptop 1 Full Name',
          shortName: 'Laptop 1'
        },
        {
          fullName: undefined, // Missing field
          shortName: undefined // Missing field
        }
      ],
      ratings: [
        {
          overall: 9.2,
          design: undefined, // Missing field
          display: 9.0,
          performance: 9.5,
          benchmarks: undefined, // Missing field
          connectivity: undefined, // Missing field
          battery: undefined, // Missing field
          features: undefined // Missing field
        },
        {
          overall: undefined, // Completely missing
          design: undefined,
          display: undefined,
          performance: undefined,
          benchmarks: undefined,
          connectivity: undefined,
          battery: undefined,
          features: undefined
        }
      ],
      laptopSizes: [
        {
          width: 34.5,
          height: 24.5,
          thickness: undefined // Missing field
        },
        {
          width: 35.2,
          height: 25.0,
          thickness: 2.3
        }
      ],
      benchmarks: [
        {
          geekbench5Multi: undefined, // Missing field
          geekbench5Single: undefined, // Missing field
          passmark: undefined, // Missing field
          passmarkSingle: undefined, // Missing field
          cinebenchR20Multi: undefined, // Missing field
          cinebenchR20Single: undefined, // Missing field
          blender: undefined // Missing field
        },
        {
          geekbench5Multi: 11000,
          geekbench5Single: 1400,
          passmark: undefined, // Missing field
          passmarkSingle: undefined, // Missing field
          cinebenchR20Multi: undefined, // Missing field
          cinebenchR20Single: undefined, // Missing field
          blender: undefined // Missing field
        }
      ],
      specs: [
        {
          batteryLife: '10 hours',
          batteryPower: undefined, // Missing field
          screenSize: '15.6 inches',
          resolution: undefined, // Missing field
          displayType: undefined, // Missing field
          refreshRate: undefined, // Missing field
          ram: undefined, // Missing field
          storageSize: undefined // Missing field
        },
        {
          batteryLife: undefined, // Missing field
          batteryPower: undefined, // Missing field
          screenSize: undefined, // Completely missing
          resolution: undefined,
          displayType: undefined,
          refreshRate: undefined,
          ram: undefined,
          storageSize: undefined
        }
      ]
    }

    expect(mapArticleData(sqlData)).toEqual(expectedOutput)
  })

  test('handles empty input gracefully', () => {
    const sqlData = {} // Empty input object

    const expectedOutput = {
      names: [
        {
          fullName: undefined,
          shortName: undefined
        },
        {
          fullName: undefined,
          shortName: undefined
        }
      ],
      ratings: [
        {
          overall: undefined,
          design: undefined,
          display: undefined,
          performance: undefined,
          benchmarks: undefined,
          connectivity: undefined,
          battery: undefined,
          features: undefined
        },
        {
          overall: undefined,
          design: undefined,
          display: undefined,
          performance: undefined,
          benchmarks: undefined,
          connectivity: undefined,
          battery: undefined,
          features: undefined
        }
      ],
      laptopSizes: [
        {
          width: undefined,
          height: undefined,
          thickness: undefined
        },
        {
          width: undefined,
          height: undefined,
          thickness: undefined
        }
      ],
      benchmarks: [
        {
          geekbench5Multi: undefined,
          geekbench5Single: undefined,
          passmark: undefined,
          passmarkSingle: undefined,
          cinebenchR20Multi: undefined,
          cinebenchR20Single: undefined,
          blender: undefined
        },
        {
          geekbench5Multi: undefined,
          geekbench5Single: undefined,
          passmark: undefined,
          passmarkSingle: undefined,
          cinebenchR20Multi: undefined,
          cinebenchR20Single: undefined,
          blender: undefined
        }
      ],
      specs: [
        {
          batteryLife: undefined,
          batteryPower: undefined,
          screenSize: undefined,
          resolution: undefined,
          displayType: undefined,
          refreshRate: undefined,
          ram: undefined,
          storageSize: undefined
        },
        {
          batteryLife: undefined,
          batteryPower: undefined,
          screenSize: undefined,
          resolution: undefined,
          displayType: undefined,
          refreshRate: undefined,
          ram: undefined,
          storageSize: undefined
        }
      ]
    }

    expect(mapArticleData(sqlData)).toEqual(expectedOutput)
  })

  test('throws TypeError for null input', () => {
    expect(() => mapArticleData(null)).toThrow(TypeError)
  })

  test('throws TypeError for undefined input', () => {
    expect(() => mapArticleData(undefined)).toThrow(TypeError)
  })

  test('ignores extra fields in sqlData and maps only the expected fields', () => {
    const sqlData = {
      laptop1FullName: 'Laptop 1 Full Name',
      laptop1ShortName: 'Laptop 1',
      laptop2FullName: 'Laptop 2 Full Name',
      laptop2ShortName: 'Laptop 2',
      laptop1Overall: 9.2,
      laptop2Overall: 8.8,
      // Extra fields
      extraField1: 'This is extra data',
      laptop1RandomField: 'Not required',
      unrelatedObject: { key: 'value' },
      laptop2IrrelevantInfo: 12345
    }

    const expectedOutput = {
      names: [
        {
          fullName: 'Laptop 1 Full Name',
          shortName: 'Laptop 1'
        },
        {
          fullName: 'Laptop 2 Full Name',
          shortName: 'Laptop 2'
        }
      ],
      ratings: [
        {
          overall: 9.2,
          design: undefined,
          display: undefined,
          performance: undefined,
          benchmarks: undefined,
          connectivity: undefined,
          battery: undefined,
          features: undefined
        },
        {
          overall: 8.8,
          design: undefined,
          display: undefined,
          performance: undefined,
          benchmarks: undefined,
          connectivity: undefined,
          battery: undefined,
          features: undefined
        }
      ],
      laptopSizes: [
        {
          width: undefined,
          height: undefined,
          thickness: undefined
        },
        {
          width: undefined,
          height: undefined,
          thickness: undefined
        }
      ],
      benchmarks: [
        {
          geekbench5Multi: undefined,
          geekbench5Single: undefined,
          passmark: undefined,
          passmarkSingle: undefined,
          cinebenchR20Multi: undefined,
          cinebenchR20Single: undefined,
          blender: undefined
        },
        {
          geekbench5Multi: undefined,
          geekbench5Single: undefined,
          passmark: undefined,
          passmarkSingle: undefined,
          cinebenchR20Multi: undefined,
          cinebenchR20Single: undefined,
          blender: undefined
        }
      ],
      specs: [
        {
          batteryLife: undefined,
          batteryPower: undefined,
          screenSize: undefined,
          resolution: undefined,
          displayType: undefined,
          refreshRate: undefined,
          ram: undefined,
          storageSize: undefined
        },
        {
          batteryLife: undefined,
          batteryPower: undefined,
          screenSize: undefined,
          resolution: undefined,
          displayType: undefined,
          refreshRate: undefined,
          ram: undefined,
          storageSize: undefined
        }
      ]
    }

    expect(mapArticleData(sqlData)).toEqual(expectedOutput)
  })

  test('maps benchmark fields correctly for both laptops', () => {
    const sqlData = {
      laptop1Geekbench5Multi: 12000,
      laptop1Geekbench5Single: 1500,
      laptop1Passmark: 8000,
      laptop1PassmarkSingle: 1200,
      laptop1CinebenchR20Multi: 4500,
      laptop1CinebenchR20Single: 1000,
      laptop1Blender: 150,
      laptop2Geekbench5Multi: 11000,
      laptop2Geekbench5Single: 1400,
      laptop2Passmark: 7800,
      laptop2PassmarkSingle: 1100,
      laptop2CinebenchR20Multi: 4300,
      laptop2CinebenchR20Single: 950,
      laptop2Blender: 140
    }

    const expectedOutput = {
      benchmarks: [
        {
          geekbench5Multi: 12000,
          geekbench5Single: 1500,
          passmark: 8000,
          passmarkSingle: 1200,
          cinebenchR20Multi: 4500,
          cinebenchR20Single: 1000,
          blender: 150
        },
        {
          geekbench5Multi: 11000,
          geekbench5Single: 1400,
          passmark: 7800,
          passmarkSingle: 1100,
          cinebenchR20Multi: 4300,
          cinebenchR20Single: 950,
          blender: 140
        }
      ]
    }

    const output = mapArticleData(sqlData)

    expect(output.benchmarks).toEqual(expectedOutput.benchmarks)
  })

  test('handles partial data for one laptop and full data for the other', () => {
    const sqlData = {
      // Full data for Laptop 1
      laptop1FullName: 'Laptop 1 Full Name',
      laptop1ShortName: 'Laptop 1',
      laptop1Overall: 9.2,
      laptop1Design: 8.5,
      laptop1Display: 9.0,
      laptop1Performance: 9.5,
      laptop1Benchmarks: 8.7,
      laptop1Connectivity: 8.0,
      laptop1Battery: 9.1,
      laptop1Features: 8.9,
      laptop1Width: 34.5,
      laptop1Height: 24.5,
      laptop1Thickness: 2.1,
      laptop1Geekbench5Multi: 12000,
      laptop1Geekbench5Single: 1500,
      laptop1Passmark: 8000,
      laptop1PassmarkSingle: 1200,
      laptop1CinebenchR20Multi: 4500,
      laptop1CinebenchR20Single: 1000,
      laptop1Blender: 150,
      laptop1BatteryLife: '10 hours',
      laptop1BatteryPower: '70Wh',
      laptop1ScreenSize: '15.6 inches',
      laptop1Resolution: '1920x1080',
      laptop1ScreenType: 'IPS',
      laptop1RefreshRate: '144Hz',
      laptop1Ram: '16GB',
      laptop1Storage: '512GB SSD',
      // Partial data for Laptop 2
      laptop2FullName: 'Laptop 2 Full Name',
      laptop2ShortName: 'Laptop 2',
      laptop2Overall: 8.8,
      laptop2Geekbench5Multi: 11000
      // Missing most other fields for Laptop 2
    }

    const expectedOutput = {
      names: [
        {
          fullName: 'Laptop 1 Full Name',
          shortName: 'Laptop 1'
        },
        {
          fullName: 'Laptop 2 Full Name',
          shortName: 'Laptop 2'
        }
      ],
      ratings: [
        {
          overall: 9.2,
          design: 8.5,
          display: 9.0,
          performance: 9.5,
          benchmarks: 8.7,
          connectivity: 8.0,
          battery: 9.1,
          features: 8.9
        },
        {
          overall: 8.8,
          design: undefined,
          display: undefined,
          performance: undefined,
          benchmarks: undefined,
          connectivity: undefined,
          battery: undefined,
          features: undefined
        }
      ],
      laptopSizes: [
        {
          width: 34.5,
          height: 24.5,
          thickness: 2.1
        },
        {
          width: undefined,
          height: undefined,
          thickness: undefined
        }
      ],
      benchmarks: [
        {
          geekbench5Multi: 12000,
          geekbench5Single: 1500,
          passmark: 8000,
          passmarkSingle: 1200,
          cinebenchR20Multi: 4500,
          cinebenchR20Single: 1000,
          blender: 150
        },
        {
          geekbench5Multi: 11000,
          geekbench5Single: undefined,
          passmark: undefined,
          passmarkSingle: undefined,
          cinebenchR20Multi: undefined,
          cinebenchR20Single: undefined,
          blender: undefined
        }
      ],
      specs: [
        {
          batteryLife: '10 hours',
          batteryPower: '70Wh',
          screenSize: '15.6 inches',
          resolution: '1920x1080',
          displayType: 'IPS',
          refreshRate: '144Hz',
          ram: '16GB',
          storageSize: '512GB SSD'
        },
        {
          batteryLife: undefined,
          batteryPower: undefined,
          screenSize: undefined,
          resolution: undefined,
          displayType: undefined,
          refreshRate: undefined,
          ram: undefined,
          storageSize: undefined
        }
      ]
    }

    const output = mapArticleData(sqlData)

    expect(output).toEqual(expectedOutput)
  })
})

describe('mapArticleContent', () => {
  test('maps sqlData correctly into the expected output structure', () => {
    const sqlData = [
      { section_id: 1, content: 'Introduction content' },
      { section_id: 2, content: 'Design content' },
      { section_id: 3, content: 'Screen content' },
      { section_id: 4, content: 'Hardware content' },
      { section_id: 5, content: 'Performance content' },
      { section_id: 6, content: 'Battery content' },
      { section_id: 7, content: 'User reviews content' },
      { section_id: 8, content: 'Price comparison content' },
      { section_id: 9, content: 'Reasons to get Laptop 1', title: 'Meta Title', description: 'Meta Description' },
      { section_id: 10, content: 'Reasons to get Laptop 2' }
    ]

    const expectedOutput = {
      intro: 'Introduction content',
      design: 'Design content',
      screen: 'Screen content',
      hardware: 'Hardware content',
      performance: 'Performance content',
      battery: 'Battery content',
      userReviews: 'User reviews content',
      priceComparison: 'Price comparison content',
      reasonsToGetLaptop1: 'Reasons to get Laptop 1',
      reasonsToGetLaptop2: 'Reasons to get Laptop 2',
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Description'
    }

    expect(mapArticleContent(sqlData)).toEqual(expectedOutput)
  })

  test('returns null for missing sections', () => {
    const sqlData = [
      { section_id: 1, content: 'Introduction content' },
      { section_id: 5, content: 'Performance content' }
    ]

    const expectedOutput = {
      intro: 'Introduction content',
      design: null,
      screen: null,
      hardware: null,
      performance: 'Performance content',
      battery: null,
      userReviews: null,
      priceComparison: null,
      reasonsToGetLaptop1: null,
      reasonsToGetLaptop2: null,
      metaTitle: null,
      metaDescription: null
    }

    expect(mapArticleContent(sqlData)).toEqual(expectedOutput)
  })

  test('handles missing content fields gracefully', () => {
    const sqlData = [
      { section_id: 1 },
      { section_id: 2, content: 'Design content' }
    ]

    const expectedOutput = {
      intro: null, // content is missing for section_id: 1
      design: 'Design content', // content is present for section_id: 2
      screen: null,
      hardware: null,
      performance: null,
      battery: null,
      userReviews: null,
      priceComparison: null,
      reasonsToGetLaptop1: null,
      reasonsToGetLaptop2: null,
      metaTitle: null,
      metaDescription: null
    }

    expect(mapArticleContent(sqlData)).toEqual(expectedOutput)
  })

  test('handles empty input gracefully', () => {
    const sqlData = [] // Empty input array

    const expectedOutput = {
      intro: null,
      design: null,
      screen: null,
      hardware: null,
      performance: null,
      battery: null,
      userReviews: null,
      priceComparison: null,
      reasonsToGetLaptop1: null,
      reasonsToGetLaptop2: null,
      metaTitle: null,
      metaDescription: null
    }

    expect(mapArticleContent(sqlData)).toEqual(expectedOutput)
  })

  test('throws TypeError for null input', () => {
    expect(() => mapArticleContent(null)).toThrow(TypeError)
  })

  test('throws TypeError for undefined input', () => {
    expect(() => mapArticleContent(undefined)).toThrow(TypeError)
  })

  test('throws TypeError for object input', () => {
    expect(() => mapArticleContent({})).toThrow(TypeError)
  })

  test('throws TypeError for string input', () => {
    expect(() => mapArticleContent('invalid')).toThrow(TypeError)
  })

  test('throws TypeError for number input', () => {
    expect(() => mapArticleContent(123)).toThrow(TypeError)
  })
})

describe('mapLinkList', () => {
  test('maps array correctly with valid input', () => {
    const sqlData = [
      { url: 'http://example.com', title: 'Example', description: 'Sample description' },
      { url: 'http://test.com', title: 'Test', category: 'Category A' }
    ]
    expect(mapLinkList(sqlData)).toEqual([
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://test.com', title: 'Test' }
    ])
  })

  test('returns empty array for empty input', () => {
    expect(mapLinkList([])).toEqual([])
  })

  test('handles missing fields gracefully', () => {
    const sqlData = [
      { url: 'http://example.com' },
      { title: 'Test' },
      {}
    ]
    expect(mapLinkList(sqlData)).toEqual([
      { url: 'http://example.com', title: undefined },
      { url: undefined, title: 'Test' },
      { url: undefined, title: undefined }
    ])
  })

  test('throws error for non-array input', () => {
    expect(() => mapLinkList(null)).toThrow(TypeError)
    expect(() => mapLinkList(undefined)).toThrow(TypeError)
    expect(() => mapLinkList({})).toThrow(TypeError)
  })

  test('ignores extra fields in input objects', () => {
    const sqlData = [
      { url: 'http://example.com', title: 'Example', extraField: 'Extra' },
      { url: 'http://test.com', title: 'Test', anotherField: 42 }
    ]
    expect(mapLinkList(sqlData)).toEqual([
      { url: 'http://example.com', title: 'Example' },
      { url: 'http://test.com', title: 'Test' }
    ])
  })

  test('preserves order of elements', () => {
    const sqlData = [
      { url: 'http://first.com', title: 'First' },
      { url: 'http://second.com', title: 'Second' }
    ]
    expect(mapLinkList(sqlData)).toEqual([
      { url: 'http://first.com', title: 'First' },
      { url: 'http://second.com', title: 'Second' }
    ])
  })

  test('handles large input arrays efficiently', () => {
    const largeSqlData = Array(1000).fill({ url: 'http://example.com', title: 'Example' })
    expect(mapLinkList(largeSqlData)).toHaveLength(1000)
    expect(mapLinkList(largeSqlData)).toEqual(
      Array(1000).fill({ url: 'http://example.com', title: 'Example' })
    )
  })
})

describe('mapSectionId', () => {
  test('returns correct ID for valid section names', () => {
    expect(mapSectionId('intro')).toBe(1)
    expect(mapSectionId('design')).toBe(2)
    expect(mapSectionId('screen')).toBe(3)
    expect(mapSectionId('hardware')).toBe(4)
    expect(mapSectionId('performance')).toBe(5)
    expect(mapSectionId('battery')).toBe(6)
    expect(mapSectionId('userReviews')).toBe(7)
    expect(mapSectionId('priceComparison')).toBe(8)
    expect(mapSectionId('reasonsToGetLaptop1')).toBe(9)
    expect(mapSectionId('reasonsToGetLaptop2')).toBe(10)
  })

  test('returns null for invalid section names', () => {
    expect(mapSectionId('nonExistentSection')).toBe(null)
    expect(mapSectionId('')).toBe(null)
    expect(mapSectionId('invalid')).toBe(null)
  })

  test('returns null for case mismatched section names', () => {
    expect(mapSectionId('Intro')).toBe(null)
    expect(mapSectionId('DESIGN')).toBe(null)
    expect(mapSectionId('Hardware')).toBe(null)
  })

  test('returns null for non-string inputs', () => {
    expect(mapSectionId(null)).toBe(null)
    expect(mapSectionId(undefined)).toBe(null)
    expect(mapSectionId(123)).toBe(null)
    expect(mapSectionId({})).toBe(null)
    expect(mapSectionId([])).toBe(null)
    expect(mapSectionId(true)).toBe(null)
  })

  test('returns null for no input', () => {
    expect(mapSectionId()).toBe(null)
  })

  test('returns null for edge cases with empty or whitespace strings', () => {
    expect(mapSectionId('')).toBe(null)
    expect(mapSectionId(' ')).toBe(null)
    expect(mapSectionId(' intro ')).toBe(null)
  })
})
