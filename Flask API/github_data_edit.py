import pandas as pd
import io
import requests
import json

#Github URL for testing
github_url = "https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson"

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

'''Code for testing purposes'''
'''
#data = get_data(github_url)
#print(json.dumps(data, indent=8, sort_keys=True))
#print(data)
'''