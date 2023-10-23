const { Bonjour } = require('bonjour-service');
const logger = require('./logger')(__filename);
// const axios = require('axios');

let bridges = null;
let browser;

const startDiscovery = async () => {
  logger.info('Discovering network...');
  if (browser) {
    browser.update();
    return;
  }
  // hue OR airplay OR googlecast OR hap
  const bonjour = new Bonjour();
  browser = bonjour.find();

  browser.on('up', (service) => {
    logger.debug(`Found one service at ${service.type}/${service.name}/${service.addresses[0]}`);
  });

  browser.on('down', (service) => {
    logger.debug(`Bye bye to one service at ${service.type}/${service.name}/${service.addresses[0]}`);
  });
};

const getServices = async (req) => {
  let aServicesList = browser.services;
  if (req.query.type) aServicesList = browser.services.filter((el) => el.type === req.query.type);
  return new Promise((resolve) => {
    resolve(aServicesList.map((el) => ({ type: el.type, name: el.name, address: el.addresses[0] })));
  });
};

const getBridges = async () =>
  new Promise((resolve) => {
    resolve(browser.services);
  });

function getConfiguration() {
  if (!bridges) {
    bridges = getBridges();
  }
  return bridges;
}

module.exports = { startDiscovery, getBridges, getServices, getConfiguration };
