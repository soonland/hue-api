const axios = require('axios');

const getBridges = async () =>
  axios.get('https://discovery.meethue.com').catch((err) => {
    console.error(err);
  });

module.exports = getBridges;
