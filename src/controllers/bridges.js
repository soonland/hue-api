const getBridges = require('../utils/discover');

const getAllBridges = async (req, res) => {
  getBridges()
    .then(({ data }) => res.send(data))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getAllBridges };
