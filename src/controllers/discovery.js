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

const getServices = async (req, res) => {
  discover
    .getServices(req)
    .then(async (services) => {
      res.send(services);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { start, getServices };
