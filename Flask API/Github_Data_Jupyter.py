#!/usr/bin/env python
# coding: utf-8

# In[50]:


import pandas as pd
import io
import requests
import json


# In[51]:


#Get main data file from Github Repo
github_request = requests.get("https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson")


# In[52]:


#Turn data to JSON format
data = github_request.json()


# In[53]:


#Get all the features from the JSON data
features = [f["properties"] for f in data["features"]]


# In[54]:


#Turn all the data into a pandas data frame
df = pd.DataFrame.from_records(features)


# In[55]:


#Get all columns in data frame
#Print columns to ensure they are all there
print(df.columns)


# In[43]:


#List of columns to exclude
columns_to_exclude = ['fid', 'id', 'top', 'right', 'bottom',"predominant_race_by_population_per_cell"]


# In[44]:


#Find all the columns that contain the word "name" / Find all columns with categorical data with "Name"
withName = [i for i in df.columns if "name" in i]


# In[46]:


#Merge found columns with existing list
columns_to_exclude = columns_to_exclude + withName


# In[48]:


#See the columns to be excluded
#Print all columns to be excluded
print(columns_to_exclude)


# In[58]:


#Drop the excluded columns from the main data frame
clean_data_frame = df.drop(columns_to_exclude,axis=1)


# In[61]:


clean_data_frame


# In[ ]:




