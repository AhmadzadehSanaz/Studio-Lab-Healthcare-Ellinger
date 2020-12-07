/* eslint-disable no-unreachable */
import React, { useState, useEffect, useRef } from "react";

import { Map, GeoJSON, TileLayer, LayersControl } from "react-leaflet";

import * as ss from "simple-statistics";
import * as d3 from "d3";
import L from "leaflet";

function PreviewMap (props){
	//getting the first object from geojson to extract column names

	let dataPostulator = props.dataProps.features;
	const geojson = useRef();
	const legend = useRef(null);
	const map = useRef();
	const featureName = useRef(null);

	// if (dataPostulator !== null) {
	// 	for (var key in dataPostulator) {
	// 		if (dataPostulator.hasOwnProperty(key)) {
	// 			// getting all the feature names
	// 			let firstProp = dataPostulator[key];
	// 			let listItems = Object.keys(firstProp.properties);

	// 			break;
	// 		}
	// 	}
	// }

	//Getting the values from the feature and defining color ranges
	let columnName = props.userSelectedItems; //user selected feature on the feature selection
	let columnNameClean = columnName.replace(/_/g, " "); //prettifying selected feature name
	// getting all the values for the selected feature
	let columnValues = dataPostulator.map((f) => f.properties[columnName]);
	let type = typeof columnValues[0];
	let breaks;
	let colorScale;

	// checking if the values for selected feature are string or number
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
		//clustering the values for configuring the natural brakes
		let groups = ss.ckmeans(columnValues, 7);

		breaks = groups.map((cluster) => {
			return cluster[0];
		});

		//Quant Breaks
		colorScale = d3.scaleQuantile().domain(breaks).range(colorsBrewer);
	} else {
		// string values color range determination

		breaks = new Set(columnValues); //getting set of the string values for the selected feature
		colorScale = d3.scaleOrdinal().domain(breaks).range(d3.schemeCategory10);
	}

	//Coloring each feature based on the user selected values from the list selector
	//this function runs for every geojson cell
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

	//Map center on load
	const center = [ 41.8781, -87.6298 ];

	useEffect(
		() => {
			if (geojson.current) {
				// using useRef to and setting it to leaflet component on the app
				// then looping through each feature and adding pop ups here we are using leaflet core functions
				geojson.current.leafletElement.eachLayer(function (layer){
					// console.log(layer);
					layer.bindPopup(`${columnName} : ${layer.feature.properties[columnName]}`);
				});
				// checking if there is already a legend exists and removing before adding an updated legend
				if (legend.current !== null) {
					map.current.leafletElement.removeControl(legend.current);
				}
				// checking if there is already a feature name exists and removing before adding an updated feature name

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

					let labels = [];
					let from;
					let to;

					breaks = Array.from(breaks);
					// getting the first 7 breaks to visulise them on the legend
					let breaksCopy = Array.from(breaks).slice(0, 7);

					if (breaks > 7 && type === "string") {
						//if values are strings we push the the additional feature to map as others..
						breaksCopy.push("Others...");
					}
					for (let i = 0; i < breaksCopy.length; i++) {
						//some checks to determine the best way to visualize  the given data on the legend
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
