/* eslint-disable no-unreachable */
import React, { useState, useEffect, useRef } from "react";

import { Map, GeoJSON, TileLayer, LayersControl } from "react-leaflet";
import FeatureName from "./Legend";
import HighlightedGeoJson from "./HighlightedGeoJson";
import * as ss from "simple-statistics";
import * as d3 from "d3";
import L from "leaflet";
import Legend from "./Legend";

function PreviewMap (props){
	//getting the first object from geojson to extract column names

	let dataPopulator = props.dataProps.features;
	const geojson = useRef();
	const legend = useRef(null);
	const map = useRef();
	const featureName = useRef(null);

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
	let columnNameClean = columnName.replace(/_/g, " ");

	let columnValues = dataPopulator.map((f) => f.properties[columnName]);
	let type = typeof columnValues[0];
	let breaks;
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
		breaks = groups.map((cluster) => {
			return cluster[0];
		});

		//Quant Breaks
		colorScale = d3.scaleQuantile().domain(breaks).range(colorsBrewer);
	} else {
		breaks = new Set(columnValues);
		colorScale = d3.scaleOrdinal().domain(breaks).range(d3.schemeCategory10);
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
				// map.current.leafletElement.eachLayer((layer) => {
				// 	console.log(layer);
				// });
				if (legend.current !== null) {
					map.current.leafletElement.removeControl(legend.current);
				}
				if (featureName.current !== null) {
					map.current.leafletElement.removeControl(featureName.current);
				}

				legend.current = L.control({ position: "topright" });
				featureName.current = L.control({ position: "topright" });

				featureName.current.onAdd = () => {
					const div = L.DomUtil.create("div", "info titleMap");
					div.innerHTML = `<p> ${columnNameClean}</p>`;
					return div;
				};

				legend.current.onAdd = () => {
					const div = L.DomUtil.create("div", "info legend");
					// const grades = [
					// 	this.props.extentProps,
					// 	this.props.extentProps,
					// 	this.props.extentProps
					// ];
					let labels = [];
					let from;
					let to;
					breaks = Array.from(breaks);
					let breaksCopy = Array.from(breaks).slice(0, 7);
					if (breaks > 7 && type === "string") {
						breaksCopy.push("Others...");
					}
					for (let i = 0; i < breaksCopy.length; i++) {
						if (type === "number") {
							let isinteger = breaksCopy[i] % 1 === 0;
							from =
								isinteger ? breaksCopy[i] :
								breaks[i].toFixed(2);
							to =
								breaksCopy[i + 1] ? isinteger ? breaksCopy[i + 1] :
								breaksCopy[i + 1].toFixed(2) :
								breaksCopy[i + 1];
						} else {
							console.log(breaksCopy);
							from =

									breaksCopy[i].length > 20 ? `${breaksCopy[i].slice(0, 20)}...` :
									breaksCopy[i];
							to = undefined;
						}

						labels.push(
							'<i style="background:' +
								colorScale(breaksCopy[i]) +
								'"></i> ' +
								from +
								(
									to ? " &ndash; " + to :
									type !== "string" ? "+" :
									"")
						);
					}

					div.innerHTML = labels.join("<br>");
					return div;
				};
				featureName.current.addTo(map.current.leafletElement);
				legend.current.addTo(map.current.leafletElement);
			}
		},
		[ columnName ]
	);

	// WIP Section end ____________________________________

	return (
		<Map
			attributionControl={false}
			ref={map}
			center={center}
			zoom={10}
			style={{ height: "100%", width: "100%" }}>
			<TileLayer url='https://api.mapbox.com/styles/v1/aradnia/ckfcn7zq20mfb19mswcdnhd6u/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJhZG5pYSIsImEiOiJjanlhZDdienQwNGN0M212MHp3Z21mMXhvIn0.lPiKb_x0vr1H62G_jHgf7w' />

			<GeoJSON ref={geojson} data={props.dataProps} style={styles} />
		</Map>
	);
}
export default PreviewMap;
