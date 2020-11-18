import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const data = [
	{
		country: 'AD',
		'hot dog': 92,
		'hot dogColor': 'hsl(146, 70%, 50%)',
		burger: 177,
		burgerColor: 'hsl(138, 70%, 50%)',
		sandwich: 113,
		sandwichColor: 'hsl(128, 70%, 50%)',
		kebab: 164,
		kebabColor: 'hsl(89, 70%, 50%)',
		fries: 28,
		friesColor: 'hsl(224, 70%, 50%)',
		donut: 187,
		donutColor: 'hsl(130, 70%, 50%)'
	},
	{
		country: 'AE',
		'hot dog': 168,
		'hot dogColor': 'hsl(178, 70%, 50%)',
		burger: 83,
		burgerColor: 'hsl(338, 70%, 50%)',
		sandwich: 4,
		sandwichColor: 'hsl(302, 70%, 50%)',
		kebab: 1,
		kebabColor: 'hsl(258, 70%, 50%)',
		fries: 101,
		friesColor: 'hsl(331, 70%, 50%)',
		donut: 169,
		donutColor: 'hsl(171, 70%, 50%)'
	},
	{
		country: 'AF',
		'hot dog': 51,
		'hot dogColor': 'hsl(301, 70%, 50%)',
		burger: 68,
		burgerColor: 'hsl(32, 70%, 50%)',
		sandwich: 192,
		sandwichColor: 'hsl(97, 70%, 50%)',
		kebab: 146,
		kebabColor: 'hsl(64, 70%, 50%)',
		fries: 106,
		friesColor: 'hsl(274, 70%, 50%)',
		donut: 160,
		donutColor: 'hsl(314, 70%, 50%)'
	},
	{
		country: 'AG',
		'hot dog': 152,
		'hot dogColor': 'hsl(330, 70%, 50%)',
		burger: 24,
		burgerColor: 'hsl(288, 70%, 50%)',
		sandwich: 106,
		sandwichColor: 'hsl(303, 70%, 50%)',
		kebab: 125,
		kebabColor: 'hsl(38, 70%, 50%)',
		fries: 141,
		friesColor: 'hsl(140, 70%, 50%)',
		donut: 111,
		donutColor: 'hsl(31, 70%, 50%)'
	},
	{
		country: 'AI',
		'hot dog': 69,
		'hot dogColor': 'hsl(15, 70%, 50%)',
		burger: 175,
		burgerColor: 'hsl(221, 70%, 50%)',
		sandwich: 46,
		sandwichColor: 'hsl(199, 70%, 50%)',
		kebab: 100,
		kebabColor: 'hsl(268, 70%, 50%)',
		fries: 102,
		friesColor: 'hsl(293, 70%, 50%)',
		donut: 133,
		donutColor: 'hsl(211, 70%, 50%)'
	},
	{
		country: 'AL',
		'hot dog': 178,
		'hot dogColor': 'hsl(151, 70%, 50%)',
		burger: 103,
		burgerColor: 'hsl(224, 70%, 50%)',
		sandwich: 56,
		sandwichColor: 'hsl(170, 70%, 50%)',
		kebab: 161,
		kebabColor: 'hsl(188, 70%, 50%)',
		fries: 69,
		friesColor: 'hsl(266, 70%, 50%)',
		donut: 24,
		donutColor: 'hsl(259, 70%, 50%)'
	},
	{
		country: 'AM',
		'hot dog': 102,
		'hot dogColor': 'hsl(272, 70%, 50%)',
		burger: 193,
		burgerColor: 'hsl(117, 70%, 50%)',
		sandwich: 157,
		sandwichColor: 'hsl(76, 70%, 50%)',
		kebab: 5,
		kebabColor: 'hsl(292, 70%, 50%)',
		fries: 38,
		friesColor: 'hsl(214, 70%, 50%)',
		donut: 12,
		donutColor: 'hsl(17, 70%, 50%)'
	}
];

export default function Viz(){
	return (
		<ResponsiveBar
			data={data}
			keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
			indexBy='country'
			margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			colors={{ scheme: 'nivo' }}
			defs={[
				{
					id: 'dots',
					type: 'patternDots',
					background: 'inherit',
					color: '#38bcb2',
					size: 4,
					padding: 1,
					stagger: true
				},
				{
					id: 'lines',
					type: 'patternLines',
					background: 'inherit',
					color: '#eed312',
					rotation: -45,
					lineWidth: 6,
					spacing: 10
				}
			]}
			fill={[
				{
					match: {
						id: 'fries'
					},
					id: 'dots'
				},
				{
					match: {
						id: 'sandwich'
					},
					id: 'lines'
				}
			]}
			borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'country',
				legendPosition: 'middle',
				legendOffset: 32
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'food',
				legendPosition: 'middle',
				legendOffset: -40
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
			legends={[
				{
					dataFrom: 'keys',
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: 'left-to-right',
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: 'hover',
							style: {
								itemOpacity: 1
							}
						}
					]
				}
			]}
			animate={true}
			motionStiffness={90}
			motionDamping={15}
		/>
	);
}
