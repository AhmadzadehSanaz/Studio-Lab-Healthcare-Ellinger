'''
import plotly_express as px
import plotly
import plotly.graph_objs as go
plotly.offline.init_notebook_mode(connected=True)

iris = px.data.iris()

iris_plot = px.scatter(iris, x='sepal_width', y='sepal_length',
           color='species', marginal_y='histogram',
          marginal_x='box', trendline='ols')

plotly.offline.plot(iris_plot)
'''

# import all necessary libraries 
import pandas as pd 
import numpy as np 
import plotly
from plotly import __version__ 
#import plotly_express as px
import plotly.express as px

from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot 

# to get the connection 
init_notebook_mode(connected = True) 

# creating dataframes 
df = pd.DataFrame(np.random.randn(100, 4), columns ='A B C D'.split()) 

df2 = pd.DataFrame({'Category':['A', 'B', 'C'], 'Values':[32, 43, 50]}) 

df2.head() 
 # plotly function 
3
df.iplot()

#iris_plot = px.box(df, x='A', y='B')

#x = plotly.offline.plot(iris_plot)