import React, { useEffect, useState, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import axios from 'axios';
import '../styles/dashStyle.css';

//Components
import WorldTable from './Data/WorldTable';
import Mainmap from './Maps/Mainmap';
import Viz from './Data/Viz';
import Vizz from './Data/Vizz';

import LeafMap from './Maps/LeafMap';
import ListSelector from './Controls/ListSelector';
import Loading from './Loading';
import Navbar from './Interface/Navbar';
import PreviewMap from './Maps/PreviewMap';
import Synthesizer from './Controls/Synthesizer';
import MLSetup from './Controls/MLSetup';
import PieViz from './Data/PieViz';

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

	// //Getting parent componets refs to pass as prop div height to list componet for maxHeight argument
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
						<ListSelector dataProps={data} />
					</div>

					{/*  ------------------ Map Preview ------------------*/}
					<div className='content4 generalComp'>
						<h6 style={{ margin: '5px' }}> Feature Preview </h6>
						<span>
							<PreviewMap dataProps={data} />
						</span>
					</div>
					{/* ------------------ Main Map ------------------*/}
					<div className='content5 generalComp'>
						<h6 style={{ margin: '5px' }}> Model View </h6>
						<span>
							<Mainmap dataProps={data} />
						</span>
					</div>

					{/* ------------------ Mix Viz ------------------*/}
					<div
						className='content6 generalComp'
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							alignContent: 'center'
						}}>
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }}>
							<Viz />
						</div>
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }}>
							<Vizz />
						</div>
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }}>
							<PieViz />
						</div>
					</div>

					{/* ------------------ Machine Learning Control ------------------*/}
					<div className='content8 generalComp'>
						<MLSetup />
					</div>

					{/* ------------------ Data Table ------------------ */}
					<div className='content7 generalComp'>
						<WorldTable dataProps={data} />
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
