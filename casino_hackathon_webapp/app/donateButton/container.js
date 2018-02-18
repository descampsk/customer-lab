import React from 'react';
import { connect } from 'react-redux';

import component from './component.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './style';

import { success, error } from 'react-notification-system-redux';

import * as blockchain from '../utils/blockchain';

function checkValues(values, activeUser) {
	const activeUserFunds = activeUser.token1;
	if (!values.amount || values.amount < 0 || values.amount < activeUserFunds) {
		return false;
	}
	return true;
}

function handleDonate(dispatch, project, activeUser, values) {
	const successNotif = {
		title: 'You successfuly sent token to ' + project.companyName,
		message: 'Enjoy your reduction',
		position: 'tr',
		autoDismiss: '4'
	}
	const failureTx = {
		title: 'An unexpected error occured',
		message: 'No transactions was sent.',
		position: 'tr',
		autoDismiss: '4'
	}

	if (checkValues(values, activeUser)) {
		blockchain.
		console.log("donate to project " + project.projectName);
		dispatch(success(successNotif));
	} else {
		dispatch(error(failureNotif));
	}
}

function handleValueError(dispatch) {
	const wrongAmount = {
		title: 'Error on amount',
		message: 'The amount is incorrect. No transaction was sent.',
		position: 'tr',
		autoDismiss: '4'
	}
	dispatch(error(wrongAmount));
}

function handleBlockchainError(dispatch) {
	const chainErr = {
		title: 'Un expected error on the blockchain',
		message: 'No transaction was sent.',
		position: 'tr',
		autoDismiss: '4'
	}
	dispatch(error(chainErr));
}

function handleSuccessTx(dispatch, project) {
	const successNotif = {
		title: 'You successfuly sent token to ' + project.companyName,
		message: 'Enjoy your reduction',
		position: 'tr',
		autoDismiss: '4'
	}
	dispatch(success(successNotif));
}

const mapStateToProps = (state) => {
	return {
		activeUser: state.blockchain.activeUser,
		donateFormStyle: styles.donateForm,
		fieldStyle: styles.field,
		inputStyle: styles.input,
		labelStyle: styles.label,
		submitButtonStyle: styles.submitButton,
		notifications: state.notifications
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		donate: (project, activeUser, values) => { handleDonate(dispatch, project, activeUser, values) },
		errorOnValues: () => { handleValueError(dispatch) },
		errorOnBlockchain: () => { handleBlockchainError(dispatch) },
		successTx: (project) => { handleSuccessTx(dispatch, project) }
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
