import {
  ContainerBuilder,
  YamlFileLoader,
  JsFileLoader,
  JsonFileLoader
} from 'node-dependency-injection'
import path from 'path'
import ExtensionConfigurationFileNameException from
  './exception/ExtensionConfigurationFileNameException'

/**
 * Dependency Injection middleware
 */
export default class Index {
  /**
   * @param {string} serviceFilePath
   * @param {boolean} compile
   * @param {[]} compilerPass
   * @param {*} logger
   * @param {boolean} containerReferenceAsService
   * @param {String} defaultDir
   * @return {Index.middleware}
   */
  constructor ({
    serviceFilePath, compile = false, compilerPass = [],
    logger = null, containerReferenceAsService = false, defaultDir = null
  }) {
    this._container = new ContainerBuilder(containerReferenceAsService,
      defaultDir)
    this.serviceFilePath = serviceFilePath
    for (let pass of compilerPass) {
      this._container.addCompilerPass(pass)
    }
    if (logger) {
      this._container.logger = logger
    }
    if (compile) {
      this._container.compile()
    }
  }

  /**
   * @param {string} serviceFilePath
   */
  set serviceFilePath (serviceFilePath) {
    const extName = path.extname(serviceFilePath).replace('.', '')
    const loader = this._getLoader(extName)
    loader.load(serviceFilePath)
  }

  /**
   * @param extName
   * @return {YamlFileLoader|JsFileLoader|JsonFileLoader|FileLoader}
   * @private
   */
  _getLoader (extName) {
    switch (extName) {
      case 'yaml':
      case 'yml':
        return new YamlFileLoader(this._container)
      case 'js':
        return new JsFileLoader(this._container)
      case 'json':
        return new JsonFileLoader(this._container)
    }

    throw new ExtensionConfigurationFileNameException(
      `${extName} is not supported`)
  }

  /**
   * @return {ContainerBuilder}
   */
  get container () {
    return this._container
  }

  /**
   * @return {function}
   */
  middleware () {
    return (req, res, next) => {
      req.container = this._container
      next()
    }
  }
}
