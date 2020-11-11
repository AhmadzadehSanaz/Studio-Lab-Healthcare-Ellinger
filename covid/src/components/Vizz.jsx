import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const data = [
	{
		taste: 'fruity',
		chardonay: 84,
		carmenere: 27,
		syrah: 42
	},
	{
		taste: 'bitter',
		chardonay: 85,
		carmenere: 53,
		syrah: 82
	},
	{
		taste: 'heavy',
		chardonay: 46,
		carmenere: 102,
		syrah: 110
	},
	{
		taste: 'strong',
		chardonay: 59,
		carmenere: 43,
		syrah: 25
	},
	{
		taste: 'sunny',
		chardonay: 65,
		carmenere: 95,
		syrah: 35
	}
];

export default function Vizz(){
	return (
		<ResponsiveRadar
			data={data}
			keys={[ 'chardonay', 'carmenere', 'syrah' ]}
			indexBy='taste'
			maxValue='auto'
			margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
			curve='linearClosed'
			borderWidth={2}
			borderColor={{ from: 'color' }}
			gridLevels={5}
			gridShape='circular'
			gridLabelOffset={36}
			enableDots={true}
			dotSize={10}
			dotColor={{ theme: 'background' }}
			dotBorderWidth={2}
			dotBorderColor={{ from: 'color' }}
			enableDotLabel={true}
			dotLabel='value'
			dotLabelYOffset={-12}
			colors={{ scheme: 'nivo' }}
			fillOpacity={0.25}
			blendMode='multiply'
			animate={true}
			motionConfig='wobbly'
			isInteractive={true}
			legends={[
				{
					anchor: 'top-left',
					direction: 'column',
					translateX: -50,
					translateY: -40,
					itemWidth: 80,
					itemHeight: 20,
					itemTextColor: '#999',
					symbolSize: 12,
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
}
