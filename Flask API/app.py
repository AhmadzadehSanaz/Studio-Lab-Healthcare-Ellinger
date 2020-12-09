from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource, reqparse
import pandas as pd
import io
import requests
import json
from flask_cors import CORS, cross_origin
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn import metrics

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
def kmeans_cluster_generator(data,features=None,n_clusters=5):
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
    
    #Get and store the distance to each cluster centroid
    #Note: kmeans.transforms returns the distance to all the cluster centroids the for loop is to get the distance to the assigned cluster
    distance_to_cluster_centroid = []
    for i in range(len(kmeans.transform(data_frame))):
        
        #For debugging
        #print (kmeans.transform(data_frame)[i][kmeans.labels_[i]])
        distance_to_cluster_centroid.append(kmeans.transform(data_frame)[i][kmeans.labels_[i]])

    #Add newly labels for the cluster data to original data frame an re-add fid column
    data_frame['fid'] = fid_column
    data_frame["clusters"] = clusters
    data_frame['distance_to_cluster_centroid'] = distance_to_cluster_centroid

    #Convert data frame into json format
    clean_data = data_frame.to_json(orient='index')
    parsed = json.loads(clean_data)
    
    #Remap the keys of the json format to be the fid of the hexagon cells
    stored_data = []
    for data in range(len(parsed)):
        all_the_data = parsed[str(data)]
        stored_data.append(all_the_data)

    lean_data = {int(key):value for key,value in zip(fid_column,stored_data)}

    '''
    Example of data structure

    Data is organized by hexagonal grid cell which contains all the information
    that was requested for the clustes, additional to the cluster number, 
    and the distance from the cluster centroid

    "1": {
        "adult_obesity": 0.3087912088,
        "clusters": 0,
        "distance_to_cluster_centroid": 0.13183805,
        "fid": 1,
        "nearest_hospital_distance": 0.0880002894,
        "population_no_health_insurance": 0.5324675325
    },
    '''
    
    return lean_data

def kmeans_silouhette_method_optimun_cluster_number(data,features=None,n_clusters=5):
    #Convert the json data into a pandas data frame
    data_frame = pd.read_json(data)

    #Generate normalization of values from 0 to 1
    min_max_scaler = MinMaxScaler()

    #Normalize all the values in data set to fit between 0 to 1
    data_frame[data_frame.columns] = min_max_scaler.fit_transform(data_frame)

    #Get all the features in the data set
    if features:
        data_frame = data_frame[features]

    standarized_data = StandardScaler().fit_transform(data_frame)

    sum_of_squared_distances = []
    CH_scores = []
    K = range(2,10)
    for k in K:
        k_means = KMeans(n_clusters=k)
        sum_of_squared_distances.append(k_means.inertia_)
        labels = k_means.labels_
        CV_score = metrics.silhouette_score(standarized_data, labels, metric = 'euclidean')
        CH_score = metrics.calinski_harabasz_score(standarized_data, labels)
        CH_scores.append(CH_score)

    highest_CH_score = max(CH_scores)
    ideal_cluster_number = CH_scores.index(highest_CH_score) + 2
    print(ideal_cluster_number)

    return str(ideal_cluster_number)

#Creation of the Flask Application
app = Flask(__name__,static_folder='./MedLoc/build', static_url_path='/')
api = Api(app)
CORS(app,support_credentials=True)

#List of required arguments
cluster_post_arguments = reqparse.RequestParser()
cluster_post_arguments.add_argument("data", type=str)
cluster_post_arguments.add_argument("selected features", type=str, action='append', default=[])
cluster_post_arguments.add_argument("number of clusters", type=int)


@app.route('/',methods=['POST', 'GET', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def index():
    return app.send_static_file('index.html')

@app.route('/get_kmeans_silouhette_optimun_cluster_number/', methods=['POST'])
def kmeans_silouhette_cluster_number():

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

    ideal_cluster_number = kmeans_silouhette_method_optimun_cluster_number(data, selected_attributes, number_of_cluster)

    return ideal_cluster_number

@app.route('/get_kmeans_cluster/', methods=['POST'])
def post_kmeans_cluster():

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

    #Run Kmeans cluster algorithm
    cluster_data = kmeans_cluster_generator(data, selected_attributes, number_of_cluster)

    #Testing alternatives
    #return make_response(jsonify(cluster_data))
    #return "<body><pre style ='word-wrap: break-word; white-space: pre-wrap;'>" + json.dumps(cluster_json) + "</pre></body>"
    #return json.dumps(cluster_data)

    #For debuging
    #print(cluster_data)
    return cluster_data
#Run
if __name__ == "__main__":
    app.run(debug=True)