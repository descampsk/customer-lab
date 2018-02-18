import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import { Line } from 'rc-progress';
import { getEntrepriseFunds } from '../utils/blockchain.js'
import { getAllPublicKeys } from '../utils/blockchain.js'

class progressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 progression: 0,
		 target: 10000,
		 //TODO récupérer le veritable target
		 fund: 0
	 }
	}

	componentDidMount() {
		var context = this;

		//TODO : mettre le véritable id du composant
		//var idComponent = 3;


		console.log("public key is " + this.props.project.publicKey + ' name is ' + this.props.project.companyName);

		getEntrepriseFunds(this.props.project.publicKey, function(err, result2) {
			console.log(context.props.project.publicKey + ' ' + result2.balance);
			var progression = Math.floor(result2.balance/context.state.target * 100);
			if(progression>100) {
				progression =100;
			}
			context.setState( {
				progression: progression,
				fund: result2.balance
			});
		});
	}



	render() {
		return (
			<div className="-progress-bar">
     			<div className='initial' style={this.props.beginLabelStyle}>
          			{this.state.fund + ' / ' + this.state.target}
       			</div>
        		<div className='end-label' style={this.props.endLabelStyle}>
             		{ this.props.project.required }
          		</div>
           		<Line percent={this.state.progression} strokeWidth='4' strokeColor="black" />
            	<div className='progress' style={this.props.progressStyle}>
                 	{ this.state.progression + ' %' }
              	</div>
           </div>
		)
	}
}

export default progressBar;
