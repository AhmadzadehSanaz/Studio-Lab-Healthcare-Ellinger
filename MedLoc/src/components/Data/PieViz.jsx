// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
	{
		id: 'lisp',
		label: 'cLUSTER 1',
		value: 169,
		color: 'hsl(283, 70%, 50%)'
	},
	{
		id: 'haskell',
		label: 'haskell',
		value: 551,
		color: 'hsl(280, 70%, 50%)'
	},
	{
		id: 'erlang',
		label: 'erlang',
		value: 308,
		color: 'hsl(251, 70%, 50%)'
	},
	{
		id: 'python',
		label: 'python',
		value: 182,
		color: 'hsl(135, 70%, 50%)'
	},
	{
		id: 'rust',
		label: 'rust',
		value: 456,
		color: 'hsl(145, 70%, 50%)'
	}
];

const PieViz = () => (
	<ResponsivePie
		data={data}
		margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
		innerRadius={0.5}
		padAngle={0.7}
		cornerRadius={3}
		colors={{ scheme: 'nivo' }}
		borderWidth={1}
		borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
		radialLabelsSkipAngle={10}
		radialLabelsTextColor='#333333'
		radialLabelsLinkColor={{ from: 'color' }}
		sliceLabelsSkipAngle={10}
		sliceLabelsTextColor='#333333'
		defs={[
			{
				id: 'dots',
				type: 'patternDots',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				size: 4,
				padding: 1,
				stagger: true
			},
			{
				id: 'lines',
				type: 'patternLines',
				background: 'inherit',
				color: 'rgba(255, 255, 255, 0.3)',
				rotation: -45,
				lineWidth: 6,
				spacing: 10
			}
		]}
		fill={[
			{
				match: {
					id: 'CLUSTER1'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'c'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'go'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'python'
				},
				id: 'dots'
			},
			{
				match: {
					id: 'scala'
				},
				id: 'lines'
			},
			{
				match: {
					id: 'lisp'
				},
				id: 'lines'
			},
			{
				match: {
					id: 'elixir'
				},
				id: 'lines'
			},
			{
				match: {
					id: 'javascript'
				},
				id: 'lines'
			}
		]}
		legends={[
			{
				anchor: 'bottom',
				direction: 'row',
				justify: false,
				translateX: 0,
				translateY: 56,
				itemsSpacing: 0,
				itemWidth: 100,
				itemHeight: 18,
				itemTextColor: '#999',
				itemDirection: 'left-to-right',
				itemOpacity: 1,
				symbolSize: 18,
				symbolShape: 'circle',
				effects: [
					{
						on: 'hover',
						style: {
							itemTextColor: '#000'
						}
					}
				]
			}
		]}
	/>
);

export default PieViz;
