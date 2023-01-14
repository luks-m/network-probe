function get_ip(host) {
    if (host["address"] != undefined) {
        if (Array.isArray(host["address"]) && host["address"][0] != undefined && host["address"][0]["@addrtype"] == "ipv4") {
            return host["address"][0]["@addr"];
        }
        else if (host["address"]["@addrtype"] == "ipv4") {
            return host["address"]["@addr"];
        }
        else {
            return "No IP found";
        }
    }
    else {
        return "No IP found";
    }
}

function get_name(host) {
    if (host["hostnames"] != undefined) {
        if (host["hostnames"]["hostname"] != undefined) {
            return host["hostnames"]["hostname"]["@name"];
        }
        else {
            return "No name found";
        }
    }
    else {
        return "No name found";
    }
}

function get_port_info(port) {
    return {'data': [`Port : ${port["@portid"]} / Protocole :  ${port["@protocol"]} / Service : ${port["service"]["@name"]}`], 'vuln': null};
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

function get_vuln_table(port) {
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
                                    return table[j]["table"];
                                }
                        }
                        
                    }
                }
            }
        }    
    }
}
}

exports.get_ip = get_ip;
exports.get_name = get_name;
exports.get_port = get_port;
exports.get_vuln_table = get_vuln_table;