/* eslint-disable no-unreachable */
import React, { useState, useEffect } from 'react';
import { Map, GeoJSON, TileLayer, LayersControl } from 'react-leaflet';
import Legend from './Legend';

import * as d3 from 'd3';

import axios from 'axios';
function Mainmap (props){
	//getting the first object from geojson to extract column names

	let dataPopulator = props.dataProps.features;

	if (dataPopulator !== null) {
		for (var key in dataPopulator) {
			if (dataPopulator.hasOwnProperty(key)) {
				let firstProp = dataPopulator[key];
				let listItems = Object.keys(firstProp.properties);
				let listValue = Object.values(firstProp.properties);

				break;
			}
		}
	}

	let columnName = 'nearest_park_distance';
	let columnValues = dataPopulator.map((f) => f.properties[columnName]);

	console.log(d3.extent(columnValues), 'd3');

	let colorScale = d3.scaleLog().domain(d3.extent(columnValues)).range([ 'coral', 'blue' ]);
	let colorScaleQuant = d3
		.scaleQuantize()
		.domain([ 20, 200, 400, 800 ])
		.range([ 'coral', 'green', 'blue', 'yellow', 'blue' ]);

	function getColor (d){
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
			color = '#FD8D3C';
		} else color = '#FEB24C';
		return color;
	}
	function styles (feature){
		return {
			fillColor: colorScale(+feature.properties[columnName]),

			weight: 0,
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
		// layer.options.fillColor = getColor(dataPopulator.no_of_people_no_health_insurance_sum);
		// 	country.properties.color;
		const name = hex.properties[columnName];
		// const confirmedText = hex.properties.confirmedText;
		layer.bindPopup(` ${columnName}, ${name}`);
	};

	return (
		<Map center={center} zoom={10} style={{ height: '93%', width: '100%' }}>
			{/* <LayersControl position='topright'> */}
			{/* <BaseLayer checked name='OSM'>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				</BaseLayer>
				<BaseLayer name='MapBox'>
					<TileLayer url='https://api.mapbox.com/styles/v1/aradnia/ckfcn7zq20mfb19mswcdnhd6u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJhZG5pYSIsImEiOiJjanlhZDdienQwNGN0M212MHp3Z21mMXhvIn0.lPiKb_x0vr1H62G_jHgf7w' />
				</BaseLayer> */}

			{/* </LayersControl> */}
			<GeoJSON data={props.dataProps} style={styles} onEachFeature={onEachHex} />
			<Legend />
		</Map>
	);
}
export default Mainmap;
