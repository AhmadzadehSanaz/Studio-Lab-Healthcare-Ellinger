import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { features as dummyDataList } from '../data/dummydata.json';

//data prepration

var listItems;
//getting the first object from geojson to extract column names
for (var key in dummyDataList) {
	if (dummyDataList.hasOwnProperty(key)) {
		let firstProp = dummyDataList[key];
		listItems = Object.keys(firstProp.properties);
		console.log(listItems);
		break;
	}
}

export default function ListBrowser(props){
	const useStyles = makeStyles((theme) => ({
		root: {
			height: '100%',
			maxHeight: props.divHeight - 10,
			backgroundColor: theme.palette.background.paper,
			position: 'relative',
			overflow: 'auto'
		},
		listSection: {
			backgroundColor: 'inherit'
		},
		ul: {
			backgroundColor: 'inherit',
			padding: 0
		}
	}));

	const classes = useStyles();

	//Toggle Box state and functions
	const [ checked, setChecked ] = React.useState([ 1 ]);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List className={classes.root} subheader={<li />}>
			<Typography variant='h6' className={classes.title}>
				Features
			</Typography>

			{listItems.map((sectionId) => (
				<li key={`section-${sectionId}`} className={classes.listSection}>
					<ul className={classes.ul}>
						<ListItem key={`item-${sectionId}-${sectionId}`}>
							<ListItemText primary={`Item ${sectionId}`} />
							<ListItemSecondaryAction>
								<Checkbox
									edge='end'
									onChange={handleToggle(sectionId)}
									// checked={checked.indexOf(sectionId) !== -1}
									// inputProps={{ 'aria-labelledby': sectionId }}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					</ul>
				</li>
			))}
		</List>
	);
}
