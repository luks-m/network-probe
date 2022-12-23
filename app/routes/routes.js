// load up the machine route
const express = require('express');
const fs = require('fs');
const helper = require('./helper.js');


function errorHandler(res) {
  err => res.status(500).send(err);
}

// Router
const router = express.Router();


// Database
const dbPath = './../JSON/database.json';

// Define routes
router.get('/', (req, res) => {
  res.render('index', {functions : helper.testOnClickButton});
})
.get('/database', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    var machines = JSON.parse(data);
    var hosts = [];
    for (var i = 0; i < machines["nmaprun"]["host"].length; i++) {
      var infos = {};

      const machine = machines["nmaprun"]["host"][i];
      infos["address"] = helper.get_ip(machine);
      infos["name"] = helper.get_name(machine);

      hosts.push(infos);
    }
    res.render('machinesAllMachines', {data: machines, hosts: hosts});
  });
})
.use((req, res) => {
  res.redirect('/');
});

// this line is unchanged
module.exports = router;