/* eslint-disable no-unreachable */
import React, { useState, useEffect } from 'react';
import { Map, GeoJSON, TileLayer, LayersControl } from 'react-leaflet';

import { features } from '../data/bound';
import axios from 'axios';
function PreviewMap(props){
	//getting the first object from geojson to extract column names

	let dataPopulator = props.dataProps.features;

	if (dataPopulator !== null) {
		for (var key in dataPopulator) {
			if (dataPopulator.hasOwnProperty(key)) {
				let firstProp = dataPopulator[key];
				let listItems = Object.keys(firstProp.properties);
				let listValue = Object.values(firstProp.properties);
				console.log(props.dataProps.features[0].properties, 'hamid');
				break;
			}
		}
	}

	function getColor(d){
		var color;
		if (d > 1000) {
			color = '#800026';
		} else if (d > 500) {
			color = '#BD0026';
		} else if (d > 200) {
			color = '#E31A1C';
		} else if (d > 100) {
			color = '#FC4E2A';
		} else if (d > 50) {
			color = '##FD8D3C';
		} else color = '##FEB24C';
		return color;
	}
	function style(dataPopulator){
		return {
			fillColor: getColor(dataPopulator.properties.density),
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7
		};
	}
	const mapStyle = {
		fillColor: 'white',
		weight: 1,
		color: 'black',
		fillOpacity: 1
	};
	const { BaseLayer, Overlay } = LayersControl;

	const center = [ 41.8781, -87.6298 ];

	const onEachHex = (hex, layer) => {
		layer.options.fillColor = 'red';
		// 	country.properties.color;
		const name = hex.properties.top;
		// const confirmedText = hex.properties.confirmedText;
		layer.bindPopup(` no_of_people_no_health_insurance_sum, ${name}`);
	};

	return (
		<Map center={center} zoom={10} style={{ height: '93%', width: '100%' }}>
			<LayersControl position='topright'>
				<BaseLayer checked name='OSM'>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				</BaseLayer>
				<BaseLayer name='MapBox'>
					<TileLayer url='https://api.mapbox.com/styles/v1/aradnia/ckfcn7zq20mfb19mswcdnhd6u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJhZG5pYSIsImEiOiJjanlhZDdienQwNGN0M212MHp3Z21mMXhvIn0.lPiKb_x0vr1H62G_jHgf7w' />
				</BaseLayer>
				<GeoJSON data={props.dataProps} style={mapStyle} onEachFeature={onEachHex} />
			</LayersControl>
		</Map>
	);
}
export default PreviewMap;
