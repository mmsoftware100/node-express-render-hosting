const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  // /opt/render/project/src/node_modules/puppeteer
  // cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  cacheDirectory: '/opt/render/project/src/node_modules/puppeteer',
};