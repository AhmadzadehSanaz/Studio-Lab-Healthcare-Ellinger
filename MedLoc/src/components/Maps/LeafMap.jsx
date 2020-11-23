import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import Legend from './Legend';
const Map = (props) => {
	const mapRef = useRef(null);
	const geojsonLayer = React.useRef(null);
	const editableLayer = React.useRef(null);
	const layerControl = React.useRef(null);

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
	// console.log(`${props.userSelectedItems[props.userSelectedItems.length - 1]}`, 'im in map');
	// console.log(typeof props.userSelectedItems, 'im in map');
	let mamad = String(props.userSelectedItems);
	let columnName = props.userSelectedItems;
	let columnValues = dataPopulator.map((f) => f.properties[columnName]);

	let colorScale = d3.scaleLog().domain(d3.extent(columnValues)).range([ 'coral', 'blue' ]);

	function styles (feature){
		return {
			fillColor: colorScale(+feature.properties[columnName]),

			weight: 0,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 1
		};
	}
	const onEachHex = (hex, layer) => {
		// layer.options.fillColor = getColor(dataPopulator.no_of_people_no_health_insurance_sum);
		// 	country.properties.color;
		const name = hex.properties[mamad];
		console.log(name, 'karim');
		// const confirmedText = hex.properties.confirmedText;
		layer.bindPopup(` ${mamad}, ${name}`);
	};

	useEffect(() => {
		let grey = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 20,
				attribution: ' <a href="https://stadiamaps.com/">Stadia Maps</a>; '
			}
		);
		// .addTo(mapRef.current);

		mapRef.current = L.map('map', {
			center: [ 0, 0 ],
			zoom: 2,
			layers: [ grey ]
		});

		var baseMaps = {
			Grayscale: grey
		};

		layerControl.current = L.control.layers(baseMaps).addTo(mapRef.current);

		//  mapRef.current.addControl(drawControl);
	}, []);

	return <div id='map' style={{ width: '100%', height: '100%' }} />;
};

export default Map;
