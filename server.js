const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/app.routes');
const cors = require('cors');

const PORT = 3535;

const app = express();

// Add Cors - Access-Control-Allow-Origin: *
app.use(cors());

// Use Json and extended urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes file
app.use(routes);

// Logger
app.use(morgan('tiny'));

// Start server
app.listen(PORT, function () {
    console.info('[INFO] Server up in port', PORT);
});