import React from 'react';
import './index.css';
import { InputGroup, InputGroupAddon, InputGroupText, Input  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {addCommasToInput, removeCommasFromInput} from './HelperFunctions.js'
import {reactLocalStorage} from 'reactjs-localstorage';

class HoursDaysPeopleInput extends React.Component
{

	constructor(props)
	{
		super(props);

		this.state = 
		{
			isITLeaderInput : this.props.inputType === "itLeader",
			isITStaffInput : this.props.inputType ==="itStaff",
			isAdminInput :  this.props.inputType === "admin",
			isTeacherInput : this.props.inputType === "teacher",
			hourValueArray : {itLeader : "0", itStaff : "0", admin: "0", teacher : "0"},
			dayValueArray : {itLeader : "0", itStaff : "0", admin: "0", teacher : "0"},
			numberOfStaffValueArray : {itLeader : "0", itStaff : "0", admin: "0", teacher : "0"},
			isFirstTimeInputHourArray : {itLeader:true, itStaff : true, admin: true, teacher : true},
			isFirstTimeInputDayArray : {itLeader:true, itStaff : true, admin: true, teacher : true},
			isFirstTimeInputNumberOfStaffArray : {itLeader:true, itStaff : true, admin: true, teacher : true}
		};

		this.renderITLeaderInput = this.renderITLeaderInput.bind(this);
		


	}

	componentDidMount(){
        if(Object.keys(reactLocalStorage.getObject(this.props.inputType)).length === 0){
            reactLocalStorage.setObject(this.props.cn+"_"+this.props.inputType+"_Day",this.state.dayValueArray);
			reactLocalStorage.setObject(this.props.cn+"_"+this.props.inputType+"_Hour",this.state.hourValueArray);
			reactLocalStorage.setObject(this.props.cn+"_"+this.props.inputType+"_NumberOfStaffs",this.state.numberOfStaffValueArray);
        }else{
            this.setState({
				dayValueArray: reactLocalStorage.getObject(this.props.cn+"_"+this.props.inputType+"_Day"),
                hourValueArray: reactLocalStorage.getObject(this.props.cn+"_"+this.props.inputType+"_Hour"),
				numberOfStaffValueArray: reactLocalStorage.getObject(this.props.cn+"_"+this.props.inputType+"_NumberOfStaffs"),
            })
        }
    }


	updateNumberOfStaffArray(inputType, input)
	{
		var tempStaffArray = this.state.numberOfStaffValueArray;
		tempStaffArray[inputType] = addCommasToInput(input);
		this.setState({numberOfStaffValueArray: tempStaffArray}, function(){
			reactLocalStorage.setObject(this.props.cn+"_"+this.props.inputType+"_NumberOfStaffs", this.state.numberOfStaffValueArray);
		});
		this.props.staffUpdateCB(this.props.inputType, removeCommasFromInput(input));
	}


	updateHourArray(inputType, input)
	{
		var tempHourArray = this.state.hourValueArray;
		tempHourArray[inputType] = addCommasToInput(input);
		this.setState({hourValueArray: tempHourArray}, function(){
			reactLocalStorage.setObject(this.props.cn+"_"+this.props.inputType+"_Hour", this.state.hourValueArray);
		});
		this.props.hourUpdateCB(this.props.inputType, removeCommasFromInput(input));
	}

	updateDayArray(inputType, input)
	{
		var tempDayArray = this.state.dayValueArray;
		tempDayArray[inputType] = addCommasToInput(input);
		this.setState({dayValueArray: tempDayArray},function(){
			reactLocalStorage.setObject(this.props.cn+"_"+this.props.inputType+"_Day", this.state.dayValueArray);
		});
		this.props.dayUpdateCB(this.props.inputType, removeCommasFromInput(input));
	}



	onFocusNumberOfStaff(inputType)
	{
		if(this.state.isFirstTimeInputNumberOfStaffArray[inputType])
		{
			var tempNumberOfStaffArray = this.state.numberOfStaffValueArray;
			var tempIsFirstNumberOfStaffArray = this.state.isFirstTimeInputNumberOfStaffArray;
			tempNumberOfStaffArray[inputType] = "";
			tempIsFirstNumberOfStaffArray[inputType] = false;
			this.setState({numberOfStaffValueArray: tempNumberOfStaffArray, isFirstTimeInputNumberOfStaffArray : tempIsFirstNumberOfStaffArray});
		}
	}


	onFocusHours(inputType)
	{
		if(this.state.isFirstTimeInputHourArray[inputType])
		{
			var tempHourArray = this.state.hourValueArray;
			var tempIsFirstHourArray = this.state.isFirstTimeInputHourArray;
			tempHourArray[inputType] = "";
			tempIsFirstHourArray[inputType] = false;
			this.setState({hourValueArray: tempHourArray, isFirstTimeInputHourArray : tempIsFirstHourArray});
		}
	}


	onFocusDays(inputType)
	{
		if(this.state.isFirstTimeInputDayArray[inputType])
		{
			var tempDayArray = this.state.dayValueArray;
			var tempIsFirstDayArray = this.state.isFirstTimeInputDayArray;
			tempDayArray[inputType] = "";
			tempIsFirstDayArray[inputType] = false;
			this.setState({dayValueArray: tempDayArray, isFirstTimeInputDayArray : tempIsFirstDayArray});
		}
	}

	renderITLeaderInput()
	{
		return (


				<div>
					<h3>IT Leader</h3>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Hours</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.hourValueArray["itLeader"]} type = "text" onFocus = {(evt)=>{this.onFocusHours("itLeader")}}
							onChange = {(evt)=>{this.updateHourArray(this.props.inputType, evt.target.value)}} />
						}
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Days</InputGroupText>
						</InputGroupAddon>
						<Input value ={this.state.dayValueArray["itLeader"]} type = "text" onFocus = {(evt)=>{this.onFocusDays("itLeader")}}
							onChange = {(evt)=>{this.updateDayArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
				</div> 
			);
	}


	renderITStaffInput()
	{
		return (

				<div>
					<h3>IT Staff</h3>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>No of IT Staff</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.numberOfStaffValueArray["itStaff"]} type = "text" onFocus = {(evt)=>{this.onFocusNumberOfStaff("itStaff")}}
							onChange = {(evt)=>{this.updateNumberOfStaffArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Hours</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.hourValueArray["itStaff"]} type = "text"  onFocus = {(evt)=>{this.onFocusHours("itStaff")}} 
							onChange = {(evt)=>{this.updateHourArray(this.props.inputType, evt.target.value)}}/>
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Days</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.dayValueArray["itStaff"]} type = "text" onFocus = {(evt)=>{this.onFocusDays("itStaff")}} 
							onChange = {(evt)=>{this.updateDayArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
				</div> 


			);
	}


	renderAdminInput()
	{
		return (

				<div>
					<h3>Admin</h3>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>No of Admins</InputGroupText>
						</InputGroupAddon>
						<Input value ={this.state.numberOfStaffValueArray["admin"]}  type = "text" onFocus = {(evt)=>{this.onFocusNumberOfStaff("admin")}}
						onChange = {(evt)=>{this.props.staffUpdateCB(this.props.inputType, parseFloat(evt.target.value))}} />
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Hours</InputGroupText>
						</InputGroupAddon>
						<Input value ={this.state.hourValueArray["admin"]} type = "text"  onFocus = {(evt)=>{this.onFocusHours("admin")}}  
						onChange = {(evt)=>{this.updateHourArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Days</InputGroupText>
						</InputGroupAddon>
						<Input value ={this.state.dayValueArray["admin"]} type = "text" onFocus = {(evt)=>{this.onFocusDays("admin")}} 
						onChange = {(evt)=>{this.updateDayArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
				</div> 


			)
	}

	renderTeacherInput()
	{
		return (

				<div>
					<h3>Teacher</h3>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>No of Teachers</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.numberOfStaffValueArray["teacher"]}  type = "text" onFocus = {(evt)=>{this.onFocusNumberOfStaff("teacher")}}
							onChange = {(evt)=>{this.props.staffUpdateCB(this.props.inputType, parseFloat(evt.target.value))}} />
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Hours</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.hourValueArray["teacher"]} type = "text" onFocus = {(evt)=>{this.onFocusHours("teacher")}} 
							onChange = {(evt)=>{this.updateHourArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
					<InputGroup>
						<InputGroupAddon addonType="prepend">
						<InputGroupText>Days</InputGroupText>
						</InputGroupAddon>
						<Input value = {this.state.dayValueArray["teacher"]}  type = "text" onFocus = {(evt)=>{this.onFocusDays("teacher")}} 
							onChange = {(evt)=>{this.updateDayArray(this.props.inputType, evt.target.value)}} />
					</InputGroup>
					<br/>
				</div> 
			)
	}

	render()
	{
		return (
				<div>
					{this.state.isITLeaderInput ? this.renderITLeaderInput() : null}
					{this.state.isITStaffInput ? this.renderITStaffInput(): null}
					{this.state.isAdminInput ? this.renderAdminInput() :null}
					{this.state.isTeacherInput ? this.renderTeacherInput() : null}
				</div>
			);
	}
}



export default HoursDaysPeopleInput;