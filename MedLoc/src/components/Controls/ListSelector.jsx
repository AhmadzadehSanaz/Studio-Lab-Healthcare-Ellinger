import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Tooltip from '@material-ui/core/Tooltip';

import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0px',
		padding: '5px'
	},
	cardHeader: {
		padding: theme.spacing(1, 2)
	},
	list: {
		width: 300,
		height: '300px',
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
		textTransform: 'capitalize'
	},
	button: {
		margin: theme.spacing(1, 1.5)
	},
	MuiListItem: {
		padding: '0px',
		margin: 0
	}
}));

function not (a, b){
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection (a, b){
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union (a, b){
	return [ ...a, ...not(b, a) ];
}

export default function TransferList (props){
	var listItems;

	//getting the first object from geojson to extract column names

	let dataPopulator = props.dataProps.features;

	if (dataPopulator !== null) {
		for (var key in dataPopulator) {
			if (dataPopulator.hasOwnProperty(key)) {
				let firstProp = dataPopulator[key];
				listItems = Object.keys(firstProp.properties);

				break;
			}
		}
	}
	//Replacing _ with space for better display
	let listItemsCleaned = listItems.map((item) => item.replace(/_/g, ' '));

	const classes = useStyles();
	const [ checked, setChecked ] = React.useState([]);
	const [ left, setLeft ] = React.useState(listItemsCleaned.reverse());
	const [ right, setRight ] = React.useState([]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	//
	//Passing  selected features to parent component using props
	props.featureProps(right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			let fakeValue = value.replace(/ /g, '_');
			// Passing prettified feature names to be displayed in the list
			props.methodProps(fakeValue);

			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleToggleSelected = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={
							numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{ 'aria-label': 'all items selected' }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense={true} component='div' role='list'>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem key={value} role='listitem' button>
							<ListItemIcon>
								<Checkbox
									onClick={handleToggle(value)}
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${value}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);
	const customListSelected = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={
							numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{ 'aria-label': 'all items selected' }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense={true} component='div' role='list'>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem
							key={value}
							role='listitem'
							button
							onClick={handleToggleSelected(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${value}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<React.Fragment>
			<Tooltip title={'Hover over each section to learn about how they work'}>
				<Typography variant='h6' className={classes.title}>
					Features Selection
				</Typography>
			</Tooltip>

			<Grid
				container
				spacing={0}
				justify='center'
				alignItems='center'
				alignContent='center'
				className={classes.root}>
				<Grid item>{customList('Features', left)}</Grid>
				<Grid item>
					<Grid container direction='row' alignItems='center'>
						<Button
							variant='contained'
							color='primary'
							size='small'
							className={classes.button}
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
							aria-label='move selected right'>
							<ExpandMoreIcon />
						</Button>
						<Button
							variant='contained'
							color='primary'
							size='small'
							className={classes.button}
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label='move selected left'>
							<ExpandLessIcon />
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customListSelected('Selected Features', right)}</Grid>
			</Grid>
		</React.Fragment>
	);
}
