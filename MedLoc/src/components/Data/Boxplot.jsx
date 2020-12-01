import React from 'react';
import {
	VictoryChart,
	VictoryZoomContainer,
	VictoryLine,
	VictoryBrushContainer,
	VictoryAxis,
	VictoryTheme,
	VictoryBoxPlot
} from 'victory';

class Boxplot extends React.Component {
	constructor () {
		super();
		this.state = {};
	}

	handleZoom (domain) {
		this.setState({ selectedDomain: domain });
	}

	handleBrush (domain) {
		this.setState({ zoomDomain: domain });
	}

	render () {
		return (
			<div>
				{/* <VictoryChart
					width={550}
					height={300}
					scale={{ x: 'time' }}
					theme={VictoryTheme.material}
					containerComponent={
						<VictoryZoomContainer
							responsive={false}
							zoomDimension='x'
							zoomDomain={this.state.zoomDomain}
							onZoomDomainChange={this.handleZoom.bind(this)}
						/>
					}>
					<VictoryLine
						style={{
							data: { stroke: 'tomato' }
						}}
						data={[
							{ x: new Date(1982, 1, 1), y: 125 },
							{ x: new Date(1987, 1, 1), y: 257 },
							{ x: new Date(1993, 1, 1), y: 345 },
							{ x: new Date(1997, 1, 1), y: 515 },
							{ x: new Date(2001, 1, 1), y: 132 },
							{ x: new Date(2005, 1, 1), y: 305 },
							{ x: new Date(2011, 1, 1), y: 270 },
							{ x: new Date(2015, 1, 1), y: 470 }
						]}
					/>∫
				</VictoryChart>

				<VictoryChart
					theme={VictoryTheme.material}
					width={550}
					height={90}
					scale={{ x: 'time' }}
					padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
					containerComponent={
						<VictoryBrushContainer
							responsive={false}
							brushDimension='x'
							brushDomain={this.state.selectedDomain}
							onBrushDomainChange={this.handleBrush.bind(this)}
						/>
					}>
					<VictoryAxis
						tickValues={[
							new Date(1985, 1, 1),
							new Date(1990, 1, 1),
							new Date(1995, 1, 1),
							new Date(2000, 1, 1),
							new Date(2005, 1, 1),
							new Date(2010, 1, 1),
							new Date(2015, 1, 1)
						]}
						tickFormat={(x) => new Date(x).getFullYear()}
					/>
					<VictoryLine
						style={{
							data: { stroke: 'tomato' }
						}}
						data={[
							{ x: new Date(1982, 1, 1), y: 125 },
							{ x: new Date(1987, 1, 1), y: 257 },
							{ x: new Date(1993, 1, 1), y: 345 },
							{ x: new Date(1997, 1, 1), y: 515 },
							{ x: new Date(2001, 1, 1), y: 132 },
							{ x: new Date(2005, 1, 1), y: 305 },
							{ x: new Date(2011, 1, 1), y: 270 },
							{ x: new Date(2015, 1, 1), y: 470 }
						]}
					/>
				</VictoryChart> */}

				<VictoryChart
					domainPadding={20}
					width={500}
					height={400}
					theme={VictoryTheme.material}
					colorScale={'warm'}
					containerComponent={
						<VictoryZoomContainer
							responsive={false}
							zoomDimension='x'
							zoomDomain={this.state.zoomDomain}
							onZoomDomainChange={this.handleZoom.bind(this)}
						/>
					}>
					<VictoryBoxPlot
						boxWidth={20}
						data={[
							{ x: 1, y: [ 1, 2, 3, 5 ] },
							{ x: 2, y: [ 3, 2, 8, 10 ] },
							{ x: 3, y: [ 2, 8, 6, 5 ] },
							{ x: 4, y: [ 1, 3, 2, 9 ] }
						]}
					/>
				</VictoryChart>
			</div>
		);
	}
}
export default Boxplot;
