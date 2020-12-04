import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

class FeatureName extends MapControl {
	createLeafletElement (props) {}

	componentDidMount () {
		// get color depending on population density value

		const legend = L.control({ position: "bottomright" });

		const { map } = this.props.leaflet;
		legend.addTo(map);
	}
}

export default withLeaflet(FeatureName);
