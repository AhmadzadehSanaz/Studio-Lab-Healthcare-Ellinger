import React, { useState, useEffect } from 'react';
import Legend from './Legend';
import Covidmap from './Covidmap';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function Covid19(){
	const [ countriesProp, setCountries ] = useState(null);

	const url =
		'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740';

	const { data, error } = useSWR(url, { fetcher });

	const hex =

			data && !error ? data :
			[];

	setCountries(hex);

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

	useEffect(setCountries);

	return (
		<div>
			<div>
				<Covidmap countriesProp={countriesProp} />

				<Legend />
			</div>
			{/* <div>{countries.length === 0 ? (<Loading />) : (<div><Covidmap countries={countries} /> <Legend /></div>)}</div > */}
		</div>
	);
}

export default Covid19;
