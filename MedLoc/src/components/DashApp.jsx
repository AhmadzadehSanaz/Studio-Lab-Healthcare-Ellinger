import React, { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import '../styles/dashStyle.css';

//Data
import WorldTable from './Data/WorldTable';

//Visulisations
import PieViz from './Data/PieViz';

import Mainmap from './Maps/Mainmap';
import ListSelector from './Controls/ListSelector';
import Loading from './Loading';
import PreviewMap from './Maps/PreviewMap';
import Synthesizer from './Controls/Synthesizer';
import MLSetup from './Controls/MLSetup';

import Toggle from './Interface/Toggle';
import Navbar from './Interface/Navbar';

function DashApp (){
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

	const [ userSelected, setUserSelected ] = useState();
	const [ userClicked, setUserClicked ] = useState(false);

	const [ checkedMain, setCheckedMain ] = React.useState(false);
	console.log(checkedMain, 'Main');

	const toggleCheckedMain = () => {
		setCheckedMain((prev) => !prev);
	};

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
						<ListSelector dataProps={data} methodProps={setUserSelected} />
					</div>

					{/*  ------------------ Map Preview ------------------*/}
					<div className='content4 generalComp'>
						<h6 style={{ margin: '5px' }}> Feature Preview </h6>
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
						<h6 style={{ margin: '5px' }}> Model View </h6>
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
						{/* <div style={{ height: '100%', width: '33%', flexGrow: '1' }} />
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }} />
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }} /> */}
					</div>

					{/* ------------------ Machine Learning Control ------------------*/}
					<div className='content8 generalComp'>
						<MLSetup />
					</div>

					{/* ------------------ Data Table ------------------ */}
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
						{/* <WorldTable dataProps={data} /> */}
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
