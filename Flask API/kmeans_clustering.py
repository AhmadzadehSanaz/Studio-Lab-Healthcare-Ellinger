import os
import pandas as pd
import requests
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
import json
import seaborn as sns
import matplotlib.pyplot as plt
from github_data_edit import get_data


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
    return [clean_data_frame.to_json(), data_frame.to_json()]

'''THIS FUNCTION STILL REQUIRES SOME WORK'''
def boxplot_generator(data_frame,selectec_features):
    sns.set()
    new_df = pd.read_json(data_frame)
    #print(new_df)
    for f in selectec_features:
        print(f)
        '''SOMETHING WRONG HERE THAT NEEDS FIXING'''
        #box_plots = sns.boxplot(x="clusters", y=f, data=new_df)
        #return box_plots
        #plt.show()

'''SECTION FOR TESTING PURPOSES'''

'''
#Github URL for testing
github_url = "https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson"

df = get_data(github_url)
cluster_features = ["adult_obesity","population_no_health_insurance","nearest_hospital_distance"]
num_clusters = 5

cluster = cluster_generator(df, cluster_features, num_clusters)
plots = boxplot_generator(cluster[1], cluster_features)
'''