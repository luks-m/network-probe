import json
import xmltodict

pathXml = "./testPort.xml"
pathJson = "./../JSON/testPort.json"



def xmltojson(xmlFile, jsonPath):
   
    with open(xmlFile) as f:
        data_dict = xmltodict.parse(f.read())
    
    f.close()
    json_data = json.dumps(data_dict, indent=4, sort_keys=True)

    with open(jsonPath, "w") as j:
        j.write(json_data)

    j.close()


xmltojson(pathXml, pathJson)


