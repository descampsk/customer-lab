import React from 'react';
import { connect } from 'react-redux';

import component from './progressBar.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './progressBarStyle';

const mapStateToProps = (state) => {
	return {
		progressContainer: styles.progressContainer,
		beginLabelStyle: styles.beginLabel,
		endLabelStyle: styles.endLabel,
		progressStyle: styles.progress,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
