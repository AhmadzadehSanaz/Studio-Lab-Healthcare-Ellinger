import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel (props){
	const { children, value, index, ...other } = props;

	return (
		<div
			style={{ background: '#f4f4f4' }}
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}>
			{value === index && (
				<Box m={1}>
					<Typography align='left' variant='h6'>
						Iteration History: {children}
					</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps (index){
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%'
	}
}));

export default function Synthesizer (){
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static' color='red'>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'>
					<Tab label='Iteration One' {...a11yProps(0)} />
					<Tab label='Iteration Two' {...a11yProps(1)} />
					<Tab label='Iteration Three' {...a11yProps(2)} />
					<Tab label='Iteration Four' {...a11yProps(3)} />
					<Tab label='Iteration Five' {...a11yProps(4)} />
					<Tab label='Iteration Six' {...a11yProps(5)} />
					<Tab label='Iteration Seven' {...a11yProps(6)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				Iteration One
			</TabPanel>
			<TabPanel value={value} index={1}>
				Iteration Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Iteration Three
			</TabPanel>
			<TabPanel value={value} index={3}>
				Iteration Four
			</TabPanel>
			<TabPanel value={value} index={4}>
				Iteration Five
			</TabPanel>
			<TabPanel value={value} index={5}>
				Iteration Six
			</TabPanel>
			<TabPanel value={value} index={6}>
				Iteration Seven
			</TabPanel>
		</div>
	);
}
