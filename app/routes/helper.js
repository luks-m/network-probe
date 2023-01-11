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

function get_port(host) {
    if (host.hasOwnProperty('extraports')) {
        console.log("Extraport")
        return host["extraports"]["@count"] + host["extraports"]["@state"]
    }
    if (host.hasOwnProperty('port') &&  host['ports']['port'] !== null) {
        if (Array.isArray(host["port"])) {
            console.log("Multiple Port")
            return "Ports found"
        }
        else {
            console.log("One Port")
            var idPort = host["port"]["@portid"] + "/" + host["port"]["@protocol"]
            var state = host["port"]["state"]["@state"]
            var service =  host["port"]["service"]["@name"]
            return idPort.concat(' state=',state, ' service=', service)
        }
    }  
}

exports.get_ip = get_ip;
exports.get_name = get_name;
exports.get_port = get_port;