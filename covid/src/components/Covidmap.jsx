import React, { useState, useEffect } from 'react';
import { Map, GeoJSON, TileLayer, LayersControl } from 'react-leaflet';

import { features } from '../data/bound';

function Covidmap(){
	const [ map, setMap ] = useState(features);

	// useEffect(() => {
	// 	let ignore = false;

	// 	async function fetchData(){
	// 		const result = await axios(
	// 			'https://cdn.glitch.com/748630ea-d707-440c-b84a-700982a6ab90%2Fhextest%20-%20Copy.json?v=1603727824740'
	// 		);
	// 		if (!ignore) {
	// 			let jsonized = result.data;
	// 			setMap(jsonized);
	// 		}
	// 	}

	// 	fetchData();
	// 	return () => {
	// 		ignore = true;
	// 	};
	// }, []);

	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 1
	};
	const { BaseLayer, Overlay } = LayersControl;

	const center = [ 41.8781, -87.6298 ];

	// const onEachCountry = (country, layer) => {
	// 	// layer.options.fillColor =
	// 	// 	country.properties.color;
	// 	const name = country.properties.ADMIN;
	// 	const confirmedText = country.properties.confirmedText;
	// 	layer.bindPopup(`${name} ${confirmedText}`);
	// };

	// console.log(countriesProp);

	return (
		// <Map style={{ height: '50vh', width: '50%' }} zoom={10} center={[ 41.8781, -87.6298 ]}>
		// 	<TileLayer
		// 		url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		// 		attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
		// 	/>
		// 	<div>{console.log(map)} </div>
		// 	<GeoJSON data={map} style={mapStyle} />
		// </Map>

		<Map center={center} zoom={13} style={{ height: '450px', width: '900px' }}>
			<LayersControl position='topright'>
				<BaseLayer checked name='OpenStreetMap.Mapnik'>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
				</BaseLayer>
				<BaseLayer name='MapBox'>
					<TileLayer
						attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
						url='https://api.mapbox.com/styles/v1/aradnia/ckfcn7zq20mfb19mswcdnhd6u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJhZG5pYSIsImEiOiJjanlhZDdienQwNGN0M212MHp3Z21mMXhvIn0.lPiKb_x0vr1H62G_jHgf7w'
					/>
				</BaseLayer>
				<Overlay name='Neighborhoods'>
					<GeoJSON data={map} style={mapStyle} />
				</Overlay>
				<Overlay name='Hex'>
					<GeoJSON data={map} style={mapStyle} />
				</Overlay>

				<Overlay name='B'>
					<GeoJSON data={map} style={mapStyle} />
				</Overlay>
			</LayersControl>
		</Map>
	);
}
export default Covidmap;
