// load up the machine route
const express = require('express');
const fs = require('fs');
const helper = require('./helper.js');
const { spawn } = require('child_process');


// Router
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  const files = fs.readdirSync('./../JSON/');

  res.render('index', { files: files });
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
  const data_name = req.params.name || 'current_database.json';
  
  // Database
  const dbPath = './../JSON/' + data_name;
  const testPath = './../JSON/test.json';

  const files = fs.readdirSync('./../JSON/');

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    var jsonFile = JSON.parse(data); 
    var hosts = [];
    var ports = [];
    if(jsonFile.length == 0) {
      return "Aucun appareil n'a été trouvé"
    }
    else {
      for (var i = 0; i < jsonFile.length; i++) {
        const machineFound = jsonFile[i];
          if(!machineFound.hasOwnProperty('nmaprun')) {
          return "Problème : nmap ne s'est pas lancé"
        }
        else {
          const nmaprun = machineFound["nmaprun"];
          var infosHost = {};
          // var infosPort = {};
          if(!nmaprun.hasOwnProperty('host')) {
            return "Aucun host n'a été trouvé"
          }
          else {
            //------------ HOST IP AND HOST NAME ------------//  
            const host = nmaprun["host"];
            infosHost["address"] = helper.get_ip(host);
            infosHost["name"] = helper.get_name(host);

            //---------------- PORTS INFOS ------------------//  
            if(!host.hasOwnProperty('ports')) {
              return "Aucun port n'a été scanné"
            }
            else {
              const hostPorts = host["ports"];
              infosHost["extraports"] = helper.get_extraports(hostPorts);
              infosHost["ports"] = helper.get_port(hostPorts);
            }
          }
        }
        hosts.push(infosHost);
      }
    }
    res.render('machinesAllMachines', { data: jsonFile, hosts: hosts, files: files}); // ports: ports});
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