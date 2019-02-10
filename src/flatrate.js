import React from 'react';
import './index.css';
import { Button, InputGroup, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { inputToCurrency, currencyToFloat } from './HelperFunctions.js'
import { reactLocalStorage } from 'reactjs-localstorage';



class FlatRate extends React.Component {

	constructor(props) {
		super(props);

		this.state =
			{
				showFlatRateInput: false,
				flatRateAmount: 0.0,
				flatRateAmountDisplayValue: "$0.00",
				placeHolderText: "$0.00",
				firstTimeInput: true

			};
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	componentDidMount(){
		console.log(this.props.cn)
		if(Object.keys(reactLocalStorage.getObject(this.props.cn)).length === 0){
			reactLocalStorage.setObject(this.props.cn,{ "flatRateAmount" : this.state.flatRateAmount, 'latRateAmountDisplayValue': this.state.latRateAmountDisplayValue})
		}else{
			var fra = reactLocalStorage.getObject(this.props.cn)
			this.state.flatRateAmount = fra['flatRateAmount']
			this.state.flatRateAmountDisplayValue = fra['latRateAmountDisplayValue']
		}
	}

	onChangeInput(value) {
		this.setState({ flatRateAmount: currencyToFloat(value), flatRateAmountDisplayValue: inputToCurrency(value) },function(){
			reactLocalStorage.setObject(this.props.cn , { 'flatRateAmount' : currencyToFloat(value) , 'latRateAmountDisplayValue': inputToCurrency(value)})
		});
	}

	onFocus() {
		if (this.state.firstTimeInput) {
			this.setState({ flatRateAmountDisplayValue: "$" });
			//eslint-disable-next-line
			this.state.firstTimeInput = false;
		}
	}

	render() {
		return (
			<div>

				<div>
					<h1>{this.props.questionText}</h1>
					<Button size="lg" className="yes" color="primary" onClick={(e) => this.setState({ showFlatRateInput: true })}>Yes</Button>
					<Button size="lg" className="no" color="danger" onClick={(e) => this.props.updateParentState(0.0, this.props.isOneTimeFee, this.props.whatRendersNext ,true,this.props.localState)}>No</Button>
					 { !this.props.notDisplayBack &&
						<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.backComponent(this.props.isFirstIntegration,this.props.whatRendersBack)}>Back</Button>
					 }
				</div>
				<br />
				{
					this.state.showFlatRateInput ?

						<div>
							<InputGroup>
								<Input value={this.state.flatRateAmountDisplayValue} type="text" onClick={(evt) => { this.onFocus() }} onChange={(evt) => this.onChangeInput(evt.target.value)} />
							</InputGroup>
							<br />
							<div style={{ float: "right" }}>
								<Button size="lg" className="next" outline color="primary" onClick={(e) => this.props.updateParentState(this.state.flatRateAmount, this.props.isOneTimeFee, this.props.whatRendersNext)}>Next</Button>
							</div>
						</div>
						: null
				}
			</div>
		);
	}
}


export default FlatRate;