import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class YesNoQuestion extends React.Component
{
	constructor(props)
	{
		super(props);
		//console.log("Get to YesNoQuestion constructor");
	}


	render()
	{
		return (

				<div>
					<h1>{this.props.questionText}</h1>
					<Button size="lg" className ="yes" color = "primary"  onClick={(e)=>this.props.updateParentState(this.props.feeArray, this.props.whatRendersNextOnYes)}>Yes</Button>
					<Button size="lg" className = "no" color = "danger"  onClick={(e)=>this.props.updateParentState(this.props.feeArray, this.props.whatRendersNextOnNo)}>No</Button>
				</div>
			);
	}
}

export default YesNoQuestion;