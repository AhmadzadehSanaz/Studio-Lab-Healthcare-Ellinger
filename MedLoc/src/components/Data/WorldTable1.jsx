import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class WorldTable1 extends React.Component {
	constructor (props) {
		super(props);
		this.tableRef = React.createRef();
	}
	state = {
		stats: [],
		loading: false
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
						padding: '1px'
					}
				},
				MUIDataTableBodyCell: {
					root: {
						backgroundColor: 'inherit',
						padding: '0px'
					}
				}
			}
		});

	componentDidMount () {
		this.setState({ loading: true });
		fetch('https://corona.lmao.ninja/v2/countries') //data source
			.then((response) => response.json())
			.then((res) => {
				this.setState({ stats: res, loading: false }, () => console.log(res));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render () {
		return (
			<React.Fragment>
				<div style={{ marginLeft: '5px', marginRight: '5px' }}>
					<br />

					<MuiThemeProvider theme={this.getMuiTheme()}>
						<MUIDataTable
							title={
								<h6 style={{ float: 'left', color: '#383838' }}>Data Explorer</h6>
							}
							isLoading={this.state.loading}
							columns={[
								{
									name: 'country',
									label: 'Country'
								},
								{
									name: 'cases',
									label: 'Total Cases'
								},
								{
									name: 'todayCases',
									label: 'Current Cases'
								},
								{
									name: 'deaths',
									label: 'Total Deaths'
								},
								{
									name: 'todayDeaths',
									label: 'Current Deaths'
								},
								{
									name: 'recovered',
									label: 'Recovered Patients'
								},
								{
									name: 'active',
									label: 'Active Cases'
								},
								{
									name: 'critical',
									label: 'Critical Patients'
								}
							]}
							data={this.state.stats}
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
						<div>{console.log(this.state.stats, 'roghie')}</div>
					</MuiThemeProvider>
				</div>
			</React.Fragment>
		);
	}
}

export default WorldTable1;
