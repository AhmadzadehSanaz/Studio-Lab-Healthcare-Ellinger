import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-resizable/css/styles.css';

import '../styles/dashStyle.css';

import WorldTable from './WorldTable';
import Covidmap from './Covidmap';
import Viz from './Viz';
import Vizz from './Vizz';
import ListBrowser from './ListBrowser';

import axios from 'axios';

function Covid19(){
	const [ map, setMap ] = useState(null);

	useEffect(() => {
		axios
			.get(
				'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740'
			)
			.then((res) => {
				console.log(res.data);
				setMap(res.data);
			});

		// let ignore = false;

		// async function fetchData(){
		// 	const result = await axios(
		// 		'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740'
		// 	);
		// 	if (!ignore) {
		// 		let jsonized = result.data;
		// 		console.log(jsonized);
		// 		setMap(features);
		// 	}
		// }

		// fetchData();
		// return () => {
		// 	ignore = true;
		// };
	}, []);

	// const loadData = () => {
	// 	let tempdata;
	// 	fetch(
	// 		'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740'
	// 	)
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setCountries(data);

	// 		});
	// };

	return (
		<div className='App'>
			<div class='containerDash'>
				<nav className='navDash'>Navbar</nav>
				<div className='mainDash'>
					<span>
						<Covidmap />
					</span>
				</div>
				<div className='sidebarDash'>
					<ListBrowser />
				</div>
				<div className='content1'>
					{' '}
					<span>
						<Covidmap />
					</span>
				</div>
				<div className='content2'>
					<Viz />
				</div>

				<div className='content4'>kir</div>
				<div className='content3'>
					<WorldTable />
				</div>
				<footer
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
						<Viz />
					</div>
					<div style={{ height: '100%', width: '33%', flexGrow: '1' }}>
						<Viz />
					</div>
				</footer>
			</div>
		</div>

		// <div>
		// 	<div style={{ display: 'flex' }}>
		// 		<Covidmap />
		// 		<div style={{ height: '300px' }}>
		// 			<Viz />
		// 		</div>

		// 		<WorldTable />
		// 	</div>
		/* <div>{countries.length === 0 ? (<Loading />) : (<div><Covidmap countries={countries} /> <Legend /></div>)}</div > */
		// </div>
	);
}

export default Covid19;
