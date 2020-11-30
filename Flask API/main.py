from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource, reqparse
import pandas as pd
import io
import requests
import json
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans

'''
Function to get all the data from the github repo
and prepare it, by cleaning categorical data from 
it and eliminating part of the geolocation data
'''
def get_data(url):
    #Get main data file from Github Repo
    github_request = requests.get(url)

    #Turn data to JSON format
    data = github_request.json()

    #Get all the features from the JSON data
    features = [f["properties"] for f in data["features"]]

    #Turn all the data into a pandas data frame
    df = pd.DataFrame.from_records(features)

    #Get all columns in data frame
    #Print columns to ensure they are all there
    #print(df.columns)

    #List of columns to exclude
    columns_to_exclude = ['id', 'top', 'right', 'bottom',"predominant_race_by_population_per_cell"]
    
    #Find all the columns that contain the word "name" / Find all columns with categorical data with "Name"
    withName = [i for i in df.columns if "name" in i]

    #Merge found columns with existing list
    columns_to_exclude = columns_to_exclude + withName

    #See the columns to be excluded
    #Print all columns to be excluded
    #print(columns_to_exclude)

    #Drop the excluded columns from the main data frame
    clean_data_frame = df.drop(columns_to_exclude,axis=1)

    #Convert data frame to JSON format
    clean_data_frame_JSON = clean_data_frame.to_json()

    #print(clean_data_frame)
    return clean_data_frame_JSON

'''
Funtion to generate a set of cluster based on the desired
attributes and selectec number of clusters
'''
def cluster_generator(data,features=None,n_clusters=5):
    #Convert the json data into a pandas data frame
    data_frame = pd.read_json(data)
    fid_column = data_frame['fid']

    #Generate normalization of values from 0 to 1
    min_max_scaler = MinMaxScaler()

    #Normalize all the values in data set to fit between 0 to 1
    data_frame[data_frame.columns] = min_max_scaler.fit_transform(data_frame)
    
    #Get all the features in the data set
    if features:
        data_frame = data_frame[features]

    #Based on the number of clusters selected find kmeans
    kmeans = KMeans(n_clusters=n_clusters,random_state=23)

    #Fit the data to generate clusters based on selected attributes
    kmeans = kmeans.fit(data_frame)
    
    #Get the newly made clusters
    clusters = kmeans.labels_

    #Add newly labels for the cluster data to original data frame an re-add fid column
    data_frame['fid'] = fid_column
    data_frame["clusters"] = clusters

    #Remove all columns of the selected attributes to only leave cluster and fid 
    clean_data_frame = data_frame.drop(features, axis=1)

    #Turn the data into a a JSON file
    #clean data frame only contatins fid & cluster
    #data frame contains fid, cluster & the other selected attributes / Mainly used for plotting
    return {"clean_data":clean_data_frame.to_json(), 
            "selected_data":data_frame.to_json()}

#Creation of the Flask Application
app = Flask(__name__)
api = Api(app)

#List of required arguments
cluster_post_arguments = reqparse.RequestParser()
cluster_post_arguments.add_argument("data", type=str)
cluster_post_arguments.add_argument("selected features", type=str, action='append', default=[])
cluster_post_arguments.add_argument("number of clusters", type=int)


@app.route('/')
def index():
    return "<h1>Welcome to MedLoc Server API System!</h1>"

@app.route('/get_cluster/', methods=['POST'])

def post_data():
    
    #Github URL data repo location
    github_url = "https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson"

    #Get and clean data from the github repo & test variables
    #Data to send to the API
    data = get_data(github_url)
    
    #Define and get arguments from request
    arguments = cluster_post_arguments.parse_args()
    selected_attributes = arguments['selected features']
    number_of_cluster = arguments['number of clusters']
    #selected_attributes = request.form['selected features']
    #number_of_cluster = request.form['number of clusters']

    cluster_data = cluster_generator(data, selected_attributes, number_of_cluster)
    #return make_response(jsonify(cluster_data))
    return json.dumps(cluster_data)

#Run 
if __name__ == "__main__":
    app.run(debug=True)