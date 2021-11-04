const v3 = require('node-hue-api');

const _getRGBFromXYState = (x, y, brightness) => {
  const Y = brightness
    , X = (Y / y) * x
    , Z = (Y / y) * (1 - x - y)
  ;

  let rgb = [
    X * 1.612 - Y * 0.203 - Z * 0.302,
    -X * 0.509 + Y * 1.412 + Z * 0.066,
    X * 0.026 - Y * 0.072 + Z * 0.962
  ];

  // Apply reverse gamma correction.
  rgb = rgb.map(function (x) {
    return (x <= 0.0031308) ? (12.92 * x) : ((1.0 + 0.055) * Math.pow(x, (1.0 / 2.4)) - 0.055);
  });

  // Bring all negative components to zero.
  rgb = rgb.map(function (x) {
    return Math.max(0, x);
  });

  // If one component is greater than 1, weight components by that value.
  const max = Math.max(rgb[0], rgb[1], rgb[2]);
  if (max > 1) {
    rgb = rgb.map(function (x) {
      return x / max;
    });
  }

  rgb = rgb.map(function (x) {
    return Math.floor(x * 255);
  });

  return rgb;
}

const getAllLights = async (req, res) => {
  v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect('-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva');
    })
    .then((api) => api.lights.getAll())
    .then((lights) => lights.map((light) => ({ ...light, rgb: _getRGBFromXYState(light.state.xy[0], light.state.xy[1], light.state.bri) })))
    .then((allLights) => res.send(allLights))
    .catch((err) => {
      console.error(err);
    });
};

const setState = async (req, res) => {
  const { id: lightId, on: state, rgb } = req.body;
  v3.discovery
    .nupnpSearch()
    .then((searchResults) => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect('-6QQKPLW2a6LLQolgJRoVCO3wwx3C3BlhjzhEHva');
    })
    .then((api) => {
      if (rgb) api.lights.setLightState(lightId, { rgb });
      else api.lights.setLightState(lightId, { on: state });
    })
    .then(() => res.send(true))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getAllLights, setState };
