Node Dependency Injection Express Middleware
============================================

![NDI Logo](http://image.ibb.co/iGnCUn/logojoy.png)

A Node Dependency Injection middleware for Express

[![Npm Version](https://badge.fury.io/js/node-dependency-injection-express-middleware.svg)](https://badge.fury.io/js/node-dependency-injection-express-middleware)
[![Build Status](https://travis-ci.org/zazoomauro/node-dependency-injection-express-middleware.svg?branch=master)](https://travis-ci.org/zazoomauro/node-dependency-injection-express-middleware)
[![Dependencies](https://david-dm.org/zazoomauro/node-dependency-injection-express-middleware.svg)](https://david-dm.org/zazoomauro/node-dependency-injection-express-middleware)
[![DevDependencies](https://david-dm.org/zazoomauro/node-dependency-injection-express-middleware/dev-status.svg)](https://david-dm.org/zazoomauro/node-dependency-injection-express-middleware#info=devDependencies)
[![Code Coverage](https://codecov.io/gh/zazoomauro/node-dependency-injection-express-middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/zazoomauro/node-dependency-injection-express-middleware)
[![Maintainability](https://api.codeclimate.com/v1/badges/54d93c7090e693ab753c/maintainability)](https://codeclimate.com/github/zazoomauro/node-dependency-injection-express-middleware/maintainability)
[![Coding Standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Known Vulnerabilities](https://snyk.io/test/github/zazoomauro/node-dependency-injection-express-middleware/badge.svg)](https://snyk.io/test/github/zazoomauro/node-dependency-injection-express-middleware)
[![Npm Downloads](https://img.shields.io/npm/dm/node-dependency-injection-express-middleware.svg?maxAge=2592000)](https://www.npmjs.com/package/node-dependency-injection-express-middleware)
[![License](https://img.shields.io/npm/l/node-dependency-injection-express-middleware.svg?maxAge=2592000?style=plastic)](https://github.com/zazoomauro/node-dependency-injection-express-middleware/blob/master/LICENCE)
 
Installation
------------

```sh
npm install --save node-dependency-injection-express-middleware
```

Usage
-----------

#### Minimal configuration
```js
import NodeInjectionMiddleware from 'node-dependency-injection-express-middleware'
import express from 'express'

const app = express()

const options = {serviceFilePath: 'some/path/to/config.yml'}
app.use(new NodeInjectionMiddleware(options).middleware())
```

### Options

| Name                        | Required | Type Value      | Default Value  |
| --------------------------- | -------- | --------------- | -------------- |
| serviceFilePath             | true     | string          |                |
| compile                     | false    | boolean         | false          |
| compilerPass                | false    | array           | []             |
| logger                      | false    | class or object | null           |
| containerReferenceAsService | false    | boolean         | false          |
| defaultDir                  | false    | string          | null           |

### How to use all options

```js
import MyCustomPass from 'CompilerPass/MyCustomPass'
import AnotherAwesomePass from 'CompilerPass/AnotherAwesomePass'
import MyCustomLogger from 'MyCustomLogger'
import NDIMiddleware from 'node-dependency-injection-express-middleware'
import express from 'express'

const app = express()

const options = {
  serviceFilePath: 'some/path/to/config.yml', 
  compile: true,
  compilerPass: [new MyCustomPass(), new AnotherAwesomePass()],
  logger: new MyCustomLogger(),
  containerReferenceAsService: true,
  defaultDir: '/some/cool/dir',
}
app.use(new NDIMiddleware(options).middleware())
```

### How to get the container

```js
app.get('/some/action', (req, res, next) => {
  const container = req.container
  const myAwesomeService = container.get('some.awesome.service')
  ...
})
```

> Please, read the [FULL DOCUMENTATION](https://github.com/zazoomauro/node-dependency-injection/wiki)

Resources
---------

- [Documentation](https://github.com/zazoomauro/node-dependency-injection/wiki)
- [Collaboration and pull requests](CONTRIBUTING.md)
- [Twitter @zazoomauro](https://twitter.com/zazoomauro)
- [Changelog](CHANGELOG.md)
