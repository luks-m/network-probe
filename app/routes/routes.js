// load up the machine route
const express = require('express');
const fs = require('fs');


function errorHandler(res) {
  err => res.status(500).send(err);
}

// Router
const router = express.Router();

// Database
const dbPath = './../JSON/database.json';

// Define routes
router.get('/', (req, res) => {
  res.render('index');
})
.get('/database', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    var machines = JSON.parse(data);
    
    res.render('machinesAllMachines', {machines: machines});
  });
})
.use((req, res) => {
  res.redirect('/');
});

// this line is unchanged
module.exports = router;