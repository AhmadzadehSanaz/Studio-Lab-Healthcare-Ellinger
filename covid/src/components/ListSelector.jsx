import React, {useEffect,useState} from 'react';
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
import { features as dummyDataList } from '../data/mainData.json';
import dataTest from '../data/mainData.json';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '5px'
	},
	cardHeader: {
		padding: theme.spacing(1, 2)
	},
	list: {
		width: 320,
		height: '200px',
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto'
	},
	button: {
		margin: theme.spacing(0.5, 1.5)
	},MuiListItem:{
    padding:'2px'
  }
}));

function not(a, b){
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b){
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b){
	return [ ...a, ...not(b, a) ];
}

export default function TransferList(props){
  var listItems;
  



console.log(props.dataProps.features,'listselector')
  //getting the first object from geojson to extract column names
  
  let dataPopulator=props.dataProps.features;
  if(dataPopulator !== null){
	for (var key in dataPopulator) {
		if (dataPopulator.hasOwnProperty(key)) {
			let firstProp = dataPopulator[key];
			listItems = Object.keys(firstProp.properties);

			break;
		}
	}}

	const classes = useStyles();
	const [ checked, setChecked ] = React.useState([]);
	const [ left, setLeft ] = React.useState(listItems);
	const [ right, setRight ] = React.useState([]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

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
						<ListItem key={value} role='listitem' button onClick={handleToggle(value)}>
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
			<Typography variant='h6' className={classes.title}>
				Features Selection
			</Typography>

			<Grid
				container
				spacing={0}
				justify='center'
				alignItems='center'
				className={classes.root}>
				<Grid item>{customList('Features', left)}</Grid>
				<Grid item>
					<Grid container direction='column' alignItems='center' justify='space-between'>
						<Button
              variant='contained'
              color="primary"
							size='small'
							className={classes.button}
							onClick={handleCheckedRight}
							disabled={leftChecked.length === 0}
							aria-label='move selected right'>
							&gt;
						</Button>
						<Button
              variant='contained'
              color="primary"
							size='small'
							className={classes.button}
							onClick={handleCheckedLeft}
							disabled={rightChecked.length === 0}
							aria-label='move selected left'>
							&lt;
						</Button>
					</Grid>
				</Grid>
				<Grid item>{customList('Selected Features', right)}</Grid>
			</Grid>
		</React.Fragment>
	);
}
