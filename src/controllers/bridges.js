const v3 = require('node-hue-api');
const getBridges = require('../utils/discover');

const getAllBridges = async (req, res) => {
  getBridges()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getSearchNewLights = async (req, res) => {
  const headers = '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva';

  v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect(headers);
    })
    .then((api) => api.lights.searchForNew())
    .then((data) => res.send(data.data))
    .catch((err) => {
      console.error(err);
    });
};

const getNewLights = async (req, res) => {
  const headers = '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva';

  v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect(headers);
    })
    .then((api) => api.lights.getNew())
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getAllBridges, getSearchNewLights, getNewLights };
