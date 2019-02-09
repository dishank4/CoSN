import React from 'react';
import './index.css';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class YesNoQuestion extends React.Component
{


	render()
	{
		return (

				<div>
					<h1>{this.props.questionText}</h1>
					<Button size="lg" className ="yes" color = "primary"  onClick={(e)=>this.props.updateParentState(this.props.feeArray, this.props.whatRendersNextOnYes)}>Yes</Button>
					<Button size="lg" className = "no" color = "danger"  onClick={(e)=>this.props.updateParentState(this.props.feeArray, this.props.whatRendersNextOnNo)}>No</Button>
					<Button size="lg" className="back" outline color="primary" onClick={(e) => this.props.backComponent(this.props.isFirstIntegration,this.props.whatRendersBack)}>Back</Button>
				</div>
			);
	}
}

export default YesNoQuestion;