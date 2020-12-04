import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import equal from "fast-deep-equal";

class WorldTable extends React.Component {
	constructor (props) {
		super(props);
		this.tableRef = React.createRef();
	}
	state = {
		stats: [],
		loading: false,
		columns: [],
		dataState: [],
		height: 201
	};

	getInitialState () {
		return { state: 0 };
	}

	componentDidMount () {
		const height = document.getElementById("tble").clientHeight;
		this.setState({ height });
	}
	getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MUIDataTable: {
					root: {
						backgroundColor: "red",
						margin: "dense",
						padding: "auto"
					},
					paper: {
						boxShadow: "none"
					}
				},
				MUIDataTableBodyCell: {
					root: {
						backgroundColor: "inherit",
						padding: "3px",
						textAlign: "center",
						margin: "dense"
					}
				},
				MUIDataTableToolbar: {
					root: {
						minHeight: "40px"
					}
				}
			}
		});

	render () {
		// Getting data and processing to format acceptable by table
		let listItems = []; //column names
		let dataItems = []; //processed data

		let dataPopulator = this.props.dataProps.features; //getting features from the main json
		if (dataPopulator !== null) {
			for (var key in dataPopulator) {
				if (dataPopulator.hasOwnProperty(key)) {
					let firstProp = dataPopulator[key];
					listItems = Object.keys(firstProp.properties);
					dataItems.push(firstProp.properties);
				}
			}
		}

		let userFeaturesOriginal = [];
		if (this.props.userFeaturesProps !== null) {
			userFeaturesOriginal = this.props.userFeaturesProps.map((feature) =>
				feature.replace(/ /g, "_")
			);
		}
		// let columnValues1 = [ "fid" ];
		let columnValues = userFeaturesOriginal.map((f) => ({ name: f, label: f.slice(0, 20) }));
		columnValues.push("fid");

		columnValues.reverse();
		// console.log(columnValues);
		return (
			<React.Fragment>
				<div style={{ marginLeft: "5px", marginRight: "5px" }}>
					<br />

					<MuiThemeProvider theme={this.getMuiTheme()}>
						<MUIDataTable
							title={
								<h4 style={{ float: "left", color: "#383838" }}>Data Explorer</h4>
							}
							columns={columnValues}
							data={dataItems}
							options={{
								filter: true,

								rowHover: true,
								downloadOptions: { filename: "CustomDownload.csv", separator: "," },
								filterType: "dropdown",

								responsive: "stacked",
								tableBodyHeight: "27vh",
								draggableColumns: { enabled: true, transitionTime: 300 },
								rowsPerPageOptions: [ 5, 10, 50 ],
								rowsPerPage: 5,
								viewColumns: true
							}}
						/>
					</MuiThemeProvider>
				</div>
			</React.Fragment>
		);
	}
}

export default WorldTable;
