'use strict'

/**
 * Creates an express application with the given config
 * @param {import('./config').ApplicationConfig} config 
 */
module.exports = function creatApp (config) {
  const express = require('express')
  const log = require('barelog')
  const app = express()
  const {
    MORGAN_FORMAT
  } = config

  const getLinkInfo = require('./get-link')(config)

  app.set('view engine', 'pug')
  app.set('views', './views')

  // Logging middleware that prints basic information for HTTP requests
  app.use(require('morgan')(MORGAN_FORMAT))
  
  // Set sensible default for security-related response headers 
  app.use(require('helmet')({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'unsafe-inline'"]
      }
    }
  }))

  // Expose a health endpoint for Railway Healthchecks
  app.get('/health', (req, res) => {
    res.end('OK')
  })

  app.get('/:linkId', async (req, res, next) => {
    const { linkId } = req.params

    try {
      const linkInfo = await getLinkInfo(linkId)
      log('link info', linkInfo)

      if (linkInfo && linkInfo.active) {
        res.render('link.found.pug', {
          url: linkInfo.url,
          redirectDelay: 3000
        })
      } else {
        res.status(404).render('link.not-found.pug')
      }
    } catch (e) {
      next(e)
    }
  })

  app.use((err, req, res, next) => {
    log('error processing request:', err)
    res.status(500).end('internal server error')
  })

  return app
}