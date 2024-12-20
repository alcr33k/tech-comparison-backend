function mapArticleData (sqlData) {
  return {
    names: [
      {
        fullName: sqlData.laptop1FullName,
        shortName: sqlData.laptop1ShortName,
      },
      {
        fullName: sqlData.laptop2FullName,
        shortName: sqlData.laptop2ShortName,
      }
    ],
    ratings: [
      {
        overall: sqlData.laptop1Overall,
        design: sqlData.laptop1Design,
        display: sqlData.laptop1Display,
        performance: sqlData.laptop1Performance,
        benchmarks: sqlData.laptop1Benchmarks,
        connectivity: sqlData.laptop1Connectivity,
        battery: sqlData.laptop1Battery,
        features: sqlData.laptop1Features
      },
      {
        overall: sqlData.laptop2Overall,
        design: sqlData.laptop2Design,
        display: sqlData.laptop2Display,
        performance: sqlData.laptop2Performance,
        benchmarks: sqlData.laptop2Benchmarks,
        connectivity: sqlData.laptop2Connectivity,
        battery: sqlData.laptop2Battery,
        features: sqlData.laptop2Features
      }
    ],
    laptopSizes: [
      {
        width: sqlData.laptop1Width,
        height: sqlData.laptop1Height,
        thickness: sqlData.laptop1Thickness
      },
      {
        width: sqlData.laptop2Width,
        height: sqlData.laptop2Height,
        thickness: sqlData.laptop2Thickness
      }
    ],
    benchmarks: [
      {
        geekbench5Multi: sqlData.laptop1Geekbench5Multi,
        geekbench5Single: sqlData.laptop1Geekbench5Single,
        passmark: sqlData.laptop1Passmark,
        passmarkSingle: sqlData.laptop1PassmarkSingle,
        cinebenchR20Multi: sqlData.laptop1CinebenchR20Multi,
        cinebenchR20Single: sqlData.laptop1CinebenchR20Single,
        blender: sqlData.laptop1Blender
      },
      {
        geekbench5Multi: sqlData.laptop2Geekbench5Multi,
        geekbench5Single: sqlData.laptop2Geekbench5Single,
        passmark: sqlData.laptop2Passmark,
        passmarkSingle: sqlData.laptop2PassmarkSingle,
        cinebenchR20Multi: sqlData.laptop2CinebenchR20Multi,
        cinebenchR20Single: sqlData.laptop2CinebenchR20Single,
        blender: sqlData.laptop2Blender
      }
    ],
    specs: [
      {
        batteryLife: sqlData.laptop1BatteryLife,
        batteryPower: sqlData.laptop1BatteryPower,
        screenSize: sqlData.laptop1ScreenSize,
        resolution: sqlData.laptop1Resolution,
        displayType: sqlData.laptop1ScreenType,
        refreshRate: sqlData.laptop1RefreshRate,
        ram: sqlData.laptop1Ram,
        storageSize: sqlData.laptop1Storage
      },
      {
        batteryLife: sqlData.laptop2BatteryLife,
        batteryPower: sqlData.laptop2BatteryPower,
        screenSize: sqlData.lapto21ScreenSize,
        resolution: sqlData.laptop2Resolution,
        displayType: sqlData.laptop2ScreenType,
        refreshRate: sqlData.laptop2RefreshRate,
        ram: sqlData.laptop2Ram,
        storageSize: sqlData.laptop2Storage
      }
    ]
  }
}

function mapArticleContent (sqlData) {
  const sectionContent = sqlData.reduce((acc, data) => {
    acc[data.section_id] = data
    return acc
  }, {})

  return {
    intro: sectionContent[1]?.content ?? null,
    design: sectionContent[2]?.content ?? null,
    screen: sectionContent[3]?.content ?? null,
    hardware: sectionContent[4]?.content ?? null,
    performance: sectionContent[5]?.content ?? null,
    battery: sectionContent[6]?.content ?? null,
    userReviews: sectionContent[7]?.content ?? null,
    priceComparison: sectionContent[8]?.content ?? null,
    reasonsToGetLaptop1: sectionContent[9]?.content ?? null,
    reasonsToGetLaptop2: sectionContent[10]?.content ?? null,
    metaTitle: sectionContent[9]?.title ?? null,
    metaDescription: sectionContent[9]?.description ?? null
  }
}

function mapLinkList (sqlData) {
  return sqlData.map((res) => ({
    url: res.url,
    title: res.title
  }))
}

const mapSectionId = (sectionName) => {
  const sectionMapping = {
    intro: 1,
    design: 2,
    screen: 3,
    hardware: 4,
    performance: 5,
    battery: 6,
    userReviews: 7,
    priceComparison: 8,
    reasonsToGetLaptop1: 9,
    reasonsToGetLaptop2: 10
  }

  return sectionMapping[sectionName] || null
};

module.exports = { mapArticleData, mapArticleContent, mapLinkList, mapSectionId }
