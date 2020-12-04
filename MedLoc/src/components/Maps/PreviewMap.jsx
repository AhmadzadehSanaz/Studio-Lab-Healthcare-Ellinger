/* eslint-disable no-unreachable */
import React, { useState, useEffect, useRef } from "react";

import { Map, GeoJSON, TileLayer, LayersControl } from "react-leaflet";
import FeatureName from "./Legend";
import HighlightedGeoJson from "./HighlightedGeoJson";
import * as d3 from "d3";

function PreviewMap (props){
	//getting the first object from geojson to extract column names

	let dataPopulator = props.dataProps.features;
	const geojson = useRef();

	if (dataPopulator !== null) {
		for (var key in dataPopulator) {
			if (dataPopulator.hasOwnProperty(key)) {
				let firstProp = dataPopulator[key];
				let listItems = Object.keys(firstProp.properties);

				// let listValue = Object.values(firstProp.properties);

				break;
			}
		}
	}

	//Getting the values from the feature and defining color ranges
	let columnName = props.userSelectedItems;

	let columnValues = dataPopulator.map((f) => f.properties[columnName]);
	const setValues = new Set(columnValues);

	let legendValues = d3.extent(columnValues);
	//Linear breaks
	let colorScale = d3.scaleLinear().domain(d3.extent(columnValues)).range([ "coral", "blue" ]);
	let colorScaleCategorical = d3
		.scaleLinear()
		.domain(d3.extent(columnValues))
		.range([ "coral", "blue" ]);

	let colors;
	let tempExtent = d3.extent(columnValues);
	if (tempExtent !== undefined) {
		colors = split(tempExtent[0], tempExtent[1], 5);
	}
	//Quant Breaks
	let colorScaleQuant = d3
		.scaleQuantize()
		.domain(colors)
		.range([ "coral", "green", "blue", "yellow", "blue" ]);

	function split (left, right, parts){
		var result = [],
			delta = (right - left) / (parts - 1);
		while (left < right) {
			result.push(left);
			left += delta;
		}
		result.push(right);
		return result;
	}

	//Coloring each feature based on the user selected values from the list selector
	function styles (feature){
		return {
			fillColor: colorScaleQuant(feature.properties[columnName]),

			weight: 0,
			opacity: 1,
			color: "white",
			dashArray: "3",
			fillOpacity: 1
		};
	}

	//Leaflet Components
	const { BaseLayer, Overlay } = LayersControl;

	//Map center on load
	const center = [ 41.8781, -87.6298 ];

	useEffect(
		() => {
			if (geojson.current) {
				geojson.current.leafletElement.eachLayer(function (layer){
					// console.log(layer);
					layer.bindPopup(`${columnName} : ${layer.feature.properties[columnName]}`);
				});
			}
		},
		[ columnName ]
	);

	// WIP Section end ____________________________________

	return (
		<Map
			attributionControl={false}
			center={center}
			zoom={10}
			style={{ height: "100%", width: "100%" }}>
			<LayersControl position='topright'>
				<BaseLayer checked name='OSM'>
					<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
				</BaseLayer>
				<BaseLayer checked name='MapBox'>
					<TileLayer url='https://api.mapbox.com/styles/v1/aradnia/ckfcn7zq20mfb19mswcdnhd6u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJhZG5pYSIsImEiOiJjanlhZDdienQwNGN0M212MHp3Z21mMXhvIn0.lPiKb_x0vr1H62G_jHgf7w' />
				</BaseLayer>
			</LayersControl>
			<GeoJSON ref={geojson} data={props.dataProps} style={styles} />
		</Map>
	);
}
export default PreviewMap;
