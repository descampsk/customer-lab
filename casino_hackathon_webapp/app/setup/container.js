import React from 'react';
import { connect } from 'react-redux';

import component from './component.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './style';

import { getUrlNewProj, getOptionsNewProj, getBodyNewProj } from '../projects/projectsAPI';
import { postNewProj } from '../projects/projectsActions';

function addSpecToValues(val) {
	return val;
}

function handleSubmitNewProj(dispatch, values) {
	var url = getUrlNewProj();
	var options = getOptionsNewProj();
	var _val = addSpecToValues(values);
	var body = getBodyNewProj(_val);
	dispatch(postNewProj(url, options, JSON.stringify(body)));
}

const mapStateToProps = (state) => {
	return {
		setupContainerStyle: styles.setupContainer,
		headerStyle: styles.header,
		groupStyle: styles.group,
		groupTitleStyle: styles.groupTitle,
		subGroupStyle: styles.subGroup,
		subGroupTitleStyle: styles.subGroupTitle,
		newProjFormStyle: styles.newProjForm,
		fieldStyle: styles.field,
		labelStyle: styles.label,
		inputStyle: styles.input,
		textAreaStyle: styles.textArea,
		buttonFormStyle: styles.buttonForm,
		secondaryFormButtonStyle: styles.secondaryButtonForm
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitNewProj: (values) => { handleSubmitNewProj(dispatch, values) }
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
