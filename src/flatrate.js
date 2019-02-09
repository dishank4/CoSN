import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {inputToCurrency, currencyToFloat} from './HelperFunctions.js'



class FlatRate extends React.Component
{

	constructor(props) 
	{
	    super(props);

	    this.state = 
	    {
	    	showFlatRateInput : false,
	    	flatRateAmount : 0.0,
	    	flatRateAmountDisplayValue: "$0.00",
	    	placeHolderText : "$0.00",
	    	firstTimeInput : true

	    };
	    this.onChangeInput = this.onChangeInput.bind(this);
	    this.onFocus = this.onFocus.bind(this);
	 }

	 onChangeInput(value)
	 {
	 	this.setState({flatRateAmount: currencyToFloat(value), flatRateAmountDisplayValue : inputToCurrency(value)});
	 }

	 onFocus()
	 {
	 	if(this.state.firstTimeInput)
	 	{
	 		this.setState({flatRateAmountDisplayValue: "$"});
	 		this.state.firstTimeInput = false;
	 	}
	 }
 
	render()
	{
		return(
				<div>
					
						<div>
							<h1>{this.props.questionText}</h1>
							<Button size="lg" className ="yes" color = "primary"  onClick={(e)=>this.setState({showFlatRateInput : true})}>Yes</Button>
							<Button size="lg" className = "no" color = "danger"  onClick={(e)=>this.props.updateParentState(0.0, this.props.isOneTimeFee,this.props.whatRendersNext)}>No</Button>
						</div> 
						<br/>
						{
							this.state.showFlatRateInput ? 

							<div>
								<InputGroup>
									<Input value = {this.state.flatRateAmountDisplayValue} type = "text" onClick = {(evt)=>{this.onFocus()}}  onChange = {(evt)=>this.onChangeInput(evt.target.value)} />
								</InputGroup>
								<br/>
								<div style ={{float:"right"}}>
							      	<Button size="lg" className = "next" outline color="primary" onClick={(e)=>this.props.updateParentState(this.state.flatRateAmount, this.props.isOneTimeFee, this.props.whatRendersNext)}>Next</Button>
							      </div>
						      </div>
							: null
						}
				</div>
			);
	}
}


export default FlatRate;