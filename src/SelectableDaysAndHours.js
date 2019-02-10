import React from 'react';
import './index.css';
import { Button, ButtonGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HoursDaysPeopleInput from './HoursDaysPeopleInput.js'

class SelectableDaysAndHours extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cSelected: [], showITStaffButton: this.props.hourlyRateArray["itStaff"] > 0.0,
			itStaffHasHourlyRate: false,
			showInputArray: { showITLeaderInput: false, showITStaffInput: false, showAdminInput: false, showTeacherInput: false },
			hourArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 }, dayArray: { itLeader: 0.0, itStaff: 0.0, admin: 0.0, teacher: 0.0 },
			numberOfStaffArray: { itStaff: 0, admin: 0, teacher: 0 }
		};


		console.log(this.props.hourlyRateArray);

		this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
		this.calculateFees = this.calculateFees.bind(this);
		this.updateDayArray = this.updateDayArray.bind(this);
		this.updateHourArray = this.updateHourArray.bind(this);
		this.updateStaffArray = this.updateStaffArray.bind(this);
	}



	onCheckboxBtnClick(selected) {
		const index = this.state.cSelected.indexOf(selected);
		if (index < 0) {
			this.state.cSelected.push(selected);
		}
		else {
			this.state.cSelected.splice(index, 1);
		}
		this.setState({ cSelected: [...this.state.cSelected] });


		var tempShowInputArray = this.state.showInputArray;
		switch (selected) {
			case 1:
				tempShowInputArray["showITLeaderInput"] = !tempShowInputArray["showITLeaderInput"];
				break;
			case 2:
				tempShowInputArray["showITStaffInput"] = !tempShowInputArray["showITStaffInput"];
				break;
			case 3:
				tempShowInputArray["showAdminInput"] = !tempShowInputArray["showAdminInput"];
				break;
			case 4:
				tempShowInputArray["showTeacherInput"] = !tempShowInputArray["showTeacherInput"];
				break;
		}
		this.setState({ showInputArray: tempShowInputArray });

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
		if (this.state.showInputArray["showITLeaderInput"])
			feeArray["itLeadershipCosts"] += ((this.state.dayArray["itLeader"] * 24) + this.state.hourArray["itLeader"]) * this.props.hourlyRateArray["itLeader"];

		if (this.state.showInputArray["showITStaffInput"])
			feeArray["itStaffCosts"] += (((this.state.dayArray["itStaff"] * 24) + this.state.hourArray["itStaff"]) * this.props.hourlyRateArray["itStaff"]) * this.state.numberOfStaffArray["itStaff"];

		if (this.state.showInputArray["showAdminInput"])
			feeArray["nonITStaffCosts"] += (((this.state.dayArray["admin"] * 24) + this.state.hourArray["admin"]) * this.props.hourlyRateArray["admin"]) * this.state.numberOfStaffArray["admin"];

		if (this.state.showInputArray["showTeacherInput"])
			feeArray["nonITStaffCosts"] += (((this.state.dayArray["teacher"] * 24) + this.state.hourArray["teacher"]) * this.props.hourlyRateArray["teacher"]) * this.state.numberOfStaffArray["teacher"];

		console.log("SelectableDaysAndHours feeArray: ", feeArray);
		this.props.updateParentState(feeArray, this.props.whatRendersNext, null, this.state.showInputArray);
	}

	render() {
		return (
			<div>
				<h1>{this.props.questionText}</h1>
				<br />
				<h5>Select all that Apply:</h5>
				<ButtonGroup>
					<Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>IT Leader</Button>
					{this.state.showITStaffButton ? <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>IT Staff</Button> : null}
					<Button color="primary" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}>Admin</Button>
					<Button color="primary" onClick={() => this.onCheckboxBtnClick(4)} active={this.state.cSelected.includes(4)}>Teacher</Button>
				</ButtonGroup>
				<br />
				<br />

				{this.state.showInputArray["showITLeaderInput"] ?
					<HoursDaysPeopleInput inputType="itLeader" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} cn={this.props.cn} />
					: null}

				{this.state.showInputArray["showITStaffInput"] ?
					<HoursDaysPeopleInput inputType="itStaff" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} cn={this.props.cn} />

					: null}

				{this.state.showInputArray["showAdminInput"] ?
					<HoursDaysPeopleInput inputType="admin" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} cn={this.props.cn} />
					: null}

				{this.state.showInputArray["showTeacherInput"] ?

					<HoursDaysPeopleInput inputType="teacher" dayUpdateCB={this.updateDayArray} hourUpdateCB={this.updateHourArray} staffUpdateCB={this.updateStaffArray} cn={this.props.cn} />

					: null}

				<div style={{ float: "right" }}>
					<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.backComponent(this.props.isFirstIntegration,this.props.whatRendersBack)}>Back</Button>
					<Button className="next" size="lg" outline color="primary" onClick={(e) => this.calculateFees()}>Next</Button>
				</div>

			</div>
		)
	}
}


export default SelectableDaysAndHours;