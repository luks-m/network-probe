// load up the machine route
const express = require('express');
const fs = require('fs');
const helper = require('./helper.js');
const { spawn } = require('child_process');


// Router
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.render('index');
})
.get('/scan', async (req, res) => {
  console.log("Scan");

  const python_path = './../script/scan.py';
  const python = spawn('python3', [python_path]);

  python.on('error', (err) => {
    console.log(err);
  });

  python.on('exit', (code) => {
    console.log("Scan done");
    res.redirect('/database');
  });
})
.get('/save', (req, res) => {
  console.log("Save");

  const python_path = './../script/save.py';

  const args = [req.query.name];
  args.unshift(python_path);

  const python = spawn('python3', args);

  python.on('error', (err) => {
    console.log(err);
  });

  python.on('exit', (code) => {
    console.log("Save done");
    res.redirect('/database');
  });
})
.get('/database/:name?', (req, res) => {
  const data_name = req.params.name || 'current_database';
  
  // Database
  const dbPath = './../JSON/'+data_name+'.json';
  const testPath = './../JSON/test.json';

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
    res.render('machinesAllMachines', { data: machines, hosts: hosts }); // ports: ports});
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