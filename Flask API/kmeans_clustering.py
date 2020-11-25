import os
import pandas as pd
import requests
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
import json
import seaborn as sns
import matplotlib.pyplot as plt
from github_data_edit import get_data
import plotly
import plotly.express as px
from plotly.subplots import make_subplots
import plotly.graph_objects as go

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
    return [clean_data_frame.to_json(), data_frame.to_json()]

''' 
Function to generate a sigle plots with multiple subplots 
for all the selected attributes for the cluster
'''
def boxplot_generator_subplot(data_frame,selectec_features):
    
    #Convert the json data back into a pandas data frame
    new_df = pd.read_json(data_frame)
    
    #Create canvas to display the multiple plots and columns based on the amount of selected attributes
    fig = make_subplots(rows=1, cols=len(selectec_features))
    
    #Loop to generate all the plots
    for f in selectec_features:
        
        #Counter to assing the individual column location
        counter = (selectec_features.index(f) + 1)
        
        #Creation of the box plot and update of the x & y axis
        fig.add_trace(go.Box(x=new_df['clusters'], y=new_df[f]),row=1,col=counter)
        fig.update_xaxes(title_text="clusters", row=1, col=counter)
        fig.update_yaxes(title_text=f, row=1, col=counter)
    
    #Determine the dimentions of the total plot area, title and show the plot
    fig.update_layout(height=800, width=1500, title_text="Side By Side Subplots")
    fig.show()
    
    return fig

''' 
Function to generate seperate box plots 
for all the selected attributes for the cluster
'''
def boxplot_generator_single(data_frame,selectec_features):
    
    #Convert the json data back into a pandas data frame
    new_df = pd.read_json(data_frame)
    
    #Create new list to store the plots
    list_of_plots = []

    #Loop to run through all selectec attributes & generate the individual plots  
    for f in selectec_features:
        
        #Creation of the box plot
        box_plots = px.box(new_df, x='clusters', y=f,notched=True)
        
        #Show the plot
        plot_html = plotly.offline.plot(box_plots)
        
        #Store plots to list
        list_of_plots.append(plot_html)
    return box_plots


'''SECTION FOR TESTING PURPOSES'''
'''
#Github URL for testing
github_url = "https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson"

df = get_data(github_url)
cluster_features = ["adult_obesity","population_no_health_insurance","nearest_hospital_distance"]
num_clusters = 5

cluster = cluster_generator(df, cluster_features, num_clusters)
#plots = boxplot_generator_subplot(cluster[1], cluster_features)
plots = boxplot_generator_single(cluster[1], cluster_features)
print(plots)
'''