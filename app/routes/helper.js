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

function testOnClickButton() {
    console.log("test");
}

exports.get_ip = get_ip;
exports.get_name = get_name;
exports.testOnClickButton = testOnClickButton;