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
    console.log("in get_port")
    if(host["ports"] != undefined) {
        if (host["ports"]["extraports"] != undefined) {
                return host["ports"]["extraports"]["@count"] + host["ports"]["extraports"]["@state"]
        }
        if (host["ports"]["port"] != undefined) {
            if (Array.isArray(host["ports"]["port"])) {
                return "Ports found"
            } else {
                var idPort = host["ports"]["port"]["@portid"] + "/" + host["ports"]["port"]["@protocol"]
                var state = "state =" + host["ports"]["port"]["state"]["@state"]
                var service = "service =" +  host["ports"]["port"]["service"]["@name"]
                return idPort + state + service
            } 
        }
    }
}

exports.get_ip = get_ip;
exports.get_name = get_name;
exports.get_port = get_port;