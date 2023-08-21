const { from } = require('env-var')

/**
 * An ApplicationConfig constructed from environment variables with
 * corresponding names.
 * @typedef {Object} ApplicationConfig
 * @property {string} HOST
 * @property {number} PORT
 * @property {string} NODE_ENV
 * @property {string} BASIC_AUTH_USER
 * @property {string} BASIC_AUTH_PASS
 * @property {string} RAILWAY_VOLUME_MOUNT_PATH
 * @property {string} MORGAN_FORMAT
 */


/**
 * Returns an Object containing application configuration.
 * 
 * This function will throw an error if required variables are missing,
 * or if variables are not do not match the desired types.
 * 
 * @param {NodeJS.ProcessEnv} env 
 * @returns {ApplicationConfig}
 */
module.exports = function getConfig (env) {
  const { get } = from(env)

  return {
    HOST: get('HOST').default('0.0.0.0').asString(),
    PORT: get('PORT').default('8080').asPortNumber(),
    
    NODE_ENV: get('NODE_ENV').default('production').asEnum(['development', 'production']),
    MORGAN_FORMAT: get('MORGAN_FORMAT').default('tiny').asString(),

    LINK_INFO_SERVICE_HOST: get('LINK_INFO_SERVICE_HOST').default('http://shortener-api').asString(),
    LINK_INFO_TIMEOUT: get('LINK_INFO_TIMEOUT').default('2000').asIntPositive()
  }
}