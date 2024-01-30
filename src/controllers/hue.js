const { getDiscoveredServices } = require('../utils/discover');
const hue = require('../services/hue');

const getBridges = async (req, res) => {
  return res.send(await getDiscoveredServices('hue'));
};

const getLights = async (req, res) => {
  return res.send(await hue.getLights());
};

const getRooms = async (req, res) => {
  return res.send(await hue.getRooms());
};

module.exports = { getBridges, getLights, getRooms };
