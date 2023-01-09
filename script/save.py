from datetime import date
import os
import sys

if os.path.exists('./../JSON/current_database.json'):
    print("Le fichier existe.")
    file_name = sys.argv[1]
    #bashCommand = "cp ./../JSON/current_database.json ./../JSON/"+file_name+".json"
    bashCommand = "copy /y .\..\JSON\current_database.json .\..\JSON\\"+file_name+".json"
    os.system(bashCommand)
    print("Le fichier a été enregistré à la destination.")
else:
    print("Le fichier n'existe pas.")
