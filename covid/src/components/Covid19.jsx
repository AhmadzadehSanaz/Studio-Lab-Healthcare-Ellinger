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
import Loading from './Loading'
import axios from 'axios';

function Covid19(){
	//Fetching data
	const fetchUrl= 'https://cdn.glitch.com/ee654f05-3254-4edf-9144-7a785e41da36%2FmainData.geojson?v=1605449405761';

	const [ data, setData ] = useState(null);
	async function getShit(){axios.get(fetchUrl)
		.then(res => {
			setData(res.data)
		
			
		})
		.catch(err => {
			console.log(err.message);
			
		})} 
	useEffect(() => {getShit()
 
    }, []);

	// //Getting parent componets refs to pass as prop div height to list componet for maxHeight argument
	// const [ divHeight, setDivHeight ] = useState(null);
	// const listDivRef = useRef(null);
	// //Reading heigh after it's rendered
	// useEffect(() => {
	// 	setDivHeight(listDivRef.current.offsetHeight);
	// }, []);

	return (
		<div className='App'>{data !== null ?		<div class='containerDash'>
		{/* NavBar */}
		<nav className='navDash'>Navbar</nav>

		{/* Main Map  */}
		<div className='mainDash'>
			<span>
				{' '}
				<Covidmap dataProps={data}/>{' '}
			</span>
		</div>

		{/* Empty Container */}

		<div className='sidebarDash'>side bar dash</div>

		{/* Map preview */}
		<div className='content1' >
			Content 1
		</div>

		{/* Empty Container */}

		<div className='content2'>
			<Covidmap dataProps={data}/>
		</div>

		{/* Empty Container */}
		<div className='content3'>container3</div>

		{/* Feature Selector*/}
		<div className='content4'>
			{' '}
			<ListSelector dataProps={data}  />{' '}
		</div>

		{/* Data Viz*/}
		<div
			className='content5'
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				alignContent: 'center'
			}}
		>
			<Viz />
		</div>

		{/* Feature Selector*/}
		<div className='content6'> Content 6</div>
		{/* Data Viz */}
		{/* Feature Selector*/}
		<div className='content8'> Content 8</div>
		{/* Data Viz */}
		<div className='content7'>
			{' '}
			<WorldTable />
		</div>
		{/* Data Viz */}
	</div> :   <div style={{     height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}> <Loading />  </div>}
	
		</div>
	);
}

export default Covid19;
