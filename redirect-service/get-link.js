'use strict'

const { fetch } = require('undici')
const log = require('barelog')

/**
 * Returns a function that performs link lookup for a given
 * short link ID.
 * @param {import("./config").ApplicationConfig} config 
 */
module.exports = function createLinkGetter (config) {
  const {
    LINK_INFO_SERVICE_HOST,
    LINK_INFO_TIMEOUT
  }  = config

  /**
   * Get the information for a given link.
   * @param {string} linkId
   */
  return async function getLinkInfo (linkId) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), LINK_INFO_TIMEOUT)

    try {
      const url = new URL(`/links/${linkId}`, LINK_INFO_SERVICE_HOST)

      log('fetching info for link from ', url.toString())

      const response = await fetch(url, {
        signal: controller.signal
      })
      clearTimeout(timeout)

      if (response.status === 404) {
        return null
      } else {
        return response.json()
      }
    } catch (e) {
      clearTimeout(timeout)

      throw e
    }
  }
}