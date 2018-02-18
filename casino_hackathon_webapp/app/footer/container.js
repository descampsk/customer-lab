import React from 'react';
import { connect } from 'react-redux';

import component from './component.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './style';

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (state) => {
	return {
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
