import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-resizable/css/styles.css';

import '../styles/dashStyle.css';

import WorldTable from './WorldTable';
import Covidmap from './Covidmap';
import Viz from './Viz';
import Vizz from './Vizz';

// Handles the responsive nature of the grid
const ResponsiveGridLayout = WidthProvider(Responsive);
// Determines the screen breakpoints for the columns
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 };
// How many columns are available at each breakpoint
const cols = { lg: 4, md: 4, sm: 1, xs: 1, xxs: 1 };

function Covid19(){
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
			<div className='w-full'>
				<header className='flex bg-gray-900 m-5 p-5 shadow-lg rounded-lg'>
					<h1 className='text-2xl text-teal-400'>Collaborative Health Dashboard</h1>
				</header>

				<ResponsiveGridLayout className='my-5 mx-8' breakpoints={breakpoints} cols={cols}>
					<div className='grid-cell' key='1' data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
						<h3 className='grid-header'>Main Map</h3>
						<Covidmap />
					</div>

					<div className='grid-cell' key='2' data-grid={{ x: 2, y: 0, w: 2, h: 3 }}>
						<h3 className='grid-header'>Data Insight</h3>
						<WorldTable />
					</div>
					<div className='grid-cell' key='3' data-grid={{ x: 0, y: 3, w: 1, h: 2 }}>
						<h3 className='grid-header'>Data Table</h3>
						{/* <Vizz /> */}
						<Viz />
					</div>
					<div className='grid-cell' key='4' data-grid={{ x: 2, y: 3, w: 3, h: 2 }}>
						<h3 className='grid-header'>Analysis</h3>
						<Viz />
					</div>
					<div className='grid-cell' key='5' data-grid={{ x: 0, y: 0, w: 2, h: 3 }}>
						<h3 className='grid-header'>Main Map</h3>
						<Covidmap />
					</div>
				</ResponsiveGridLayout>
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
