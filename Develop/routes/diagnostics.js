const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  console.info(`${req.method} request received for feedback`);
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log(req.body);
  req.body.error_id = uuidv4();
  req.body.time = Date.now();
  readAndAppend(req.body, './db/diagnostics.json');
  res.send('Successfully added diagnostics information');
  
});

module.exports = diagnostics;
