import nmap
import os

def scan():
    scanner = nmap.PortScanner()
 
    ip_addr = '172.21.202.125'
    scanner.scan(hosts='172.21.202.0/24', arguments='-sN', sudo='sudo')
    hosts_list = [(x, scanner[x]) for x in scanner.all_hosts()]

    fileXML = open("result.xml", "wb")
	#Create XML nmap report
    fileXML.write(scanner.get_nmap_last_output())
    fileXML.close()

scan()