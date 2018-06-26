/* global describe, beforeEach, it */

import express from 'express'
import Index from '../../lib/'
import path from 'path'
import chai from 'chai'
import FooPass from '../lib/FooPass'
import {ContainerBuilder} from 'node-dependency-injection'

let assert = chai.assert

describe('DependencyInjectionMiddleware', () => {
  let app
  let options

  beforeEach(() => {
    app = express()
    options = {
      serviceFilePath: path.join(__dirname, '..', 'resources', 'services.yml')
    }
  })

  describe('middleware', () => {
    it('should throw an exception if service extension file is not supported',
      () => {
        // Arrange.
        options.serviceFilePath = 'foo.bar'

        // Act.
        const actual = () => app.use(
          new Index(options).middleware())

        // Assert.
        return assert.throw(actual, 'bar is not supported')
      })

    it('should load a valid yaml file', () => {
      // Arrange.
      options.serviceFilePath = path.join(__dirname, '..', 'resources',
        'services.yml')

      // Act.
      const actual = () => app.use(
        new Index(options).middleware())

      // Assert.
      return assert.doesNotThrow(actual)
    })

    it('should load a valid js file', () => {
      // Arrange.
      options.serviceFilePath = path.join(__dirname, '..', 'resources',
        'services.js')

      // Act.
      const actual = () => app.use(
        new Index(options).middleware())

      // Assert.
      return assert.doesNotThrow(actual)
    })

    it('should load a valid json file', () => {
      // Arrange.
      options.serviceFilePath = path.join(__dirname, '..', 'resources',
        'services.json')

      // Act.
      const actual = () => app.use(
        new Index(options).middleware())

      // Assert.
      return assert.doesNotThrow(actual)
    })

    it('should compile container if flag is true', () => {
      // Arrange.
      options.compile = true

      // Act.
      const actual = () => app.use(
        new Index(options).middleware())

      // Assert.
      return assert.doesNotThrow(actual)
    })

    it('should add compiler pass to container', () => {
      // Arrange.
      options.compilerPass = [new FooPass()]
      options.compile = true

      // Act.
      const actual = () => app.use(
        new Index(options).middleware())

      // Assert.
      return assert.doesNotThrow(actual)
    })

    it('should add logger to container', () => {
      // Arrange.
      options.logger = {
        warn: () => {
        }
      }

      // Act.
      const actual = () => app.use(
        new Index(options).middleware())

      // Assert.
      return assert.doesNotThrow(actual)
    })
  })

  describe('container', () => {
    it('should get a container builder instance', () => {
      // Arrange not needed.

      // Act.
      const actual = new Index(options).container

      // Assert.
      return assert.instanceOf(actual, ContainerBuilder)
    })
  })
})
