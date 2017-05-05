
import { NativeModules, DeviceEventEmitter } from 'react-native'

const { RNFingerprintIdentify } = NativeModules

export default {
  initFingerPrintIdentify: () => {
    return new Promise((resolve, reject) => {
      RNFingerprintIdentify.initFingerPrintIdentify().then((result) => {
        if (result.error) {
          return reject(result.error)
        }
        resolve(true)
      })
    })
  },
  isSensorAvailable() {
    return new Promise((resolve, reject) => {
      RNFingerprintIdentify.isSensorAvailable().then((result) => {
        if (result.error) {
          return reject(result.error)
        }
        resolve(true)
      })
    })
  },
  startIdentify: async (cb) => {
    if (typeof cb === "function") {
      DeviceEventEmitter.addListener('FINGERPRINT_IDENTIFY_STATUS', cb)
    }
    let err
    try {
      await RNFingerprintIdentify.startIdentify()
    } catch (ex) {
      err = ex
    } finally {
      if (err) {
        console.log(err)
      }
    }
  },
  dismiss: () => {
    DeviceEventEmitter.removeAllListeners("FINGERPRINT_IDENTIFY_STATUS")
  },
  cancelIdentify: () => {
    DeviceEventEmitter.removeAllListeners("FINGERPRINT_IDENTIFY_STATUS")
    return RNFingerprintIdentify.cancelIdentify()
  }
}
