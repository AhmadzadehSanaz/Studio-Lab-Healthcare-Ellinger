import React, { useEffect, useState, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-resizable/css/styles.css';

import '../styles/dashStyle.css';

import WorldTable from './WorldTable';
import Covidmap from './Covidmap';
import Viz from './Viz';
import Vizz from './Vizz';
import ListBrowser from './ListBrowser';
import LeafMap from './LeafMap';
import ListSelector from './ListSelector';
import Loading from './Loading';
import axios from 'axios';

function Covid19(){
	//Fetching data
	const fetchUrl =
		'https://github.com/AhmadzadehSanaz/Studio-Lab-Healthcare-Ellinger/raw/main/Data%20Pipeline/hexagon_collection_master.geojson';

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
					<nav className='navDash'>Navbar</nav>

					{/*  ------------------ Main Map ------------------  */}
					<div className='mainDash'>
						<span>
							{' '}
							<Covidmap dataProps={data} />
						</span>
					</div>

					{/*  ------------------ Sidebar Dash ------------------ */}

					<div className='sidebarDash'>
						{' '}
						<ListBrowser />{' '}
					</div>

					{/* ------------------ Empty Container ------------------ */}
					<div className='content1'>
						<h6 style={{ color: 'red' }}> Hello</h6>{' '}
					</div>

					{/*  ------------------ Map Preview ------------------ */}

					<div className='content2'>
						<Covidmap dataProps={data} />
					</div>

					{/*  ------------------ Parallel Viz ------------------ */}
					<div
						className='content3'
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							alignContent: 'center'
						}}
					>
						<Vizz />
					</div>

					{/*  ------------------ Feature Selection ------------------*/}
					<div className='content4'>
						<ListSelector dataProps={data} />
					</div>

					{/* ------------------ Mix Data Viz ------------------*/}
					<div
						className='content5'
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
							<Viz />
						</div>
						<div style={{ height: '100%', width: '33%', flexGrow: '1' }}>
							<Viz />
						</div>
					</div>

					{/* ------------------ Empty Container ------------------*/}
					<div className='content6'> Content 6</div>
					{/* Data Viz */}
					{/* ------------------ Empty Container ------------------*/}
					<div className='content8'> Content 8</div>

					{/* ------------------ Data Table ------------------ */}
					<div className='content7'>
						{' '}
						<WorldTable />
					</div>
				</div> :
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

export default Covid19;
