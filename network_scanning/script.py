import json
import re

import nmap
import xmltodict
from lxml import etree
import untangle

path_xml = "../Data/results_g.xml"
path_xml2 = "../Data/results_p.xml"
path_json = "../Data/results.json"

list_debug = ["172.21.202.50",
"172.21.202.71",
"172.21.202.89",
"172.21.202.95",
"172.21.202.119",
"172.21.202.121",
"172.21.202.124",
"172.21.202.125",
"172.21.202.126",
"172.21.202.127",
"172.21.202.133",
"172.21.202.136",
"172.21.202.175",
"172.21.202.180",
"172.21.202.197"]

scanner = nmap.PortScanner()
def general_scan(): 
    #ip_addr = '172.21.202.125'
    scanner.scan(hosts='172.21.202.0/24')
    scanner.command_line()
    ' nmap -sV -Pn 172.21.202.0/24'
   # hosts_list = [(x, scanner[x]) for x in scanner.all_hosts()]
    fileXML = open(path_xml, "wb")
	#Create XML nmap report
    fileXML.write(scanner.get_nmap_last_output())
    fileXML.close()
   

def agressif_scan():
    print("DÉBUT")
    nmap1 = untangle.parse(path_xml)
    host_iterator = nmap1.nmaprun.host
    fileXML = open(path_xml2, "ab")
    for host in host_iterator:
        
        if(host.address[0] is not None) :
            
            print(host.address[0]["addr"])
            scanner.scan(hosts=host.address[0]["addr"])
            scanner.command_line()
            'nmap -A -p 22-443 --script vulners --script-args mincvss=5.0'+host.address[0]["addr"]
            fileXML.write(scanner.get_nmap_last_output())
        else :
            print("FIN")
    fileXML.close()
   
    

def xmltojson(xml_file):
   
    with open(path_xml2) as f:
        data_dict = xmltodict.parse(f.read())
    
    f.close()
    json_data = json.dumps(data_dict, indent=4, sort_keys=True)

    with open(path_json, "w") as j:
        j.write(json_data)

    j.close()

general_scan()
agressif_scan()
xmltojson(path_xml)



