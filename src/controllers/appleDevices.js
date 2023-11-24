const { getAppleDevices } = require('../utils/discover');

const getAllAppleDevices = async (req, res) => {
  getAppleDevices()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getAllAppleDevices };
