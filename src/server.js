const express = require('express');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getConfiguration } = require('./utils/discover');
const routes = require('./routes');
const httpLogger = require('./utils/httpLogger');
const logger = require('./utils/logger')(__filename);

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(httpLogger(logger));

app.use('/', routes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  getConfiguration();
  logger.info(`Server is running on port ${PORT}.`);
});
