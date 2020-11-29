from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import pandas as pd
import io
import requests
import json
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from github_data_edit import get_data
import kmeans_clustering as km

#Creation of the Flask Application
app = Flask(__name__)
api = Api(app)

#List of required arguments
cluster_post_arguments = reqparse.RequestParser()
cluster_post_arguments.add_argument("data", type=str)
cluster_post_arguments.add_argument("selected features", type=str, action='append', default=[])
cluster_post_arguments.add_argument("number of clusters", type=int)


@app.route('/get_cluster', methods=['POST'])

def post_data():
    arguments = cluster_post_arguments.parse_args()
    data = arguments['data']
    selected_attributes = arguments['selected features']
    number_of_cluster = arguments['number of clusters']
    cluster_data = km.cluster_generator(data, selected_attributes, number_of_cluster)
    km.boxplot_generator_subplot(cluster_data[1], selected_attributes)
    return cluster_data[1]

#Run 
if __name__ == "__main__":
    app.run(debug=True)