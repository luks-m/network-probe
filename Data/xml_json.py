
import json,xmltodict
"""
Nmap XML Output to Json Output in Python 
example : data = xml2json('nmap_output.xml')
"""
def xml2json(xml): 
    xmlfile = open(xml)
    xml_content = xmlfile.read()
    xmlfile.close()
    xmljson = json.dumps(xmltodict.parse(xml_content), indent=4, sort_keys=True)
    with open("sample.json", "w") as outfile:
        outfile.write(xmljson)

xml2json('./training.xml')


