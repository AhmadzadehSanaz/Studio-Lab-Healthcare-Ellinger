import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Typography from '@material-ui/core/Typography';
import { features as dummyDataList } from '../data/mainData.json';

export default function ListBrowser(props){
	var listItems;

	//getting the first object from geojson to extract column names
	for (var key in dummyDataList) {
		if (dummyDataList.hasOwnProperty(key)) {
			let firstProp = dummyDataList[key];
			listItems = Object.keys(firstProp.properties);

			break;
		}
	}

	const useStyles = makeStyles((theme) => ({
		root: {
			height: '100%',
			maxHeight: props.divHeight - 10,
			width: '100%',
			maxWidth: '36ch',
			backgroundColor: theme.palette.background.paper,
			position: 'relative',
			overflow: 'auto'
		},
		listSection: {
			backgroundColor: 'inherit'
		},
		MuiListItem: {
			dense: true
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
		<List className={classes.root} subheader={<li />} dense={true}>
			<Typography variant='h6' className={classes.title}>
				Features
			</Typography>

			{listItems.map((sectionId) => (
				<li key={`section-${sectionId}`} className={classes.listSection}>
					<ul className={classes.ul}>
						<ListItem dense={true} button key={`${sectionId}`}>
							<ListItemIcon>
								<Checkbox
									edge='start'
									onChange={handleToggle(sectionId)}
									checked={checked.indexOf(sectionId) !== -1}
									inputProps={{ 'aria-labelledby': sectionId }}
								/>
							</ListItemIcon>
							<ListItemText secondary={`${sectionId}`} mu />
						</ListItem>
					</ul>
				</li>
			))}
		</List>
	);
}
