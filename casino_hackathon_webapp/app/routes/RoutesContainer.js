import React from 'react';
import { connect } from 'react-redux';

import RoutesComponent from './RoutesComponent.jsx';

import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (state) => {
	return {
	}
}

const Routes = connect(
		mapStateToProps,
		mapDispatchToProps
)(RoutesComponent);

export default withRouter(Routes);
