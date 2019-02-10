import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { inputToCurrency } from './HelperFunctions.js'
import { reactLocalStorage } from 'reactjs-localstorage';



class SummaryPage extends React.Component {
	constructor(props) {
		console.log("summaryPage constructor systemPairing: ", props.systemPairing);
		super(props);
		this.state =
			{
				totalCost: this.props.feeArray["oneTimeFee"] + this.props.feeArray["reOccurringFees"] + this.props.feeArray["itLeadershipCosts"]
					+ this.props.feeArray["itStaffCosts"] + this.props.feeArray["nonITStaffCosts"],
				firstSystemPairing: this.props.systemPairing.split("/")[0],
				lastSystemPairing: this.props.systemPairing.split("/")[1],
				oneTimeFees: {},
				reOccurringFees: {},
				itLeadershipCosts: {},
				itStaffCosts: {},
				nonITStaffCosts: {},
				costInOccured: {},
				defaultCost: {},
				hourlyRate: {}
			}
	}

	componentDidMount() {
		const { oneTimeFees, hourlyRate, reOccurringFees, itLeadershipCosts, itStaffCosts, nonITStaffCosts, costInOccured, defaultCost } = this.state;
		for (let i = 0; i < window.localStorage.length; i++) {
			let key = window.localStorage.key(i);
			let value = JSON.parse(window.localStorage.getItem(key));
			if (Object.keys(value).length > 0) {
				switch (key) {
					case "CustomIntegration_additionalInHouseCosts":
						oneTimeFees[key] = value;
						break;
					case "CustomIntegration_additionalOneTimeFees":
						oneTimeFees[key] = value;
						break;
					case "HourlyRate":
						hourlyRate[key] = value;
						break;
					case "VettingProcess_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "VettingProcess_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "VettingProcess_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "VettingProcess_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VettingProcess_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VettingProcess_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VettingProcess_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VettingProcess_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VettingProcess_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VettingProcess_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VettingProcess_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VettingProcess_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VendorIntegration_firstFlatRate":
						oneTimeFees[key] = value;
						break;
					case "VendorIntegration_supporting_vendor_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VendorIntegration_supporting_vendor_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VendorIntegration_supporting_vendor_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VendorIntegration_supporting_vendor_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VendorIntegration_supporting_vendor_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VendorIntegration_supporting_vendor_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VendorIntegration_signOnOneTimeFee":
						oneTimeFees[key] = value;
						break;
					case "VendorIntegration_signOnReoccuringFee":
						reOccurringFees[key] = value;
						break;
					case "VendorIntegration_vendorFeeOneTimeFee":
						oneTimeFees[key] = value;
						break;
					case "VendorIntegration_venderFeeReoccuringFees":
						reOccurringFees[key] = value;
						break;
					case "FileTranferFee_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "FileTranferFee_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "FileTranferFee_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "FileTranferFee_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "FileTranferFee_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "FileTranferFee_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VendorIntegration_vendorChangeSeparateFeeForTraining":
						oneTimeFees[key] = value;
						break;
					case "VendorIntegration_receivesTraining_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "VendorIntegration_receivesTraining_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "VendorIntegration_receivesTraining_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "VendorIntegration_receivesTraining_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VendorIntegration_receivesTraining_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VendorIntegration_receivesTraining_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "VendorIntegration_receivesTraining_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VendorIntegration_receivesTraining_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VendorIntegration_receivesTraining_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VendorIntegration_receivesTraining_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VendorIntegration_receivesTraining_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "VendorIntegration_receivesTraining_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "RelatedUserTraining_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "RelatedUserTraining_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "RelatedUserTraining_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "RelatedUserTraining_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "RelatedUserTraining_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "RelatedUserTraining_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "RelatedUserTraining_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "RelatedUserTraining_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "RelatedUserTraining_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "RelatedUserTraining_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "RelatedUserTraining_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "RelatedUserTraining_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "VendorIntegration_additionalOneTimeFees":
						oneTimeFees[key] = value;
						break;
					case "VendorIntegration_additionalInHouseCosts":
						oneTimeFees[key] = value;
						break;
					case "ConsultantIntegration_firstFlatRate":
						oneTimeFees[key] = value;
						break;
					case "ConsultantIntegration_supporting_vendor_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "ConsultantIntegration_supporting_vendor_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "ConsultantIntegration_supporting_vendor_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "ConsultantIntegration_supporting_vendor_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "ConsultantIntegration_supporting_vendor_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "ConsultantIntegration_supporting_vendor_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "ConsultantIntegration_signOnOneTimeFee":
						oneTimeFees[key] = value;
						break;
					case "ConsultantIntegration_signOnReoccuringFee":
						reOccurringFees[key] = value;
						break;
					case "ConsultantIntegration_vendorFeeOneTimeFee":
						oneTimeFees[key] = value;
						break;
					case "ConsultantIntegration_venderFeeReoccuringFees":
						reOccurringFees[key] = value;
						break;
					case "ConsultantIntegration_vendorChangeSeparateFeeForTraining":
						oneTimeFees[key] = value;
						break;
					case "ConsultantIntegration_receivesTraining_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "ConsultantIntegration_receivesTraining_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "ConsultantIntegration_receivesTraining_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "ConsultantIntegration_receivesTraining_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "ConsultantIntegration_receivesTraining_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "ConsultantIntegration_receivesTraining_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "ConsultantIntegration_receivesTraining_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "ConsultantIntegration_receivesTraining_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "ConsultantIntegration_receivesTraining_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "ConsultantIntegration_receivesTraining_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "ConsultantIntegration_receivesTraining_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "ConsultantIntegration_receivesTraining_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "ConsultantIntegration_additionalOneTimeFees":
						oneTimeFees[key] = value;
						break;
					case "ConsultantIntegration_additionalInHouseCosts":
						oneTimeFees[key] = value;
						break;
					case "CustomIntegration_supporting_vendor_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegration_supporting_vendor_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegration_supporting_vendor_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegration_supporting_vendor_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegration_supporting_vendor_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegration_supporting_vendor_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegration_adhocConsultingFees":
						oneTimeFees[key] = value;
						break;
					case "CustomIntegration_signOnOneTimeFee":
						oneTimeFees[key] = value;
						break;
					case "CustomIntegration_signOnReoccuringFee":
						reOccurringFees[key] = value;
						break;
					case "CustomIntegration_vendorFeeOneTimeFee":
						oneTimeFees[key] = value;
						break;
					case "CustomIntegration_venderFeeReoccuringFees":
						reOccurringFees[key] = value;
						break;
					case "CustomIntegrationwhoEntersData_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationwhoEntersData_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationwhoEntersData_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationwhoEntersData_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationwhoEntersData_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationwhoEntersData_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationwhoEntersData_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationwhoEntersData_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationwhoEntersData_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationwhoEntersData_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegrationwhoEntersData_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegrationwhoEntersData_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;


					case "CustomIntegrationmanagesFiles_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationmanagesFiles_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationmanagesFiles_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationmanagesFiles_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationmanagesFiles_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationmanagesFiles_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationmanagesFiles_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationmanagesFiles_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationmanagesFiles_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationmanagesFiles_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegrationmanagesFiles_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegrationmanagesFiles_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;


					case "CustomIntegrationmanualMappingCleaningData_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationmanualMappingCleaningData_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationmanualMappingCleaningData_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegrationmanualMappingCleaningData_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationmanualMappingCleaningData_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationmanualMappingCleaningData_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegrationmanualMappingCleaningData_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationmanualMappingCleaningData_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationmanualMappingCleaningData_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegrationmanualMappingCleaningData_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegrationmanualMappingCleaningData_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegrationmanualMappingCleaningData_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegration_vendorChangeSeparateFeeForTraining":
						oneTimeFees[key] = value;
						break;




					case "CustomIntegration_receivesTraining_admin_Day":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegration_receivesTraining_admin_Hour":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegration_receivesTraining_admin_NumberOfStaffs":
						nonITStaffCosts[key] = value.admin;
						break;
					case "CustomIntegration_receivesTraining_teacher_Day":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegration_receivesTraining_teacher_Hour":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegration_receivesTraining_teacher_NumberOfStaffs":
						nonITStaffCosts[key] = value.teacher;
						break;
					case "CustomIntegration_receivesTraining_itLeader_Day":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegration_receivesTraining_itLeader_Hour":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegration_receivesTraining_itLeader_NumberOfStaffs":
						itLeadershipCosts[key] = value.itLeader;
						break;
					case "CustomIntegration_receivesTraining_itStaff_Day":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegration_receivesTraining_itStaff_Hour":
						itStaffCosts[key] = value.itStaff;
						break;
					case "CustomIntegration_receivesTraining_itStaff_NumberOfStaffs":
						itStaffCosts[key] = value.itStaff;
						break;

					default:
						defaultCost[key] = value;
				}
			}
		}
		this.setState({
			defaultCost: defaultCost,
			oneTimeFees: oneTimeFees,
			reOccurringFees: reOccurringFees,
			itLeadershipCosts: itLeadershipCosts,
			itStaffCosts: itStaffCosts,
			nonITStaffCosts: nonITStaffCosts,
			hourlyRate: hourlyRate
		}, function(){
			reactLocalStorage.clear();
		})
	}


	render() {
		const { defaultCost, oneTimeFees, reOccurringFees, itLeadershipCosts, itStaffCosts, nonITStaffCosts, hourlyRate } = this.state;
		if(hourlyRate['HourlyRate']){
			console.log("ac",hourlyRate['HourlyRate']['itLeader']);
		}
		return (
			<div>
				<h2>SUMMARY PAGE LINE ITEMS: </h2>
				<ul>
					<li>One-time fees: {inputToCurrency(this.props.feeArray["oneTimeFee"].toString())}
						<ul>
							{Object.keys(oneTimeFees).length > 0 &&
								Object.keys(oneTimeFees).map((index) => {
									return (<li key={index}>{index}->{ JSON.stringify(oneTimeFees[index])}</li>);
								})
							}
						</ul>
					</li>
					<li>Re-occurring fees: {inputToCurrency(this.props.feeArray["reOccurringFees"].toString())}
						<ul>
							{Object.keys(reOccurringFees).length > 0 &&
								Object.keys(reOccurringFees).map((index) => {
									return (<li key={index}>{index}->{JSON.stringify(reOccurringFees[index])}</li>);
								})
							}
						</ul>
					</li>
					<li>IT Leadership costs: {inputToCurrency(this.props.feeArray["itLeadershipCosts"].toString())} 
						<ul> 
							{(hourlyRate['HourlyRate']) && 
									<li> Leader Hourly Rate is -> {hourlyRate['HourlyRate']['itLeader']}</li>
							}
						</ul> 
						 
						<ul>
							{Object.keys(itLeadershipCosts).length > 0 &&
								Object.keys(itLeadershipCosts).map((index) => {
									return (<li key={index}>{index}->{JSON.stringify(itLeadershipCosts[index])}</li>);
								})
							}
						</ul>
					</li>
					<li>IT Staff costs (if applicable): {inputToCurrency(this.props.feeArray["itStaffCosts"].toString())}
						<ul> 
							{(hourlyRate['HourlyRate']) && 
									<li> IT Staff Hourly Rate is -> {hourlyRate['HourlyRate']['itStaff']}</li>
							}
						</ul>

						<ul>
							{Object.keys(itStaffCosts).length > 0 &&
								Object.keys(itStaffCosts).map((index) => {
									return (<li key={index}>{index}->{JSON.stringify(itStaffCosts[index])}</li>);
								})
							}
						</ul>
					</li>
					<li>Non-IT staff costs: {inputToCurrency(this.props.feeArray["nonITStaffCosts"].toString())}
						
							{(hourlyRate['HourlyRate']) && 
								<ul>
									<li> Admin Hourly Rate is -> {hourlyRate['HourlyRate']['admin']}</li>
									<li> Teacher Hourly Rate is -> {hourlyRate['HourlyRate']['teacher']}</li>
								</ul>
							}
						
						<ul>
							{Object.keys(nonITStaffCosts).length > 0 &&
								Object.keys(nonITStaffCosts).map((index) => {
									return (<li key={index}>{index}->{nonITStaffCosts[index]}</li>);
								})
							}
						</ul>
					</li>
					<hr />
					<li>Cost incurred due to lack of interoperability between {this.state.firstSystemPairing} & {this.state.lastSystemPairing} system: {inputToCurrency(this.state.totalCost.toString())}</li>
				</ul>
			</div>

		);
	}
}


export default SummaryPage;