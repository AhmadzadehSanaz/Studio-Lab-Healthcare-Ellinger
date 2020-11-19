import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import MarkerCluster from 'leaflet.markercluster';
import LeafletDraw from 'leaflet-draw';
import LeafletHeat from 'leaflet.heat';
import Legend from './Legend';
const Map = (props) => {
	const mapRef = useRef(null);
	const geojsonLayer = React.useRef(null);
	const editableLayer = React.useRef(null);
	const layerControl = React.useRef(null);
	useEffect(() => {
		let grey = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 20,
				attribution: ' <a href="https://stadiamaps.com/">Stadia Maps</a>; '
			}
		);
		// .addTo(mapRef.current);

		var mapInk = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			attribution: '<a href="https://stadiamaps.com/">Stadia Maps</a>; '
		});

		mapRef.current = L.map('map', {
			center: [ 0, 0 ],
			zoom: 2,
			layers: [ grey, mapInk ]
		});

		var baseMaps = {
			Grayscale: grey,
			Streets: mapInk
		};

		layerControl.current = L.control.layers(baseMaps).addTo(mapRef.current);

		//  mapRef.current.addControl(drawControl);
	}, []);

	return <div id='map' style={{ width: '100%', height: '100%' }} />;
};

export default Map;
