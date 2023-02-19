const axios = require('axios');
const util = require('util');
const https = require('https');
const getBridges = require('../utils/discover');

const getAllZones = async (req, res) => {
  getBridges()
    .then((data) => data[0].internalipaddress)
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
      const zones = await axios.get(`https://${ipAddress}/clip/v2/resource/zone`, { httpsAgent, headers });
      res.send(zones.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const setState = async (req, res) => {
  const { id: zoneId, on: state } = req.body;
  getBridges()
    .then((data) => data[0].internalipaddress)
    .then(async (ipAddress) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const headers = { 'hue-application-key': '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva' };
      let data = {};
      data = state !== undefined ? { ...data, on: { on: state } } : { ...data };
      const zones = await axios.put(`https://${ipAddress}/clip/v2/resource/zone/${zoneId}`, data, { httpsAgent, headers });
      res.send(zones.data);
      // if (rgb) api.zones.setZoneState(zoneId, { rgb });
      // else if (bri) api.zones.setZoneState(zoneId, { bri });
      // else api.zones.setZoneState(zoneId, { on: state });
    })
    .catch((err) => {
      console.error(util.inspect(err, true, 10));
    });
};

const addNewZone = async (req, res) => {
  getBridges()
    .then((data) => data[0].internalipaddress)
    .then(async (ipAddress) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const headers = { 'hue-application-key': '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva' };
      const data = { ...req.body };
      const zones = await axios.post(`https://${ipAddress}/clip/v2/resource/zone`, data, { httpsAgent, headers });
      res.send(zones.data);
    })
    .catch((err) => {
      res.status(err.response.status).send(err.response.data);
    });
};

const deleteZone = async (req, res) => {
  getBridges()
    .then((data) => data[0].internalipaddress)
    .then(async (ipAddress) => {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const headers = { 'hue-application-key': '-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva' };
      const { zoneId } = req.params;
      const zones = await axios.delete(`https://${ipAddress}/clip/v2/resource/zone/${zoneId}`, { httpsAgent, headers });
      res.send(zones.data);
      // if (rgb) api.zones.setZoneState(zoneId, { rgb });
      // else if (bri) api.zones.setZoneState(zoneId, { bri });
      // else api.zones.setZoneState(zoneId, { on: state });
    })
    .catch((err) => {
      console.error(util.inspect(err, true, 10));
    });
};

module.exports = { getAllZones, setState, addNewZone, deleteZone };
