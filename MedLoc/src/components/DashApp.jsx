// Libraries import

import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import '../styles/dashStyle.css';

// ____________________________________ Imports ____________________________________

//Data
import WorldTable from './Data/WorldTable';

//Visualizations
import PieViz from './Data/PieViz';

// Maps
import Mainmap from './Maps/Mainmap';
import PreviewMap from './Maps/PreviewMap';

// Feature
import ListSelector from './Controls/ListSelector';
import Synthesizer from './Controls/Synthesizer';
import MLSetup from './Controls/MLSetup';

// UI
import Toggle from './Interface/Toggle';
import Loading from './Loading';
import Navbar from './Interface/Navbar';
import RunButton from './Interface/RunButton';

// ____________________________________APP____________________________________

function DashApp (){
	// To Do : useMemo hook for improving performance for the functions that are heavy

	//Fetching data
	const fetchUrl =
		'https://raw.githubusercontent.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/main/Data%20Pipeline/hexagon_collection_master.geojson';

	const [ data, setData ] = useState(null);

	async function getData (){
		axios
			.get(fetchUrl)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}
	useEffect(() => {
		getData();
	}, []);

	// State for getting user selected feture which will be passed to maps
	const [ userSelected, setUserSelected ] = useState();

	// state for maps
	const [ userClicked, setUserClicked ] = useState(false);

	// state for toggle between table and viz
	const [ checkedMain, setCheckedMain ] = React.useState(false);
	const toggleCheckedMain = () => {
		setCheckedMain((prev) => !prev);
	};

	// State for getting number of clusters

	const [ clusterNum, setClusterNum ] = useState(null);

	// Sate for getting features user selected for running the model
	const [ userFeatures, setUserFeatures ] = useState(null);
	let userFeaturesOriginal = null;
	if (userFeatures !== null) {
		userFeaturesOriginal = userFeatures.map((feature) => feature.replace(/ /g, '_'));
	}

	// State for submit

	const [ userSubmit, setUserSubmit ] = useState(false);
	const toggleSubmit = () => {
		setUserSubmit((prev) => !prev);
	};
	// ML api request object
	let mlRequest = {
		features: [],
		cluster: null
	};
	// updating ML request object
	mlRequest.features = userFeaturesOriginal;
	mlRequest.cluster = clusterNum;

	// Sending POST request to ML API using axios

	useEffect(
		() => {
			console.log('axios');
			let mlApiUrl = '/Ml';
			axios
				.post('mlApiUrl', mlRequest)
				.then(function (response){
					console.log(response);
				})
				.catch(function (error){
					console.log(error);
				});
		},
		[ userSubmit ]
	);

	// //Getting parent components refs to pass as prop div height to list component for maxHeight argument
	// const [ divHeight, setDivHeight ] = useState(null);
	// const listDivRef = useRef(null);
	// //Reading heigh after it's rendered
	// useEffect(() => {
	// 	setDivHeight(listDivRef.current.offsetHeight);
	// }, []);

	return (
		<div className='App'>
			{
				data !== null ? <div class='containerDash'>
					{/* ------------------ NavBar ------------------*/}
					<nav className='navDash generalComp'>
						<Navbar />
					</nav>

					{/*  ------------------Map History Browser ------------------  */}
					<div className='mainDash generalComp'>
						<Synthesizer />
					</div>

					{/*  ------------------ Data Selector ------------------ */}

					<div className='sidebarDash generalComp'>
						<ListSelector
							dataProps={data}
							methodProps={setUserSelected}
							featureProps={setUserFeatures}
						/>
					</div>

					{/*  ------------------ Map Preview ------------------*/}
					<div className='content4 generalComp'>
						<h5 style={{ margin: '5px' }}> Feature Preview </h5>
						<span>
							<PreviewMap
								dataProps={data}
								userSelectedItems={userSelected}
								userClickedProp={userClicked}
							/>
						</span>
					</div>
					{/* ------------------ Main Map ------------------*/}
					<div className='content5 generalComp'>
						<h5 style={{ margin: '5px' }}> Model View </h5>
						<span>
							<Mainmap
								dataProps={data}
								userSelectedItems={userSelected}
								userClickedProp={userClicked}
							/>
						</span>
					</div>

					{/* ------------------ Mix Viz ------------------*/}
					<div className='content6 generalComp'>
						<iframe
							src='https://public.domo.com/cards/bWxVg'
							width='100%'
							height='600'
							align='center'
							marginheight='0'
							marginwidth='0'
							frameborder='0'
						/>

						{/* <div style={{ height: '100%', width: '33%', flexGrow: '1' }} />
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }} />
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }} /> */}
					</div>

					{/* ------------------ Machine Learning Control ------------------*/}
					<div className='content8 generalComp'>
						<MLSetup setClusterNumProp={setClusterNum} />
						<RunButton userSubmit={toggleSubmit} />
					</div>

					{/* ----------- Data Table /Viz ------------------ */}
					<div className='content7 generalComp'>
						<Toggle
							style={{ margin: '5px' }}
							toggleProps={toggleCheckedMain}
							checkedProps={checkedMain}
						/>
						{
							checkedMain === false ? <div>
								<WorldTable dataProps={data} />
							</div> :
							<div style={{ height: '100%' }}>
								<PieViz />
							</div>}
					</div>
				</div> :
				// Loading
				<div
					style={{
						height: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Loading />
				</div>}
		</div>
	);
}

export default DashApp;
