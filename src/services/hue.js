const fs = require('fs');
const https = require('https');
const axios = require('axios');

const URL_CONSTANTS = {
  lights: 'https://192.168.1.64/clip/v2/resource/light',
  rooms: 'https://192.168.1.64/clip/v2/resource/rooms'
};

const axiosGet = async (parUrl) => {
  const ca = fs.readFileSync('./certs/hue.pem');
  console.log(ca.toString());
  const httpsAgent = new https.Agent({ cert: ca });
  const headers = { 'hue-application-key': process.env.HUE_KEY };
  return axios.get(parUrl, { headers, httpsAgent });
};

const getLights = async () => {
  const aUrl = URL_CONSTANTS.lights;
  return axiosGet(aUrl).then();
};

const getRooms = async () => {
  const aUrl = URL_CONSTANTS.rooms;
  return axiosGet(aUrl).then();
};

module.exports = { getLights, getRooms };
