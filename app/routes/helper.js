function get_ip(host) {
    if (host["address"] != undefined) {
        if (Array.isArray(host["address"]) && host["address"][0] != undefined && host["address"][0]["@addrtype"] == "ipv4") {
            return host["address"][0]["@addr"];
        }
        else if (host["address"]["@addrtype"] == "ipv4") {
            return host["address"]["@addr"];
        }
        else {
            return "Pas d'IP trouvée";
        }
    }
    else {
        return "Pas d'IP trouvée";
    }
}

function get_name(host) {
    if (host["hostnames"] != undefined) {
        if (host["hostnames"]["hostname"] != undefined) {
            return host["hostnames"]["hostname"]["@name"];
        }
        else {
            return "Pas de nom trouvé";
        }
    }
    else {
        return "Pas de nom trouvé";
    }
}

function get_port_info(port) {
    return {'data': [`Port : ${port["@portid"]} / Protocole :  ${port["@protocol"]} / Service : ${port["service"]["@name"]}`], 'vuln': get_vulnerabilities(port)};
}

function get_port(hostPorts) {
    var portsFound = []
    if (hostPorts.hasOwnProperty('port')) {
        if (Array.isArray(hostPorts["port"])) {
            for (let i = 0; i < hostPorts["port"].length; i++) {
                portsFound.push(get_port_info(hostPorts["port"][i]));
            }
        }
        else {
            portsFound.push(get_port_info(hostPorts["port"]));
        }        
    }
    else {
        portsFound.push({'data': ["Aucun port n'est accessible depuis le réseau"], vuln: null})
    }
    return portsFound
}

function get_vulnerabilities(port) {
    if (port.hasOwnProperty('script')) {
        const script = port["script"];
        if (script.hasOwnProperty('@id') && script['@id'] == 'vulners') {
            if (Array.isArray(script)) {
                for (let i = 0; i < port["script"].length; i++) {
                    if (script[i].hasOwnProperty('table')) {
                        table =script[i]["table"];
                        if (Array.isArray(table)) {
                            for (let j = 0; j < table.length; j++) {
                                if (table[j].hasOwnProperty('table')) {
                                    return get_vuln_from_table(table[j]["table"]);
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                        else {
                            if (table.hasOwnProperty('table')) {
                                return get_vuln_from_table(table["table"]);
                            }
                        }
                    }
                    else {
                        return null;
                    }
                }
            }
            else {
                if (script.hasOwnProperty('table')) {
                    table =script["table"];
                    if (Array.isArray(table)) {
                        for (let j = 0; j < table.length; j++) {
                            if (table[j].hasOwnProperty('table')) {
                                return get_vuln_from_table(table[j]["table"]);
                            }
                            else {
                                return null;
                            }
                        }
                    }
                    else {
                        if (table.hasOwnProperty('table')) {
                            return get_vuln_from_table(table["table"]);
                        }
                    }
                }
                else {
                    return null;
                }
            }
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

function get_vuln_from_table(vuln_table) {
    var vuln_discovered = []
    if (Array.isArray(vuln_table)) {
        for (let i = 0; i < vuln_table.length; i++) {
            const cve = vuln_table[i];
            var cve_dict = {}
            if(cve.hasOwnProperty('elem')) {
                if(Array.isArray(cve["elem"])) {
                    for (let j = 0; j < cve["elem"].length; j++) {
                        const element = cve["elem"][j];
                        cve_dict[element["@key"]] = element["#text"]
                    }
                }
                else {
                    cve_dict[cve["elem"]["@key"]] = cve["elem"]["#text"] 
                }
            }
            else {
                cve_dict["error"] = "Aucune information trouvé"
            }
        vuln_discovered.push(cve_dict)            
        }
    } 
    else {
        if(vuln_table.hasOwnProperty('elem')) {
            if(Array.isArray(cve["elem"])) {
                for (let j = 0; j < element.length; j++) {
                    const element = cve["elem"][j];
                    cve_dict[element["@key"]] = element["#text"]
                }
            }
            else {
                cve_dict[cve["elem"]["@key"]] = cve["elem"]["#text"] 
            }
        }
        else {
            cve_dict["error"] = "Aucune information trouvé"
        }
        vuln_discovered.push(cve_dict)            
    }
    return vuln_discovered 
}

exports.get_ip = get_ip;
exports.get_name = get_name;
exports.get_port = get_port;