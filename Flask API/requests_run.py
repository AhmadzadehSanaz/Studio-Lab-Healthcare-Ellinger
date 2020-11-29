import requests
from github_data_edit import get_data
import json

'''REMEMBER TO RUN FLASK APPLICATION FIRST BEFORE RUNNING THIS CODE'''

BASE = "http://127.0.0.1:5000/"

#Github URL
github_url = "https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson"

#Get and clean data from the github repo & test variables
#Data to send to the API
data = get_data(github_url)
cluster_features = ["adult_obesity","population_no_health_insurance","nearest_hospital_distance"]
num_clusters = 5

#Official POST request that is sent to the Flask API application
cluster = requests.post(BASE + "/get_cluster",  {"data": data, "selected features": cluster_features, "number of clusters": num_clusters})
print(cluster.json())
