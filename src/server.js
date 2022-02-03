const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const getBridges = require('./utils/discover');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
// app.use('/api/products', productsRouter);

getBridges();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
