import React, { useEffect, useState, useRef } from 'react';
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
	//Getting parent componets refs to pass as prop div height to list componet for maxHeight argument
	const [ divHeight, setDivHeight ] = useState(null);
	const listDivRef = useRef(null);
	//Reading heigh after it's rendered
	useEffect(() => {
		setDivHeight(listDivRef.current.offsetHeight);
	});

	return (
		<div className='App'>
			<div class='containerDash'>
				<nav className='navDash'>Navbar</nav>

				<div className='mainDash'>
					<span>
						<Covidmap />
					</span>
				</div>

				<div className='sidebarDash' ref={listDivRef}>
					<ListBrowser map={divHeight} />
				</div>

				<div className='content1'>
					<span>
						<Covidmap />
					</span>
				</div>

				<div className='content2' ref={listDivRef}>
					<ListBrowser map={divHeight} />
				</div>

				<div className='content4'>container4</div>

				<div className='content3'>
					<WorldTable />
					{/* <Vizz /> */}
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
	);
}

export default Covid19;
