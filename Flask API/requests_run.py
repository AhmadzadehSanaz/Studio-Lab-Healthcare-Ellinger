import requests
from flask import jsonify

'''REMEMBER TO RUN FLASK APPLICATION FIRST BEFORE RUNNING THIS CODE'''

BASE = "http://127.0.0.1:5000/"

cluster_features = ["adult_obesity","population_no_health_insurance","nearest_hospital_distance"]
num_clusters = 5

#Official POST request that is sent to the Flask API application
cluster = requests.post(BASE + "/get_cluster/",  {"selected features": cluster_features, "number of clusters": num_clusters})
print(cluster)
