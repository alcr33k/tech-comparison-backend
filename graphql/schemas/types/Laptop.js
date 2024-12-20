const { gql } = require('apollo-server')

module.exports = gql`
  type Laptop {
    id: ID!
  }

  type Rating {
    overall: Int
    design: Int
    display: Int
    performance: Int
    benchmarks: Int
    connectivity: Int
    battery: Int
    features: Int
  }

  type LaptopSize {
    height: Float
    width: Float
    thickness: Float
  }

  type LaptopNames {
    fullName: String
    shortName: String
  }

  type Benchmark {
    geekbench5Multi: Int
    geekbench5Single: Int
    passmark: Int
    passmarkSingle: Int
    cinebenchR20Multi: Int
    cinebenchR20Single: Int
    blender: Float
  }

  type LaptopSpecs {
    type: String
    weight: String
    usesAFanlessDesign: Boolean
    hasABacklitKeyboard: Boolean
    warrantyPeriod: Int
    volume: Float
    width: Float
    height: Float
    thickness: Float
    maximumOperatingTemperature: String
    lowestPotentialOperatingTemperature: String
    weatherSealed: Boolean
    isDustproofAndWaterResistant: Boolean
    frenchRepairabilityIndex: String
    screenSize: Float
    resolution: Int
    pixelDensity: Int
    displayType: String
    hasATouchScreen: Boolean
    brightness: Int
    refreshRate: Int
    contrastRatio: String
    hasAntiReflectionCoating: Boolean
    supportedDisplays: Int
    blackLevel: String
    gorillaGlassVersion: String
    ram: String
    ramSpeed: Int
    usesFlashStorage: Boolean
    internalStorage: Int
    cpuSpeed: String
    cpuThreads: Int
    vram: String
    isAnNvmeSsd: Boolean
    gpuClockSpeed: Int
    usesMultithreading: Boolean
    maximumMemoryAmount: Int
    ddrMemoryVersion: Int
    turboClockSpeed: String
    gpuTurbo: String
    memorySlots: Int
    pciExpress: Int
    hddStorageCapacity: String
    memoryBandwidth: String
    semiconductorSize: Int
    ssdStorageCapacity: String
    supports64Bit: Boolean
    usb32Gen2Ports: String
    usb420GbpsPorts: String
    usb440GbpsPorts: String
    thunderbolt3Ports: String
    thunderbolt4Ports: String
    usb32Gen1Ports: String
    hasAnHdmiOutput: Boolean
    hasUsbTypeC: Boolean
    supportsWiFi: Boolean
    wiFiVersion: String
    hasAnExternalMemorySlot: Boolean
    bluetoothVersion: Float
    usb30Ports: Int
    usbPorts: Int
    thunderboltPorts: Int
    rj45Ports: Int
    hdmiPorts: Int
    hdmiVersion: String
    displayportOutputs: Int
    downloadSpeed: String
    usb20Ports: Int
    uploadSpeed: String
    hasAirplay: Boolean
    miniDisplayportOutputs: Int
    hasAVgaConnector: String
    batteryLife: String
    chargeTime: String
    batteryPower: Int
    hasSleepAndChargeUsbPorts: Boolean
    hasAMagsafePowerAdapter: Boolean
    hasStereoSpeakers: Boolean
    hasASocketForA35MmAudioJack: Boolean
    megapixels: String
    hasDolbyAtmos: Boolean
    stylusIncluded: Boolean
    hasAFingerprintScanner: Boolean
    numberOfMicrophones: Int
    uses3DFacialRecognition: Boolean
    videoRecording: String
    hasVoiceCommands: Boolean
    hasAFrontCamera: Boolean
    hasSpdifOutPort: Boolean
    hasAGyroscope: Boolean
    hasGps: Boolean
    hasAnAccelerometer: Boolean
    hasACompass: Boolean
    hasAnOpticalDiscDrive: Boolean
    clockMultiplier: Int
    l2Core: Int
    l2Cache: Int
    l1Cache: Int
    supportsEccMemory: Boolean
    hasNxBit: Boolean
    memoryChannels: Int
    hasIntegratedGraphics: Boolean
    gpuExecutionUnits: Int
    thermalDesignPower: Int
    cpuTemperature: Int
    performancePerWatt: String
    instructionSets: String
    maximumMemoryBandwidth: String
    openclVersion: String
    openglVersion: String
    directxVersion: String
    numberOfTransistors: Int
    hasAnUnlockedMultiplier: Boolean
    usesBigLittleTechnology: Boolean
    l3Core: String
    l3Cache: String
    turboBoostVersion: String
    busTransferRate: String
    renderOutputUnits: String
    textureMappingUnits: String
    shadingUnits: String
  }

  type LaptopSpecsSlim {
    batteryLife: String
    batteryPower: Int
    screenSize: Float
    resolution: Int
    displayType: String
    refreshRate: Int
    ram: String
    storageSize: Int
  }
`
