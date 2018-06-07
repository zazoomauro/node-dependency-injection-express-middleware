/**
 * Extension configuration file name exception
 */
export default class ExtensionConfigurationFileNameException extends Error {
  /**
   * @param {string} format
   */
  constructor (format) {
    super(`${format} config  file not supported`)
  }
}
