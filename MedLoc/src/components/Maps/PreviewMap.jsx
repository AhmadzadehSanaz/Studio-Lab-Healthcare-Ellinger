/* eslint-disable no-unreachable */
import React, { useState, useEffect, useRef } from "react";

import { Map, GeoJSON, TileLayer, LayersControl } from "react-leaflet";
import FeatureName from "./Legend";
import HighlightedGeoJson from "./HighlightedGeoJson";
import * as ss from "simple-statistics";
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
	let type = typeof columnValues[0];
	let colorScale;
	if (type !== "string") {
		let colorsBrewer = [
			"#f6eff7",
			"#d0d1e6",
			"#a6bddb",
			"#67a9cf",
			"#3690c0",
			"#02818a",
			"#016450"
		];
		let groups = ss.ckmeans(columnValues, 7);
		let breaks = groups.map((cluster) => {
			return cluster[0];
		});

		//Quant Breaks
		colorScale = d3.scaleQuantile().domain(breaks).range(colorsBrewer);
	} else {
		console.log(d3.schemeCategory10);
		let values = new Set(columnValues);
		colorScale = d3.scaleOrdinal().domain(values).range(d3.schemeCategory10);
	}

	// let extent = d3.extent(columnValues);
	// //Linear breaks
	// let colorScale = d3.scaleLinear().domain(d3.extent(columnValues)).range([ "coral", "blue" ]);
	// let colorScaleCategorical = d3
	// 	.scaleLinear()
	// 	.domain(d3.extent(columnValues))
	// 	.range([ "coral", "blue" ]);

	//Coloring each feature based on the user selected values from the list selector
	function styles (feature){
		return {
			fillColor: colorScale(feature.properties[columnName]),

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
