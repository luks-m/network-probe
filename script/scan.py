import time
import os

print("Begin of script")
bashCommand = "mv ./../Data/database.json ./../JSON/database.json"
time.sleep(2)
os.system(bashCommand)
print("End of script")