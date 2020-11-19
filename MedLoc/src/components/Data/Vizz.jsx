import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data1 = [
	{
		temp: 20,
		cost: 13507,
		color: 'yellow',
		target: 'D',
		volume: 6.116113100609129
	},
	{
		temp: 26,
		cost: 210073,
		color: 'yellow',
		target: 'C',
		volume: 2.8831741624917084
	},
	{
		temp: 12,
		cost: 376847,
		color: 'red',
		target: 'A',
		volume: 2.102788717066486
	},
	{
		temp: 12,
		cost: 26921,
		color: 'red',
		target: 'B',
		volume: 1.2998444450137534
	},
	{
		temp: -4,
		cost: 368589,
		color: 'green',
		target: 'C',
		volume: 1.8574897885628254
	},
	{
		temp: 25,
		cost: 175944,
		color: 'green',
		target: 'C',
		volume: 7.0059209912434275
	},
	{
		temp: -3,
		cost: 113847,
		color: 'yellow',
		target: 'C',
		volume: 1.3620861534401754
	},
	{
		temp: -2,
		cost: 330556,
		color: 'green',
		target: 'C',
		volume: 5.4899602961603975
	},
	{
		temp: 30,
		cost: 163085,
		color: 'green',
		target: 'A',
		volume: 1.5202563408703502
	},
	{
		temp: -5,
		cost: 378766,
		color: 'red',
		target: 'A',
		volume: 3.988623954649666
	},
	{
		temp: 12,
		cost: 384916,
		color: 'green',
		target: 'C',
		volume: 4.846256344908733
	},
	{
		temp: -2,
		cost: 87316,
		color: 'red',
		target: 'B',
		volume: 6.548027861133245
	},
	{
		temp: 36,
		cost: 368,
		color: 'red',
		target: 'A',
		volume: 4.587897033922597
	},
	{
		temp: 30,
		cost: 241381,
		color: 'green',
		target: 'D',
		volume: 5.932286924972634
	},
	{
		temp: 24,
		cost: 305947,
		color: 'green',
		target: 'C',
		volume: 4.169763335664306
	},
	{
		temp: 17,
		cost: 12799,
		color: 'yellow',
		target: 'C',
		volume: 4.488669964514861
	},
	{
		temp: -7,
		cost: 118677,
		color: 'yellow',
		target: 'C',
		volume: 6.873272634770404
	},
	{
		temp: 2,
		cost: 2778,
		color: 'green',
		target: 'B',
		volume: 3.1989464262017626
	},
	{
		temp: 22,
		cost: 150250,
		color: 'green',
		target: 'B',
		volume: 1.268365919973776
	},
	{
		temp: 7,
		cost: 96626,
		color: 'yellow',
		target: 'B',
		volume: 3.9316946549994323
	},
	{
		temp: 18,
		cost: 7073,
		color: 'red',
		target: 'D',
		volume: 4.783449048494196
	},
	{
		temp: 39,
		cost: 32709,
		color: 'red',
		target: 'B',
		volume: 0.25154940457234937
	},
	{
		temp: 6,
		cost: 321457,
		color: 'green',
		target: 'A',
		volume: 6.682673011672154
	},
	{
		temp: 31,
		cost: 192207,
		color: 'green',
		target: 'E',
		volume: 0.5030442238045446
	},
	{
		temp: 20,
		cost: 49506,
		color: 'yellow',
		target: 'A',
		volume: 0.5570303169805089
	},
	{
		temp: 23,
		cost: 345011,
		color: 'yellow',
		target: 'E',
		volume: 2.6742607814066073
	},
	{
		temp: 7,
		cost: 370435,
		color: 'green',
		target: 'C',
		volume: 3.0901570914699326
	},
	{
		temp: 25,
		cost: 16601,
		color: 'yellow',
		target: 'E',
		volume: 6.853805360301716
	},
	{
		temp: 24,
		cost: 257507,
		color: 'green',
		target: 'E',
		volume: 5.83539743947638
	},
	{
		temp: 11,
		cost: 364913,
		color: 'red',
		target: 'A',
		volume: 4.307358678052771
	},
	{
		temp: 30,
		cost: 56484,
		color: 'red',
		target: 'A',
		volume: 3.7206891359311927
	},
	{
		temp: 24,
		cost: 186782,
		color: 'red',
		target: 'D',
		volume: 0.3896389386545974
	}
];

export default function MyResponsiveParallelCoordinates(){
	return (
		<ResponsiveParallelCoordinates
			data={data1}
			variables={[
				{
					key: 'temp',
					type: 'linear',
					min: 'auto',
					max: 'auto',
					ticksPosition: 'before',
					legend: 'temperature',
					legendPosition: 'start',
					legendOffset: 20
				},
				{
					key: 'cost',
					type: 'linear',
					min: 0,
					max: 'auto',
					ticksPosition: 'before',
					legend: 'cost',
					legendPosition: 'start',
					legendOffset: 20
				},
				{
					key: 'color',
					type: 'point',
					padding: 1,
					values: [ 'red', 'yellow', 'green' ],
					legend: 'color',
					legendPosition: 'start',
					legendOffset: -20
				},
				{
					key: 'target',
					type: 'point',
					padding: 0,
					values: [ 'A', 'B', 'C', 'D', 'E' ],
					legend: 'target',
					legendPosition: 'start',
					legendOffset: -20
				},
				{
					key: 'volume',
					type: 'linear',
					min: 0,
					max: 'auto',
					legend: 'volume',
					legendPosition: 'start',
					legendOffset: -20
				}
			]}
			margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
		/>
	);
}
