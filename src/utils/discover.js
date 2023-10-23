const bonjour = require('bonjour')();
const logger = require('./logger')(__filename);
// const axios = require('axios');

let bridges = null;

// const getBridges = async () => ({ data: [{ internalipaddress: '192.168.1.65' }] });
const getBridges = async () => {
  logger.info('Discovering network...');
  const browser = bonjour.find({ type: 'hue', protocol: 'tcp' }, (service) => {
    logger.debug(`Found one service at ${service.addresses[0]}`);
  });

  return new Promise((resolve) => {
    browser.start();

    setTimeout(() => {
      const allServices = browser.services;

      const results = [];
      if (allServices) {
        resolve(
          allServices.map((service) => ({
            internalipaddress: service.addresses[0],
            id: service.fqdn,
          }))
        );
      }

      browser.stop();
      resolve(results);
    }, 5000);
  });
};

const initBridges = (app) => ({ ...app, locals: { ...app.locals, bridges: getBridges() } });

function getConfiguration() {
  if (!bridges) {
    bridges = getBridges();
  }
  return bridges;
}

module.exports = { getBridges, initBridges, getConfiguration };
