import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Interactive from 'react-interactive';

import { Form, Control } from 'react-redux-form';

import { Player } from 'video-react';

import * as blockchain from '../utils/blockchain';

import Notifications from 'react-notification-system-redux';

class component extends Component {
	constructor(props) {
		super(props);
	}

	checkValues(values, activeUser) {
		const funds = parseInt(activeUser.token1);
		const amount = parseInt(values.amount);
		if (!amount || amount < 0 || amount > funds) {
			console.log("funds is");
			console.log(funds);
			console.log("amount is");
			console.log(amount);
			return false;
		} else {
			return true;
		}
	}

	sendTxResponse(err) {
		if (err) {
			this.props.errorOnBlockchain();
		} else {
			this.props.successTx();
		}
	}

	getKeyForProject(project) {
		return "0xd2403E3309738D2774631506DCf6B1cfA0F8EcD9";
	}

	handleDonateSubmit(values) {
		var context = this;

		const activeUser = this.props.activeUser;
		const project = this.props.project;
		const amount = values.amount;

		if (this.checkValues(values, activeUser)) {
			blockchain.sendFundToEntreprise(activeUser.key, this.getKeyForProject(project), parseInt(amount), (err) => {
				if (err) {
					context.props.errorOnBlockchain();
				} else {
					context.props.successTx(context.props.project);
				}
			});
		} else {
			this.props.errorOnValues();
		}
		//console.log("donate activate");
		//this.props.donate(this.props.project, this.props.activeUser, values);
	}

	render() {
		return (
			<Form model='forms.donate' onSubmit={this.handleDonateSubmit.bind(this)} style={this.props.donateFormStyle}>
				<div className="field" style={this.props.fieldStyle}>
					<Control.text model='.amount' placeholder="Amount" style={this.props.inputStyle} />
					<label style={this.props.labelStyle}>Tokens
					</label>
				</div>
				<button type="submit" style={this.props.submitButtonStyle}>
					Donate
				</button>
			</Form>
		)
	}
}

export default component;
