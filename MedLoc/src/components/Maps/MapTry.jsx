import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Legend from './Legend';

class MapLeaflet extends Component {
	render () {
		const position = [ 51.509, -0.03 ];
		return (
			<Map style={{ height: '93%' }} center={position} zoom={13}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
			</Map>
		);
	}
}

export default MapLeaflet;
