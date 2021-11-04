const v3 = require('node-hue-api');

async function getBridge() {
  v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect('-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva');
    })
    .then((api) => api.lights.getAll())
    .then((allLights) => {
      // Display the details of the lights we got back
      console.log(JSON.stringify(allLights, null, 2));
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = getBridge;
