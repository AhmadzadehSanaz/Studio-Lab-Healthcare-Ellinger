from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import pandas as pd
import io
import requests
import json
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from github_data_edit import get_data
from kmeans_clustering import cluster_generator

#Creation of the Flask Application
app = Flask(__name__)
api = Api(app)

#List of required arguments
cluster_post_arguments = reqparse.RequestParser()
cluster_post_arguments.add_argument("data", type=str)
cluster_post_arguments.add_argument("selected features", type=str, action='append', default=[])
cluster_post_arguments.add_argument("number of clusters", type=int)

class MedLocAPI(Resource):

    def get(self):
        github_url = "https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson"
        data = get_data(github_url)
        return data

    def post(self):
        arguments = cluster_post_arguments.parse_args()
        data = arguments['data']
        selected_attributes = arguments['selected features']
        number_of_cluster = arguments['number of clusters']
        cluster_data =cluster_generator(data, selected_attributes, number_of_cluster)
        return cluster_data[0]

api.add_resource(MedLocAPI, "/cluster")

#Run 
if __name__ == "__main__":
    app.run(debug=True)