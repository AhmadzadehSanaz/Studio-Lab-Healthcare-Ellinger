import React, { useEffect, useState, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-resizable/css/styles.css';
import axios from 'axios';
import '../styles/dashStyle.css';

//Components
import WorldTable from './WorldTable';
import Mainmap from './Mainmap';
import Viz from './Viz';
import Vizz from './Vizz';
import ListBrowser from './ListBrowser';
import LeafMap from './LeafMap';
import ListSelector from './ListSelector';
import Loading from './Loading';
import Navbar from './Navbar';
import PreviewMap from './PreviewMap';
import Synthesizer from './Synthesizer';
import MLSetup from './MLSetup';
import PieViz from './PieViz';
import MapTry from './MapTry';

function DashApp(){
	//Fetching data
	const fetchUrl =
		'https://cdn.glitch.com/ee654f05-3254-4edf-9144-7a785e41da36%2FmainData.geojson?v=1605449405761';

	const [ data, setData ] = useState(null);
	async function getData(){
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
						}}
					>
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
					}}
				>
					<Loading />
				</div>}
		</div>
	);
}

export default DashApp;
