import time
import os

print("Begin of script")
bashCommand = "mv ./../JSON/old_database.json ./../JSON/current_database.json"
time.sleep(2)
os.system(bashCommand)
print("End of script")