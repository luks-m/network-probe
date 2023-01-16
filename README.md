# Network Probe and vulnerability detection software

## Table of contents

- [Description](#description)
- [Installation](#installation)
    - [Python modules](#python-modules)
    - [Web Interface](#web-interface)
- [Usage](#usage)
    - [Scan](#scan)
    - [Results analysis](#results-analysis)

## Description

This project is a software that can help any company or organization to monitor their IT hardwares and softwares and prevent any harmful attack.

The software is composed of two parts:

- A network probe that can be installed on any computer in the network and that will send data to the server.

- A web interface that will display the data and allow the user to configure the probe.

The web interface is based on a [Node.js](https://nodejs.org/) server and use [Express](https://expressjs.com/) and [Materialize](http://materializecss.com/) as frameworks.

A portable version of this project is available. If you have this version, you just have to launch the powershell script `scan.ps1` to start the software. Thus, you can skip the installation part.

## Installation

### Python modules

The scan script is written in Python3 and use the following modules:

- **python-nmap** : to scan the network
- **xmltodict** : to parse the XML output of nmap
- **untangle** : to parse the XML output of nmap

You can install them running the following command:

```bash
$ pip3 install python-nmap xmltodict untangle
```

#### Web Interface

The web interface is based on [Node.js](https://nodejs.org/).
`npm` is used to install the dependencies and run the server.

To install the dependencies, run the following command:

```bash
$ cd app
$ npm install
```

Some parameters can be configured in `app/config.js`. In particular, the address and port of the HTTP server.

Then, the server can be launched:

```bash
$ npm start
```

This will start the server on the address and port specified in `config.js`. Then, it will automatically open a browser window on the address of the server.

The server is, by default, accessible at [http://localhost:8888](http://localhost:8888).


## Usage

### Scan

On the web interface, you can do a scan of the network by clicking on the button `Scan` in the menu.

This will ask you to enter the IP addresses that you want to scan. You can enter a single IP address or a range of IP addresses.

Then, the scan will be launched and you will be redirected to the results page.

### Results analysis

On the results page, you can see the results of the scan. The results are displayed in a table with the following columns:

- **Hôte** : the hostname of the scanned computer
- **Adresse IP** : the IP address of the scanned computer
- **Etat** : the state of the machine (vulnerabilities found or not)
- **Plus d'informations** : a link to the details of the scan

## Authors

- [ZIZI Marwan](https://github.com/marwanzi)
- [MARAIS Lucas](https://github.com/luks-m)
- [BERARD Thomas](https://github.com/tberard002)
- [CANNAROZZO Luigi](https://github.com/LuigiCan)