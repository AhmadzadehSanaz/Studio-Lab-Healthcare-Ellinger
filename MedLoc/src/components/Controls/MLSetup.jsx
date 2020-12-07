import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RunButton from "../Interface/RunButton";
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: "40%"
	},
	selectEmpty: {
		marginTop: theme.spacing(1)
	}
}));

export default function SimpleSelect (props){
	const classes = useStyles();
	const [ cluster, setCluster ] = React.useState("");

	const handleChange = (event) => {
		setCluster(event.target.value);
	};

	return (
		<div>
			<Grid container direction='row' alignItems='center' justify='center'>
				<FormControl className={classes.formControl}>
					{/* <InputLabel shrink id='demo-simple-select-placeholder-label-label'>
						Clusters
					</InputLabel> */}
					<Select
						labelId='demo-simple-select-placeholder-label-label'
						id='demo-simple-select-placeholder-label'
						value={cluster}
						onChange={handleChange}
						displayEmpty
						className={classes.selectEmpty}>
						<MenuItem value=''>
							<em>Select...</em>
						</MenuItem>
						<MenuItem value={1}> 1 </MenuItem>
						<MenuItem value={2}> 2 </MenuItem>
						<MenuItem value={3}> 3</MenuItem>
						<MenuItem value={4}> 4 </MenuItem>
						<MenuItem value={5}> 5 </MenuItem>
						<MenuItem value={6}> 6 </MenuItem>
					</Select>
					{/* <FormHelperText>Choose number of Clusters</FormHelperText> */}
				</FormControl>
				<RunButton
					propsOnClick={() => {
						props.handleSubmit(cluster, props.userFeatures);
					}}
				/>
			</Grid>
		</div>
	);
}
