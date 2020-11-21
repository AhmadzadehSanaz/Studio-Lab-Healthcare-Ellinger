import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class WorldTable extends React.Component {
	constructor (props) {
		super(props);
		this.tableRef = React.createRef();
	}
	state = {
		stats: [],
		loading: false,
		columns: [],
		dataState: []
	};

	getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MUIDataTable: {
					root: {
						backgroundColor: 'red'
					},
					paper: {
						boxShadow: 'none'
					}
				},
				MUIDataTableBodyCell: {
					root: {
						backgroundColor: 'inherit',
						padding: '3px',
						textAlign: 'center'
					}
				}
			}
		});

	componentDidMount () {
		this.setState({ loading: true });

		// this.setState({ stats: this.props.dataProps.features, loading: false });

		let listItems = [];
		let dataItems = [];
		let dataPopulator = this.props.dataProps.features;
		if (dataPopulator !== null) {
			for (var key in dataPopulator) {
				if (dataPopulator.hasOwnProperty(key)) {
					let firstProp = dataPopulator[key];
					listItems = Object.keys(firstProp.properties);
					dataItems.push(firstProp.properties);
				}
			}
		}

		let columnValues = listItems.map((f) => ({ name: f, label: f }));

		this.setState({ columns: columnValues, loading: false });
		this.setState({ dataState: dataItems, loading: false });
	}

	render () {
		return (
			<React.Fragment>
				<div style={{ marginLeft: '5px', marginRight: '5px' }}>
					<br />

					<MuiThemeProvider theme={this.getMuiTheme()}>
						<MUIDataTable
							title={
								<h4 style={{ float: 'left', color: '#383838' }}>Data Explorer</h4>
							}
							isLoading={this.state.loading}
							columns={this.state.columns}
							data={this.state.dataState}
							options={{
								filter: true,

								rowHover: true,
								downloadOptions: { filename: 'CustomDownload.csv', separator: ',' },
								filterType: 'dropdown',
								selectableRows: true,
								responsive: 'stacked',
								tableBodyHeight: '300px',
								draggableColumns: { enabled: true, transitionTime: 300 },
								rowsPerPageOptions: [ 5, 10, 50 ],
								rowsPerPage: 5
							}}
						/>
						<div>{console.log(this.state.dataState, 'zahra')}</div>
					</MuiThemeProvider>
				</div>
			</React.Fragment>
		);
	}
}

export default WorldTable;
