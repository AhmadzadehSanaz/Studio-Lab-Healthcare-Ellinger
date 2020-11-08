import React, { useState, useEffect } from 'react';
import { Map, GeoJSON, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Covidmap({ countriesProp }){
	// const url =
	// 	'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740';

	// const { data, error } = useSWR(url, { fetcher });

	// const hex =

	// 		data && !error ? data :
	// 		[];

	// const [ countriesProp, setCountries ] = useState(null);

	// useEffect(async () => {
	// 	const fetchJson = await fetch(
	// 		'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740'
	// 	);
	// 	const data = await fetchJson.json();
	// 	setCountries(data);
	// });

	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 1
	};

	// const onEachCountry = (country, layer) => {
	// 	// layer.options.fillColor =
	// 	// 	country.properties.color;
	// 	const name = country.properties.ADMIN;
	// 	const confirmedText = country.properties.confirmedText;
	// 	layer.bindPopup(`${name} ${confirmedText}`);
	// };

	// console.log(countriesProp);

	return (
		<Map style={{ height: '90vh' }} zoom={10} center={[ 41.8781, -87.6298 ]}>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
			/>

			<GeoJSON data={countriesProp} style={mapStyle} />
		</Map>
	);
}
export default Covidmap;
