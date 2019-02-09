import React from 'react';
import './index.css';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlatRate from './flatrate.js'
import HoursDaysPeopleInput from './HoursDaysPeopleInput.js'
import SelectableDaysAndHours from './SelectableDaysAndHours.js'
import SummaryPage from './SummaryPage.js'
import YesNoQuestion from './YesNoQuestion.js'


class RelatedUserTraining extends React.Component {
	constructor(props) {
		console.log("got to related user training");
		super(props);
		this.state =
			{
				showRelatedTrainingInput: false,
				hourArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				dayArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				numberOfStaffArray: { itStaff: 0, admin: 0, teacher: 0 }
			};

		console.log("RelatedUserTraining showInputArray: ", this.props.showInputArray);
		this.calculateFees = this.calculateFees.bind(this);
		this.updateDayArray = this.updateDayArray.bind(this);
		this.updateHourArray = this.updateHourArray.bind(this);
		this.updateStaffArray = this.updateStaffArray.bind(this);
		this.setRelatedTrainingInput = this.setRelatedTrainingInput.bind(this);
	}


	updateDayArray(inputType, dayAmount) {
		//eslint-disable-next-line
		this.state.dayArray[inputType] = dayAmount;
	}

	updateHourArray(inputType, hourAmount) {
		//eslint-disable-next-line
		this.state.hourArray[inputType] = hourAmount;
	}

	updateStaffArray(inputType, numberOfStaff) {
		//eslint-disable-next-line
		this.state.numberOfStaffArray[inputType] = numberOfStaff;
	}

	calculateFees() {

		var feeArray = this.props.feeArray;
		if (this.props.showInputArray["showITLeaderInput"])
			feeArray["itLeadershipCosts"] += ((this.state.dayArray["itLeader"] * 24) + this.state.hourArray["itLeader"]) * this.props.hourlyRateArray["itLeader"];

		if (this.props.showInputArray["showITStaffInput"])
			feeArray["itStaffCosts"] += (((this.state.dayArray["itStaff"] * 24) + this.state.hourArray["itStaff"]) * this.props.hourlyRateArray["itStaff"]) * this.state.numberOfStaffArray["itStaff"];

		if (this.props.showInputArray["showAdminInput"])
			feeArray["nonITStaffCosts"] += (((this.state.dayArray["admin"] * 24) + this.state.hourArray["admin"]) * this.props.hourlyRateArray["admin"]) * this.state.numberOfStaffArray["admin"];

		if (this.props.showInputArray["showTeacherInput"])
			feeArray["nonITStaffCosts"] += (((this.state.dayArray["teacher"] * 24) + this.state.hourArray["teacher"]) * this.props.hourlyRateArray["teacher"]) * this.state.numberOfStaffArray["teacher"];


		this.props.updateParentState(feeArray, this.props.whatRendersNext);
	}

	setRelatedTrainingInput() {
		this.setState({ showRelatedTrainingInput: !this.state.showRelatedTrainingInput });
	}
	render() {
		return (

			<div>
				<h1>Is there related user training outside of vendor-provided PD?</h1>
				<Button size="lg" className="yes" color="primary" onClick={(e) => this.setRelatedTrainingInput()}>Yes</Button>
				<Button size="lg" className="no" color="danger" onClick={(e) => this.props.updateParentState(this.props.feeArray, this.props.whatRendersNext)}>No</Button>
				<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.backComponent(this.props.isFirstIntegration, this.props.whatRendersBack)}>Back</Button>
				<br />
				<br />
				{this.state.showRelatedTrainingInput ?
					<div>
						{this.props.showInputArray["showITLeaderInput"] ?
							<HoursDaysPeopleInput inputType="itLeader" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} />
							: null}

						{this.props.showInputArray["showITStaffInput"] ?
							<HoursDaysPeopleInput inputType="itStaff" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} />
							: null}

						{this.props.showInputArray["showAdminInput"] ?
							<HoursDaysPeopleInput inputType="admin" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} />
							: null}

						{this.props.showInputArray["showTeacherInput"] ?
							<HoursDaysPeopleInput inputType="teacher" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} />
							: null}
						<div style={{ float: "right" }}>
							<Button size="lg" className="next" outline color="primary" onClick={(e) => this.calculateFees()}>Next</Button>
						</div>
					</div>
					: null}

			</div>
		)
	}
}


class FileTransferFees extends React.Component {
	constructor(props) {
		super(props);
		this.state =
			{
				showITStaffInput: this.props.hourlyRateArray["itStaff"] > 0.0,
				showFileTransferFeesInputs: false,
				hourArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				dayArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				numberOfStaffArray: { itStaff: 0, admin: 0, teacher: 0 }
			};

		this.calculateFees = this.calculateFees.bind(this);
		this.updateDayArray = this.updateDayArray.bind(this);
		this.updateHourArray = this.updateHourArray.bind(this);
		this.updateStaffArray = this.updateStaffArray.bind(this);
	}


	updateDayArray(inputType, dayAmount) {
		//eslint-disable-next-line
		this.state.dayArray[inputType] = dayAmount;
	}

	updateHourArray(inputType, hourAmount) {
		//eslint-disable-next-line
		this.state.hourArray[inputType] = hourAmount;
	}

	updateStaffArray(inputType, numberOfStaff) {
		//eslint-disable-next-line
		this.state.numberOfStaffArray[inputType] = numberOfStaff;
	}


	calculateFees() {

		console.log("FileTransferFees Vendor calculateFees: ", this.props.whatRendersNext);
		var feeArray = this.props.feeArray;


		feeArray["itLeadershipCosts"] += ((this.state.dayArray["itLeader"] * 24) + this.state.hourArray["itLeader"]) * this.props.hourlyRateArray["itLeader"];

		if (this.state.showITStaffInput)
			feeArray["itStaffCosts"] += (((this.state.dayArray["itStaff"] * 24) + this.state.hourArray["itStaff"]) * this.props.hourlyRateArray["itStaff"]) * this.state.numberOfStaffArray["itStaff"];

		this.props.updateParentState(feeArray, this.props.whatRendersNext);

	}

	render() {
		return (
			<div>
				<h1>Do you need to set-up security for file transfer?</h1>
				<Button className="yes" size="lg" color="primary" onClick={(e) => this.setState({ showFileTransferFeesInputs: true })}>Yes</Button>
				<Button className="no" size="lg" color="danger" onClick={(e) => this.props.updateParentState(this.props.feeArray, "vendorProvideUserTraining")}>No</Button>
				<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.backComponent(this.props.isFirstIntegration, this.props.whatRendersBack)}>Back</Button>
				<br />
				<br />
				{this.state.showFileTransferFeesInputs ?
					<div>
						{this.state.showITStaffInput ?
							<HoursDaysPeopleInput inputType="itStaff" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} />
							: null}

						<HoursDaysPeopleInput inputType="itLeader" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} />
						<div style={{ float: "right" }}>
							<Button size="lg" className="next" outline color="primary" onClick={(e) => this.calculateFees()}>Next</Button>
						</div>
					</div>

					: null}
			</div>
		);
	}
}



class Supporting extends React.Component {
	constructor(props) {
		super(props);
		this.state =
			{
				showITStaffInput: this.props.hourlyRateArray["itStaff"] > 0.0,
				showSupportingVendorInputs: false,
				hourArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				dayArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
				numberOfStaffArray: { itStaff: 0, admin: 0, teacher: 0 }
			};
		this.calculateFees = this.calculateFees.bind(this);
		this.updateDayArray = this.updateDayArray.bind(this);
		this.updateHourArray = this.updateHourArray.bind(this);
		this.updateStaffArray = this.updateStaffArray.bind(this);

		console.log("Supporting Vendor: ", this.props.whatRendersNext);
	}


	updateDayArray(inputType, dayAmount) {
		//eslint-disable-next-line
		this.state.dayArray[inputType] = dayAmount;
	}

	updateHourArray(inputType, hourAmount) {
		//eslint-disable-next-line
		this.state.hourArray[inputType] = hourAmount;
	}

	updateStaffArray(inputType, numberOfStaff) {
		//eslint-disable-next-line 
		this.state.numberOfStaffArray[inputType] = numberOfStaff;
	}

	calculateFees() {

		console.log("Supporting Vendor calculateFees: ", this.props.whatRendersNext);
		var feeArray = this.props.feeArray;


		feeArray["itLeadershipCosts"] += ((this.state.dayArray["itLeader"] * 24) + this.state.hourArray["itLeader"]) * this.props.hourlyRateArray["itLeader"];

		if (this.state.showITStaffInput)
			feeArray["itStaffCosts"] += (((this.state.dayArray["itStaff"] * 24) + this.state.hourArray["itStaff"]) * this.props.hourlyRateArray["itStaff"]) * this.state.numberOfStaffArray["itStaff"];

		this.props.updateParentState(feeArray, this.props.whatRendersNext);

	}

	render() {


		return (


			<div>
				<h1>{(this.props.integrationType === "Vendor" || this.props.integrationType === "Custom") ? "Will you/have you spent time supporting vendor?" : "Will you/have you spent time supporting the consultant?"}
					(this includes meetings/phone calls and any data mapping/cleaning/validating)</h1>
				<Button size="lg" className="yes" color="primary" onClick={(e) => this.setState({ showSupportingVendorInputs: true })}>Yes</Button>
				<Button size="lg" className="no" color="danger" onClick={(e) => this.props.updateParentState(this.props.feeArray, this.props.whatRendersNext)}>No</Button>
				<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.backComponent(this.props.isFirstIntegration, this.props.whatRendersBack)}>Back</Button>
				<br />
				<br />
				{this.state.showSupportingVendorInputs ?
					<div>
						{this.state.showITStaffInput ?
							<HoursDaysPeopleInput inputType="itStaff" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} />
							: null}

						<HoursDaysPeopleInput inputType="itLeader" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} />
						<div style={{ float: "right" }}>
							<Button size="lg" className="next" outline color="primary" onClick={(e) => this.calculateFees()}>Next</Button>
						</div>
					</div>

					: null}
			</div>
		)
	}
}

class Integration extends React.Component {

	constructor(props) {
		super(props);
		this.state =
			{
				feeArray: this.props.feeArray,
				whatRendersNext: this.props.integrationType === "Custom" ? "supporting" : "firstFlatRate",
				hourlyRateArray: this.props.hourlyRateArray,
				showInputArray: {}
			};
		console.log("Integration constructor: ", this.props.hourlyRateArray);
		console.log("Integration constructor systemPairing: ", this.props.systemPairing);
		this.flatRateCallback = this.flatRateCallback.bind(this);
		this.updateStateCB = this.updateStateCB.bind(this);
		this.backComponent = this.backComponent.bind(this);
	}


	flatRateCallback(flatRateAmount, isOneTimeFee, whatRendersNext) {
		if (isOneTimeFee) {
			console.log(this.state.feeArray["oneTimeFee"]);
			//eslint-disable-next-line 
			this.state.feeArray["oneTimeFee"] += flatRateAmount;
		}
		else {
			//eslint-disable-next-line
			this.state.feeArray["reOccurringFees"] += flatRateAmount;
		}
		this.setState({ whatRendersNext: whatRendersNext });

		console.log("Integration flat rate callback: ", this.state.feeArray);
	}

	backComponent(isFirstIntegration, componentName) {
		if (!!isFirstIntegration) {
			if (!!this.props.updateParentState) this.props.updateParentState(null, componentName);
		} else {
			this.setState({
				whatRendersNext: componentName
			})
		}
	}

	updateStateCB(feeArray, whatRendersNext, hourlyRateArray, showInputArray) {
		this.setState({ feeArray: feeArray, whatRendersNext: whatRendersNext });


		//InputArray maybe undefined 
		if (showInputArray != null)
			this.setState({ showInputArray: showInputArray })
		//console.log("Integration Update State CB: ", this.state.feeArray);
		//console.log("Integration UpdateStateCB showInputArray: ", this.state.showInputArray);
		//console.log("Integration UpdateStateCB: ", whatRendersNext);
	}



	render() {
		if (this.state.whatRendersNext === "firstFlatRate")
			return <FlatRate isOneTimeFee={true} questionText="Do you have a flat rate amount?" backComponent={this.backComponent} updateParentState={this.flatRateCallback}
				feeArray={this.state.feeArray} isFirstIntegration={true} whatRendersNext="supporting" whatRendersBack="isHandleIntegrationsNext" />

		if (this.state.whatRendersNext === "supporting")
			return <Supporting feeArray={this.state.feeArray} hourlyRateArray={this.state.hourlyRateArray} backComponent={this.backComponent}
				updateParentState={this.updateStateCB} isFirstIntegration={this.props.integrationType === "Custom" ? true : false} whatRendersBack={this.props.integrationType === "Custom" ? "isHandleIntegrationsNext" : "firstFlatRate"} whatRendersNext={this.props.integrationType === "Custom" ? "adhocConsultingFees" : "signOnOneTimeFee"} integrationType={this.props.integrationType} />

		//This only happens in Custom Integration type
		if (this.state.whatRendersNext === "adhocConsultingFees")
			return <FlatRate isOneTimeFee={true} backComponent={this.backComponent} questionText="Are there ad-hoc consulting fees for supporting in-house work?" updateParentState=
				{this.flatRateCallback} isFirstIntegration={false} whatRendersBack="supporting" whatRendersNext="signOnOneTimeFee" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //TODO Ask if one time fee

		if (this.state.whatRendersNext === "signOnOneTimeFee")
			return <FlatRate isOneTimeFee={true} backComponent={this.backComponent} questionText="Is there a one-time fee for setting-up sign on?" updateParentState=
				{this.flatRateCallback} isFirstIntegration={false} whatRendersBack="supporting" whatRendersNext="signOnReoccuringFee" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //Different message on vendor

		if (this.state.whatRendersNext === "signOnReoccuringFee")
			return <FlatRate isOneTimeFee={false} backComponent={this.backComponent} questionText="Are there re-occurring fees for maintaining sign-on?" updateParentState=
				{this.flatRateCallback} isFirstIntegration={false} whatRendersBack="signOnOneTimeFee" whatRendersNext="vendorFeeOneTimeFee" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //Different Message Vendor

		if (this.state.whatRendersNext === "vendorFeeOneTimeFee")
			return <FlatRate isOneTimeFee={true} backComponent={this.backComponent} questionText={(this.props.integrationType === "Vendor" || this.props.integrationType === "Custom") ? "Are there one-time vendor fees to set-up rostering?" : "Is there a one-time fee to set-up rostering?"}
				updateParentState={this.flatRateCallback} isFirstIntegration={false} whatRendersBack="signOnReoccuringFee" whatRendersNext="venderFeeReoccuringFees" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //Different Message for Con

		if (this.state.whatRendersNext === "venderFeeReoccuringFees")
			return <FlatRate isOneTimeFee={false} backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="vendorFeeOneTimeFee" questionText={(this.props.integrationType === "Vendor" || this.props.integrationType === "Custom") ? "Are there re-occuring vendor maintenance fees for rostering?" : "Are there re-occurring maintenance fees for rostering?"} updateParentState=
				{this.flatRateCallback} whatRendersNext={this.props.integrationType === "Custom" ? "manualDataEntry" : "setupSecurityForFileTransferFees"} feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //Different Message for con

		if (this.state.whatRendersNext === "setupSecurityForFileTransferFees") //TODO On Custom this will render manualMappingCleaningData
			return <FileTransferFees feeArray={this.state.feeArray} backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack={this.props.integrationType === "Custom" ? "oneSystemToAnother" : "venderFeeReoccuringFees" } updateParentState={this.updateStateCB} whatRendersNext={this.props.integrationType === "Custom" ? "manualMappingCleaningData"
				: "vendorProvideUserTraining"} hourlyRateArray={this.state.hourlyRateArray} />

		if (this.state.whatRendersNext === "vendorProvideUserTraining")
			return <YesNoQuestion backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="setupSecurityForFileTransferFees" whatRendersNextOnYes="vendorChangeSeparateFeeForTraining" whatRendersNextOnNo="relatedUserTraining" updateParentState={this.updateStateCB}
				feeArray={this.state.feeArray} questionText="Does vendor provide user training / related professional development?" />

		if (this.state.whatRendersNext === "vendorChangeSeparateFeeForTraining")
			return <FlatRate isOneTimeFee={true} backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="vendorProvideUserTraining" questionText="Does vendor charge a separate fee for training?" updateParentState=
				{this.flatRateCallback} whatRendersNext="receivesTraining" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //TODO Ask if this is one time fee or not

		if (this.state.whatRendersNext === "receivesTraining")
			return <SelectableDaysAndHours updateParentState={this.updateStateCB} backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="vendorChangeSeparateFeeForTraining" hourlyRateArray={this.state.hourlyRateArray} feeArray={this.state.feeArray}
				whatRendersNext="relatedUserTraining" questionText="Who receives the training?" />

		if (this.state.whatRendersNext === "relatedUserTraining")
			return <RelatedUserTraining backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="vendorProvideUserTraining" updateParentState={this.updateStateCB} hourlyRateArray={this.state.hourlyRateArray}
				feeArray={this.state.feeArray} whatRendersNext="additionalOneTimeFees" showInputArray={this.state.showInputArray} />

		if (this.state.whatRendersNext === "additionalOneTimeFees")
			return <FlatRate backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="relatedUserTraining" isOneTimeFee={true} questionText="Are there any additional one-time fees to add?" updateParentState=
				{this.flatRateCallback} whatRendersNext="additionalInHouseCosts" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //TODO Ask if this is one time fee or not

		if (this.state.whatRendersNext === "additionalInHouseCosts")
			return <FlatRate backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="additionalOneTimeFees" isOneTimeFee={true} questionText="Are there any additional in-house non-IT costs to add?" updateParentState=
				{this.flatRateCallback} whatRendersNext="summaryPage" feeArray={this.state.feeArray} key={this.state.whatRendersNext} /> //TODO Ask if this is one time fee or not








		if (this.state.whatRendersNext === "manualDataEntry")
			return <YesNoQuestion backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="venderFeeReoccuringFees" whatRendersNextOnYes="whoEntersData" whatRendersNextOnNo="oneSystemToAnother"
				updateParentState={this.updateStateCB} feeArray={this.state.feeArray} questionText="Is manual data entry or manual upload of .csv files required to get data into a system?" />

		if (this.state.whatRendersNext === "whoEntersData")
			return <SelectableDaysAndHours backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="manualDataEntry" updateParentState={this.updateStateCB} hourlyRateArray={this.state.hourlyRateArray} feeArray={this.state.feeArray}
				whatRendersNext="oneSystemToAnother" questionText="Who enters the  data?" />

		if (this.state.whatRendersNext === "oneSystemToAnother")
			return <YesNoQuestion backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="manualDataEntry" whatRendersNextOnYes="managesFiles" whatRendersNextOnNo="setupSecurityForFileTransferFees" updateParentState={this.updateStateCB}
				feeArray={this.state.feeArray} questionText="Is manual data entry or manual upload/download of .csv files required to get data from one system into another?" />

		if (this.state.whatRendersNext === "managesFiles")
			return <SelectableDaysAndHours backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="oneSystemToAnother" updateParentState={this.updateStateCB} hourlyRateArray={this.state.hourlyRateArray} feeArray={this.state.feeArray}
				whatRendersNext="setupSecurityForFileTransferFees" questionText="Who enters the data or manages the files?" />

		if (this.state.whatRendersNext === "manualMappingCleaningData")
			return <SelectableDaysAndHours updateParentState={this.updateStateCB} backComponent={this.backComponent} isFirstIntegration={false} whatRendersBack="setupSecurityForFileTransferFees" hourlyRateArray={this.state.hourlyRateArray} feeArray={this.state.feeArray}
				whatRendersNext="vendorProvideUserTraining" questionText="Who is involved with manual mapping/cleaning/validating data?" />

		if (this.state.whatRendersNext === "summaryPage")
			return <SummaryPage feeArray={this.state.feeArray} systemPairing={this.props.systemPairing} />


		return <h5>Could not find what page {this.state.whatRendersNext} to render</h5>
	}
}


export default Integration;