const discover = require('../utils/discover');

const start = async (req, res) => {
  discover
    .startDiscovery(req.params)
    .then(async (services) => {
      res.send(services);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getDiscoveredServices = async (req, res) => {
  discover
    .getDiscoveredServices(req.query.type)
    .then(async (services) => {
      res.send(services);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { start, getDiscoveredServices };
