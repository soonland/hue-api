const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const db = require('./db/connection');

const app = express();
app.locals.db = db;
// app.use();

// const corsOptions = {
//   origin: 'http://35.203.75.135',
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to bezkoder application.' });
// });

// app.get('/version', (req, res) => {
//   res.send();
// });

app.use('/', routes);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
// app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
