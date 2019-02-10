import React from 'react';
import ReactDOM from 'react-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Integration from './Integration.js'
import SelectableDaysAndHours from './SelectableDaysAndHours.js'
import YesNoQuestion from './YesNoQuestion.js'
import { inputToCurrency, currencyToFloat } from './HelperFunctions.js'
// import SummaryPage from './SummaryPage';

class HandleIntegrations extends React.Component {

	render() {
		return (

			<div>
				<h1>How will you / did you handle the integration?</h1>
				<Button className="integrationButton" color="primary" onClick={(e) => this.props.updateParentState(null, "isVendorIntegrationNext")}>Vendor to handle Integration</Button>
				<Button className="integrationButton" color="secondary" onClick={(e) => this.props.updateParentState(null, "isConsultantIntegrationNext")}>Consultant to manage Integration</Button>
				<Button className="integrationButton" color="info" onClick={(e) => this.props.updateParentState(null, "isCustomIntegrationNext")}>Build custom integration in-house</Button>
				<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.updateParentState(null, "isInteroperabilityNext")}>Back</Button>
			</div>
		)
	}
}




class HourlyRate extends React.Component {

	constructor(props) {
		super(props);
		this.state =
			{
				hourlyRateArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				inputValueArray: { itLeader: "$0.00", "itStaff": "$0.00", admin: "$0.00", teacher: "$0.00" },
				isFirstTimeInputArray: { itLeader: true, itStaff: true, admin: true, teacher: true },

			};
		this.onChangeForInput = this.onChangeForInput.bind(this);
	}

	componentDidMount(){
		if(Object.keys(reactLocalStorage.getObject(this.props.cn)).length === 0){
			reactLocalStorage.setObject(this.props.cn,this.state.inputValueArray)
		}else{
			this.setState({
				inputValueArray: reactLocalStorage.getObject(this.props.cn)
			})
		}
	}


	onChangeForInput(value, typeOfInput) {

		var parsedValue = inputToCurrency(value);

		var newInputValueArray = this.state.inputValueArray;
		newInputValueArray[typeOfInput] = parsedValue;

		var tempHourlyRateArray = this.state.hourlyRateArray;
		tempHourlyRateArray[typeOfInput] = currencyToFloat(value);

		this.setState({ inputValueArray: newInputValueArray, hourlyRateArray: tempHourlyRateArray },function(){
			reactLocalStorage.setObject(this.props.cn, this.state.inputValueArray);
		});
	}

	onFocus(inputType) {
		if (this.state.isFirstTimeInputArray[inputType]) {
			var tempValueArray = this.state.inputValueArray;
			var tempIsFirstTimeInputArray = this.state.isFirstTimeInputArray;

			tempValueArray[inputType] = "$";
			tempIsFirstTimeInputArray[inputType] = false;

			this.setState({ inputValueArray: tempValueArray, isFirstTimeInputArray: tempIsFirstTimeInputArray });

		}
	}

	render() {
		console.log(this.state.inputValueArray);
		return (
			<div>
				<h1>For Estimating purposes, enter an hourly rate for:</h1>
				<br />
				<div>
					<h3>IT Leader</h3>
					<InputGroup>
						<Input value={this.state.inputValueArray["itLeader"]} type="text" onFocus={(evt) => { this.onFocus("itLeader") }}
							onChange={(evt) => { this.onChangeForInput(evt.target.value, "itLeader") }} />
					</InputGroup>
				</div>
				<br />
				<div>
					<h3>IT Staff (leave blank if your IT Leader is the only IT staff)</h3>
					<InputGroup>
						<Input value={this.state.inputValueArray["itStaff"]} type="text" onFocus={(evt) => { this.onFocus("itStaff") }}
							onChange={(evt) => { this.onChangeForInput(evt.target.value, "itStaff") }} />
					</InputGroup>
				</div>
				<br />
				<div>
					<h3>Admin (as defined by you - can include school and/or district admin)</h3>
					<InputGroup>
						<Input value={this.state.inputValueArray["admin"]} type="text" onFocus={(evt) => { this.onFocus("admin") }}
							onChange={(evt) => { this.onChangeForInput(evt.target.value, "admin") }} />
					</InputGroup>
				</div>
				<br />
				<div>
					<h3>Teacher</h3>
					<InputGroup>
						<Input value={this.state.inputValueArray["teacher"]} type="text" onFocus={(evt) => { this.onFocus("teacher") }}
							onChange={(evt) => { this.onChangeForInput(evt.target.value, "teacher") }} />
					</InputGroup>
				</div>
				<br />
				<div style={{ float: "right" }}>
					<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.updateParentState(null, "isSystemPairingNext")}>Back</Button>
					<Button size="lg" className="next" outline color="primary" onClick={(e) => this.props.updateParentState(null, "isInteroperabilityNext", this.state.hourlyRateArray)}>Next</Button>
				</div>
			</div>
		)
	}
}

class SystemPairings extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.changeDropdownValues = this.changeDropdownValues.bind(this);
		this.state = {
			dropdownOpen: false,
			dropDownValue: "System Pairings",
			isNextDisabled: true
		};
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	changeDropdownValues(e) {
		if (this.state.isNextDisabled)
			this.setState({ isNextDisabled: false });
		this.setState({ dropDownValue: e.currentTarget.textContent });
	}



	render() {

		return (
			<div>
				<h3>For which system pairings are you calculating integration costs?</h3>
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle caret>
						{this.state.dropDownValue}
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={this.changeDropdownValues}>LMS / Courseware</DropdownItem>
						<DropdownItem onClick={this.changeDropdownValues}>LMS / Assessement Platform</DropdownItem>
						<DropdownItem onClick={this.changeDropdownValues}>LMS / Learning Software</DropdownItem>
						<DropdownItem onClick={this.changeDropdownValues}>SIS / LMS</DropdownItem>
						<DropdownItem onClick={this.changeDropdownValues}>SIS / Assessment System</DropdownItem>
						<DropdownItem onClick={this.changeDropdownValues}>SIS / HR System</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<div style={{ float: "right" }}>
					<Button size="lg" className="next" outline color="primary" onClick={(e) => this.props.updateParentState(this.state.dropDownValue, "isHourlyRateNext")}
						disabled={this.state.isNextDisabled}>Next</Button>
				</div>
				{/* <div>
					<Button size="lg" className="next" outline color="primary" onClick={(e) => this.props.updateParentState(this.state.dropDownValue, "summaryPage")}
						>summary</Button>
				</div> */}
			</div>
		)


	}
}

class PageManager extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			whatRendersNext: "isSystemPairingNext",
			feeArray: { oneTimeFee: 0.0, reOccurringFees: 0.0, itLeadershipCosts: 0.0, itStaffCosts: 0.0, nonITStaffCosts: 0.0 },
			hourlyRateArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
			systemPairing: ""

		};
		this.updateStateCB = this.updateStateCB.bind(this);
		this.updateSystemPairingsCB = this.updateSystemPairingsCB.bind(this);
		this.backComponent = this.backComponent.bind(this);
	}


	updateStateCB(feeArray, whatRendersNext, hourlyRateArray, showInputArray , isPressNo ,componentName ) {
		this.setState({ whatRendersNext: whatRendersNext });

		if (feeArray != null)
			//eslint-disable-next-line
			this.state.feeArray = feeArray;
		if (hourlyRateArray != null)
			//eslint-disable-next-line
			this.state.hourlyRateArray = hourlyRateArray;
		console.log(isPressNo);
		console.log(componentName);	
		if(isPressNo){
			for(var compNam of componentName){
				if(Object.keys(reactLocalStorage.getObject(compNam)).length > 0){
					reactLocalStorage.setObject(compNam,{})
				}
			}
		}	
		// console.log("index updateStateCB feeArray: ", this.state.feeArray);
		console.log("index updateStateCB hourlyRateArray: ", this.state.hourlyRateArray);
	}

	backComponent(isFirstIntegration, componentName) {
		this.setState({
			whatRendersNext: componentName
		})
	}

	updateSystemPairingsCB(systemPairing, whatRendersNext) {
		this.setState({ systemPairing: systemPairing, whatRendersNext: whatRendersNext });
	}

	render() {

		if (this.state.whatRendersNext === "isSystemPairingNext")
			return (<SystemPairings updateParentState={this.updateSystemPairingsCB} />)
		// if (this.state.whatRendersNext === "summaryPage")
		// 	return <SummaryPage feeArray={this.state.feeArray} systemPairing={this.props.systemPairing} />

		if (this.state.whatRendersNext === "isHourlyRateNext")
			return (<HourlyRate updateParentState={this.updateStateCB} cn={"HourlyRate"} />)

		if (this.state.whatRendersNext === "isInteroperabilityNext")
			return (<YesNoQuestion updateParentState={this.updateStateCB} cn={"isInteroperability"} localState = {['VettingProcess_admin_Day','VettingProcess_admin_Hour',"VettingProcess_admin_NumberOfStaffs","VettingProcess_itLeader_Day","VettingProcess_itLeader_Hour","VettingProcess_itLeader_NumberOfStaffs","VettingProcess_teacher_Day","VettingProcess_teacher_Hour","VettingProcess_teacher_NumberOfStaffs"] } backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="isHourlyRateNext" feeArray={this.state.feeArray} whatRendersNextOnYes="isVettingProcessNext" whatRendersNextOnNo="isHandleIntegrationsNext"
				questionText="Will/ Did you vet products for interoperability?" />)

		if (this.state.whatRendersNext === "isVettingProcessNext")
			return (<SelectableDaysAndHours cn={"VettingProcess"} updateParentState={this.updateStateCB} backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="isInteroperabilityNext" hourlyRateArray={this.state.hourlyRateArray} feeArray={this.state.feeArray}
				whatRendersNext={"isHandleIntegrationsNext"} questionText="Who will be/ was involved in the technical vetting process?" />)

		if (this.state.whatRendersNext === "isHandleIntegrationsNext")
			return (<HandleIntegrations updateParentState={this.updateStateCB} />)

		if (this.state.whatRendersNext === "isVendorIntegrationNext")
			return (<Integration hourlyRateArray={this.state.hourlyRateArray} cn={"VendorIntegration"} updateParentState={this.updateStateCB} feeArray={this.state.feeArray} integrationType={"Vendor"} systemPairing={this.state.systemPairing} />)


		if (this.state.whatRendersNext === "isConsultantIntegrationNext")
			return <Integration cn={"ConsultantIntegration"} hourlyRateArray={this.state.hourlyRateArray} updateParentState={this.updateStateCB} feeArray={this.state.feeArray} integrationType={"Consultant"} systemPairing={this.state.systemPairing} />

		if (this.state.whatRendersNext === "isCustomIntegrationNext")
			return <Integration cn={"CustomIntegration"} hourlyRateArray={this.state.hourlyRateArray} updateParentState={this.updateStateCB} feeArray={this.state.feeArray} integrationType={"Custom"} systemPairing={this.state.systemPairing} />


		return <p>Couldn't find the next page to render</p>
	}
}


class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state =
			{
				isNightMode: false
			};
		this.updateNightMode = this.updateNightMode.bind(this);
	}

	updateNightMode() {
		console.log("NIGHT NODE!");

		this.setState({ isNightMode: !this.state.isNightMode });
		document.body.className = this.state.isNightMode ? "nightMode" : "notNightMode";
	}

	render() {

		document.body.className = (this.state.isNightMode ? "nightMode" : "notNightMode");
		document.title = "CoSN Wizard";
		return (

			<div className="cosnWizard">

				<PageManager />
				<br />
				<br />
				<h3><b>DISCLAIMER:</b>  No information is stored or copied during use of this tool.</h3>
				<Button size="size" outline color="primary" onClick={(e) => this.updateNightMode()}>night mode</Button>
			</div>
		)
	}
}

ReactDOM.render(<Calculator />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
