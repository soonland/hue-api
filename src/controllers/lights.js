const axios = require('axios');
const util = require('util');
const https = require('https');
const xyConvert = require('cie-rgb-color-converter');
const getBridges = require('../utils/discover');

const getAllLights = async (req, res) => {
  getBridges()
    .then(({ data }) => data[0].internalipaddress)
    .then(async (ipAddress) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      //       const httpsAgent = new https.Agent({
      //         cert: `-----BEGIN CERTIFICATE-----
      // MIICMjCCAdigAwIBAgIUO7FSLbaxikuXAljzVaurLXWmFw4wCgYIKoZIzj0EAwIw
      // OTELMAkGA1UEBhMCTkwxFDASBgNVBAoMC1BoaWxpcHMgSHVlMRQwEgYDVQQDDAty
      // b290LWJyaWRnZTAiGA8yMDE3MDEwMTAwMDAwMFoYDzIwMzgwMTE5MDMxNDA3WjA5
      // MQswCQYDVQQGEwJOTDEUMBIGA1UECgwLUGhpbGlwcyBIdWUxFDASBgNVBAMMC3Jv
      // b3QtYnJpZGdlMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjNw2tx2AplOf9x86
      // aTdvEcL1FU65QDxziKvBpW9XXSIcibAeQiKxegpq8Exbr9v6LBnYbna2VcaK0G22
      // jOKkTqOBuTCBtjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjAdBgNV
      // HQ4EFgQUZ2ONTFrDT6o8ItRnKfqWKnHFGmQwdAYDVR0jBG0wa4AUZ2ONTFrDT6o8
      // ItRnKfqWKnHFGmShPaQ7MDkxCzAJBgNVBAYTAk5MMRQwEgYDVQQKDAtQaGlsaXBz
      // IEh1ZTEUMBIGA1UEAwwLcm9vdC1icmlkZ2WCFDuxUi22sYpLlwJY81Wrqy11phcO
      // MAoGCCqGSM49BAMCA0gAMEUCIEBYYEOsa07TH7E5MJnGw557lVkORgit2Rm1h3B2
      // sFgDAiEA1Fj/C3AN5psFMjo0//mrQebo0eKd3aWRx+pQY08mk48=
      // -----END CERTIFICATE-----`,
      //       });
      const headers = { 'hue-application-key': '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva' };
      await axios
        .get(`https://${ipAddress}/clip/v2/resource/light`, { httpsAgent, headers })
        .then(async (result) => {
          const newData = result.data.data.map((el) => {
            const {
              color: {
                xy: { x, y },
              },
              dimming: { brightness },
            } = el;
            return { ...el, rgb: xyConvert.xyBriToRgb(x, y, brightness) };
          });
          return { data: { data: newData } };
        })
        .then((lights) => res.send(lights.data));
    })
    .catch((err) => {
      console.error(err);
    });
};

const setState = async (req, res) => {
  const { id: lightId, on: state, rgb, bri } = req.body;

  getBridges()
    .then(({ data }) => data[0].internalipaddress)
    .then(async (ipAddress) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const headers = { 'hue-application-key': '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva' };
      const xy = rgb ? xyConvert.rgbToXy(rgb[0], rgb[1], rgb[2], 'LCA003') : undefined;

      let data = {};
      data = state !== undefined ? { ...data, on: { on: state } } : { ...data };
      data = rgb ? { ...data, color: { xy: { x: xy.x, y: xy.y } } } : { ...data };
      data = bri ? { ...data, dimming: { brightness: bri } } : { ...data };
      const lights = await axios.put(`https://${ipAddress}/clip/v2/resource/light/${lightId}`, data, { httpsAgent, headers });
      res.send(lights.data);
      // if (rgb) api.lights.setLightState(lightId, { rgb });
      // else if (bri) api.lights.setLightState(lightId, { bri });
      // else api.lights.setLightState(lightId, { on: state });
    })
    .catch((err) => {
      console.error(util.inspect(err, true, 10));
    });
};

module.exports = { getAllLights, setState };
