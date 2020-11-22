import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Toggle (props){
	return (
		<FormGroup style={{ marginLeft: '15px' }}>
			<FormControlLabel
				style={{ textTransform: 'none' }}
				control={
					<Switch size='small' checked={props.checkedMain} onChange={props.toggleProps} />
				}
				label='Table View / Visualization '
			/>
		</FormGroup>
	);
}
