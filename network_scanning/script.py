import json
import nmap
import xmltodict
import untangle

path_xml = "../Data/results_g.xml"
path_xml2 = "../Data/results_p"
path_json = "../Data/results.json"
path_xml3 =[]

scanner = nmap.PortScanner()
def general_scan(): 
  
    scanner.scan(hosts='172.21.202.0/24', arguments='-sV -Pn -n')
    fileXML = open(path_xml, "wb")
	#Create XML nmap report
    fileXML.write(scanner.get_nmap_last_output())
    fileXML.close()
   

def agressif_scan(path_xml2):
    print("DÉBUT")
    nmap1 = untangle.parse(path_xml)
    host_iterator = nmap1.nmaprun.host
    i = 0
    for host in host_iterator:
        if(host.address[0] is not None) :
            path_xml2 += str(i) + ".xml"
            fileXML2 = open(path_xml2, "wb")    
            print(host.address[0]["addr"])
            scanner.scan(hosts=host.address[0]["addr"], arguments = '-A -p 22-443 --script vulners --script-args mincvss=5.0')
            fileXML2.write(scanner.get_nmap_last_output())
            fileXML2.close()
            path_xml3.append(path_xml2)
            print(path_xml3)
            path_xml2 = "../Data/results_p"
            i+=1
        else :
            print("FIN")
   
    
def xmltojson(path_xml3):
    json_list = []
    for path in path_xml3:
        with open(path) as f:
            data_dict = xmltodict.parse(f.read())
        json_list.append(data_dict)
    json_data = json.dumps(json_list, indent=4, sort_keys=True)
    with open(path_json, "w") as j:
        j.write(json_data)
    j.close


general_scan()
agressif_scan(path_xml2)
xmltojson(path_xml3)



