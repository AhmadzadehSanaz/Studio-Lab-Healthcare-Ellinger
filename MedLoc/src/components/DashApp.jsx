// Libraries import

import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import "../styles/dashStyle.css";

// ____________________________________ Imports ____________________________________

//Data
import WorldTable from "./Data/WorldTable";

//Visualizations
import PieViz from "./Data/PieViz";
import BoxPlot from "./Data/Boxplot";
import Viz from "./Data/Viz";

// Maps
import Mainmap from "./Maps/Mainmap";
import PreviewMap from "./Maps/PreviewMap";

// Feature
import ListSelector from "./Controls/ListSelector";
import Synthesizer from "./Controls/Synthesizer";
import MLSetup from "./Controls/MLSetup";

// UI
import Toggle from "./Interface/Toggle";
import Loading from "./Loading";
import Navbar from "./Interface/Navbar";

// ____________________________________APP____________________________________

function DashApp (){
	// To Do : useMemo hook for improving performance for the functions that are heavy
	const stageCanvasRef = useRef(null);
	const [ divHeight, setDivHeight ] = useState("200px");

	useEffect(() => {
		// The 'current' property contains info of the reference:
		// align, title, ... , width, height, etc.
		if (stageCanvasRef.current) {
			setDivHeight(stageCanvasRef.current.offsetHeight);
			// let width  = stageCanvasRef.current.offsetWidth;
		}
	});

	//Fetching data
	const fetchUrl =
		"https://raw.githubusercontent.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/main/Data%20Pipeline/hexagon_collection_master.geojson";

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

	// State for getting user selected feature which will be passed to maps
	const [ userSelected, setUserSelected ] = useState("Preview_Map");
	console.log(userSelected, "mamad");

	// state for maps
	const [ userClicked, setUserClicked ] = useState(false);

	// state for toggle between table and viz
	const [ checkedMain, setCheckedMain ] = React.useState(false);
	const toggleCheckedMain = () => {
		setCheckedMain((prev) => !prev);
	};

	// Sate for getting features user selected for running the model
	const [ userFeatures, setUserFeatures ] = useState(null);

	// State for submit

	const [ userSubmit, setUserSubmit ] = useState(false);
	const toggleSubmit = () => {
		setUserSubmit((prev) => !prev);
	};

	// Sending POST request to ML API using axios

	const handleSubmit = (clusterNum, Features) => {
		let mlApiUrl = "http://medloc-api.herokuapp.com/get_cluster";
		// replacing space with _ for sending to serve
		let featuresToAPI = Features.map((item) => item.replace(/ /g, "_"));
		let mlRequest = {
			"selected features": featuresToAPI,
			"number of clusters": clusterNum
		};
		console.log(mlRequest);
		axios
			.post(mlApiUrl, JSON.stringify(mlRequest), {
				withCredentials: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			})
			.then(function (response){
				console.log(response);
			})
			.catch(function (error){
				console.log(error);
			});
	};

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
							handleSubmit={handleSubmit}
							userFeatures={userFeatures}
						/>
						<MLSetup handleSubmit={handleSubmit} userFeatures={userFeatures} />
					</div>

					{/*  ------------------ Map Preview ------------------*/}
					<div style={{ position: "relative" }} className='content4 generalComp'>
						<h6 style={{ marginTop: "5px", padding: "3px" }}> Preview Map </h6>
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
						<h6 style={{ margin: "5px", padding: "3px" }}> Model View </h6>
						<span>
							<Mainmap
								dataProps={data}
								userSelectedItems={userSelected}
								userClickedProp={userClicked}
							/>
						</span>
					</div>

					{/* ------------------ Mix Viz ------------------*/}
					<div
						className='content6 generalComp'
						style={{ display: "flex", flexDirection: "row" }}>
						<div style={{ height: "100%", width: "50%", flexGrow: "1" }}>
							{" "}
							{/* <BoxPlot /> */}
							<h6>mamad</h6>
						</div>
						<div style={{ height: "100%", width: "50%", flexGrow: "1" }}> </div>
					</div>

					{/* ------------------ Machine Learning Control ------------------*/}
					{/* <div className='content8 generalComp'>

					</div> */}

					{/* ----------- Data Table /Viz ------------------ */}
					<div className='content7 generalComp' id='tble' ref={stageCanvasRef}>
						<Toggle
							style={{ margin: "5px" }}
							toggleProps={toggleCheckedMain}
							checkedProps={checkedMain}
						/>
						{
							checkedMain === false ? <div>
								<WorldTable
									dataProps={data}
									userFeaturesProps={userFeatures}
									heightProp={divHeight}
								/>
							</div> :
							<div style={{ height: "95%" }}>
								<Viz />
							</div>}
					</div>
				</div> :
				// Loading
				<div
					style={{
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}>
					<Loading />
				</div>}
		</div>
	);
}

export default DashApp;
