import json
import nmap
import xmltodict
import untangle
import os
import shutil

if os.path.exists('../build'):
    shutil.rmtree("../build")
os.mkdir("../build")

path_xml_general = "../build/results_general.xml"
path_json = "../JSON/current_database.json"
array_path_xml =[]

scanner = nmap.PortScanner()
def general_scan():
    scanner.scan(hosts='172.21.202.0/24', arguments='-sV -Pn -n')
    fileXML = open(path_xml_general, "wb")
	#Create XML nmap report
    fileXML.write(scanner.get_nmap_last_output())
    fileXML.close()
   

def agressif_scan():
    print("DÉBUT")
    path_xml_host = "../build/results_host"
    
    nmap1 = untangle.parse(path_xml_general)
    host_iterator = nmap1.nmaprun.host
    i = 0
    for host in host_iterator:
        if(host.address[0] is not None) :
            path_xml_host += str(i) + ".xml"
            fileXML2 = open(path_xml_host, "wb")    
            print(host.address[0]["addr"])
            scanner.scan(hosts=host.address[0]["addr"], arguments = '-A -p 22-443 --script vulners --script-args mincvss=5.0')
            fileXML2.write(scanner.get_nmap_last_output())
            fileXML2.close()
            array_path_xml.append(path_xml_host)
            #print(array_path_xml)
            path_xml_host = "../build/results_host"
            i+=1
        else :
            print("FIN")
   
    
def xmltojson():
    json_list = []
    for path in array_path_xml:
        with open(path) as f:
            data_dict = xmltodict.parse(f.read())
        json_list.append(data_dict)
    json_data = json.dumps(json_list, indent=4, sort_keys=True)
    with open(path_json, "w") as j:
        j.write(json_data)
    j.close


general_scan()
agressif_scan()
xmltojson()

#Ne marche que si build est vide
#os.rmdir("../build")
shutil.rmtree("../build")