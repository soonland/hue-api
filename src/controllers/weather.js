const axios = require('axios');
const https = require('https');
const xyConvert = require('cie-rgb-color-converter');
const { getConfiguration } = require('../utils/discover');
const { postUrl, putUrl, getUrl, deleteUrl } = require('../utils/http');

const updateWeather = async (req, res) => {
  getConfiguration()
    .then((data) => data[0].internalipaddress)
    .then(async (ipAddress) => {
      const coord = req.query.coordinates.split(';');
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });

      const weatherAPI = `https://api.open-meteo.com/v1/gem?latitude=${coord[0]}&longitude=${coord[1]}&current_weather=true&timezone=America%2FNew_York`;
      // const weatherAPI = `https://api.open-meteo.com/v1/gem?latitude=48.45&longitude=-68.52&current_weather=true&timezone=America%2FNew_York`;
      // const weatherAPI = `https://api.open-meteo.com/v1/gem?latitude=22.00&longitude=-79.50&current_weather=true&timezone=America%2FNew_York`;
      const weather = await getUrl(weatherAPI);
      const r = ((weather.data.current_weather.temperature + 25) * 10) / 2;
      const b = 255 - r;

      const lightId = '4bf1349e-85cf-43a7-a539-a3c6ba0bde54';
      const rgb = [r, 0, b];
      console.log(rgb);
      const headers = { 'hue-application-key': process.env.HUE_KEY };
      const xy = rgb ? xyConvert.rgbToXy(rgb[0], rgb[1], rgb[2], 'LCA003') : undefined;

      let data = {};
      data = { ...data, on: { on: true } };
      data = { ...data, color: { xy: { x: xy.x, y: xy.y } } };
      data = { ...data, dimming: { brightness: 100 } };
      await putUrl(`https://${ipAddress}/clip/v2/resource/grouped_light/${lightId}`, data, { httpsAgent, headers });
      res.send(weather.data.current_weather);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { updateWeather };
