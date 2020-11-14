import React, { useState, useEffect } from 'react';
import { Map, GeoJSON, TileLayer, LayersControl } from 'react-leaflet';

import { features } from '../data/bound';
import axios from 'axios';
function Covidmap(){
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

	return (
		<Map style={{ height: '100%', width: '100%' }} zoom={10} center={[ 41.8781, -87.6298 ]}>
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
		</Map>

		// <Map center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
		// 	<LayersControl position='topright'>
		// 		<BaseLayer checked name='OpenStreetMap.Mapnik'>
		// 			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
		// 		</BaseLayer>
		// 		<BaseLayer name='MapBox'>
		// 			<TileLayer url='https://api.mapbox.com/styles/v1/aradnia/ckfcn7zq20mfb19mswcdnhd6u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJhZG5pYSIsImEiOiJjanlhZDdienQwNGN0M212MHp3Z21mMXhvIn0.lPiKb_x0vr1H62G_jHgf7w' />
		// 		</BaseLayer>
		// 	</LayersControl>
		// </Map>
	);
}
export default Covidmap;
