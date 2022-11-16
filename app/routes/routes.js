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
    var hosts = [];
    for (var i = 0; i < machines["nmaprun"]["host"].length; i++) {
      var infos = {};
      const machine = machines["nmaprun"]["host"][i];
      if (machine["address"] != undefined && machine["address"][0] != undefined && machine["address"][0]["@addrtype"] == "ipv4") {
        infos["address"] = machine["address"][0]["@addr"];
      }
      else {
        infos["address"] = "No IP found";
      }
      if (machine["hostnames"] != undefined && machine["hostnames"]["hostname"] != undefined) {
        infos["name"] = machine["hostnames"]["hostname"]["@name"];
      }
      else {
        infos["name"] = "No name found";
      }
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