// load up the machine route
const express = require('express');
const fs = require('fs');
const helper = require('./helper.js');
const { spawn } = require('child_process');


// Router
const router = express.Router();


// Database
const dbPath = './../JSON/database.json';
const testPath = './../JSON/test.json';

// Define routes
router.get('/', (req, res) => {
  res.render('index');
})
.get('/scan', async (req, res) => {
  console.log("Scan");

  const python_path = './../../Data/scan.py';
  const python = spawn('python3.10', [python_path]);

  python.on('error', (err) => {
    console.log(err);
  });

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ... data: ' + data);
  });

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    console.log('child process close');
    console.log("Scan done");
    res.send('scan done');
  });
})
.get('/database', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    var machines = JSON.parse(data);
    var hosts = [];
    for (var i = 0; i < machines["nmaprun"]["host"].length; i++) {
      var infosMachine = {};

      const machine = machines["nmaprun"]["host"][i];
      infosMachine["address"] = helper.get_ip(machine);
      infosMachine["name"] = helper.get_name(machine);

      hosts.push(infosMachine);
    }
    res.render('machinesAllMachines', {data: machines, hosts: hosts}); // ports: ports});
    // fs.readFile(testPath, 'utf8', (err, data) => {
    //   if (err) {
    //     throw err;
    //   }
    //   var testMachines = JSON.parse(data);
    //   var ports = []
    //   for (var i = 0; i < testMachines["nmaprun"]["host"].length; i++) {
    //     var infosPort = {};

    //     const testMachine = testMachines["nmaprun"]["host"][i];
    //     infosPort["port"] = helper.get_port(machine);

    //     ports.push(infosPort)
    //   }
    // });
  });
})
.use((req, res) => {
  res.redirect('/');
});

// this line is unchanged
module.exports = router;