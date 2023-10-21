const bonjour = require('bonjour')();
const logger = require('./logger')(__filename);
// const axios = require('axios');

let bridges = null;
let browser;

const startDiscovery = async () => {
  logger.info('Discovering network...');
  // hue OR airplay OR googlecast OR hap
  browser = bonjour.find({ type: 'airplay', protocol: 'tcp' }, (service) => {
    logger.debug(`Found one service at ${service.type}/${service.name}/${service.addresses[0]}`);
  });

  browser.start();
};

const getBridges = async () =>
  new Promise((resolve) => {
    resolve(browser.services);
  });

const initBridges = (app) => ({ ...app, locals: { ...app.locals, bridges: getBridges() } });

function getConfiguration() {
  if (!bridges) {
    bridges = getBridges();
  }
  return bridges;
}

module.exports = { startDiscovery, getBridges, initBridges, getConfiguration };
