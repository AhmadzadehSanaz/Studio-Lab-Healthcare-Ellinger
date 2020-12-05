import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

class Legend extends MapControl {
	createLeafletElement (props) {}

	componentDidMount () {
		// get color depending on population density value

		function getColor (d){
			var color;
			if (d > 1000) {
				color = "#800026";
			} else if (d > 500) {
				color = "#BD0026";
			} else if (d > 200) {
				color = "#E31A1C";
			} else if (d > 100) {
				color = "#FC4E2A";
			} else if (d > 50) {
				color = "#FD8D3C";
			} else color = "#FEB24C";
			return color;
		}

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
		let mamad = split(100, 200, 5);

		const legend = L.control({ position: "topright" });

		legend.onAdd = () => {
			const div = L.DomUtil.create("div", "info legend");
			const grades = [
				this.props.extentProps,
				this.props.extentProps,
				this.props.extentProps
			];
			let labels = [];
			let from;
			let to;

			for (let i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' +
						getColor(from + 1) +
						'"></i> ' +
						from +
						(
							to ? "&ndash;" + to :
							"+")
				);
			}

			div.innerHTML = labels.join("<br>");
			return div;
		};

		const { map } = this.props.leaflet;
		legend.addTo(map);
	}
}

export default withLeaflet(Legend);
