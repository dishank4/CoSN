import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {inputToCurrency} from './HelperFunctions.js'



class SummaryPage extends React.Component
{
	constructor(props)
	{
		console.log("summaryPage constructor systemPairing: ", props.systemPairing);
		super(props);
		this.state =
		{
			totalCost : this.props.feeArray["oneTimeFee"] + this.props.feeArray["reOccurringFees"] + this.props.feeArray["itLeadershipCosts"] 
						+ this.props.feeArray["itStaffCosts"] + this.props.feeArray["nonITStaffCosts"],
			firstSystemPairing: this.props.systemPairing.split("/")[0],
			lastSystemPairing : this.props.systemPairing.split("/")[1]
		}
	}



	render()
	{
		console.log("Dishank",this.props)
		return(
				<div>	
					<h2>SUMMARY PAGE LINE ITEMS: </h2>
					<ul>
						<li>One-time fees: {inputToCurrency(this.props.feeArray["oneTimeFee"].toString())}</li>
						<li>Re-occurring fees: {inputToCurrency(this.props.feeArray["reOccurringFees"].toString())}</li>
						<li>IT Leadership costs: {inputToCurrency(this.props.feeArray["itLeadershipCosts"].toString())}</li>
						<li>IT Staff costs (if applicable): {inputToCurrency(this.props.feeArray["itStaffCosts"].toString())}</li>
						<li>Non-IT staff costs: {inputToCurrency(this.props.feeArray["nonITStaffCosts"].toString())}</li>
						<hr/>
						<li>Cost incurred due to lack of interoperability between {this.state.firstSystemPairing} & {this.state.lastSystemPairing} system: {inputToCurrency(this.state.totalCost.toString())}</li>
					</ul>
				</div>

			);
	}
}


export default SummaryPage;