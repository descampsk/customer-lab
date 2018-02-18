import React from 'react';
import { connect } from 'react-redux';

import AppComponent from './AppComponent.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './AppStyle';

import { getUrlProjects, getOptionsProjects } from '../projects/projectsAPI';

import { getProjects } from '../projects/projectsActions';

import { setUserKeys, setProjectKeys } from '../utils/blockchainActions';

import { setActiveUser } from '../header/menuActions';

function handleFetchProjects(dispatch) {
	var url = getUrlProjects();
	var options = getOptionsProjects();
	dispatch(getProjects(url, options));
}

const mapStateToProps = (state) => {
	return {
		containerStyle: styles.container
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProjects: () => { handleFetchProjects(dispatch) },
		updateUserKeys: (keys) => { dispatch(setUserKeys(keys)) },
		updateProjectKeys: (keys) => { dispatch(setProjectKeys(keys)) },
		setActiveUser: (key) => { dispatch(setActiveUser(key)) }
	}
}

const App = connect(
		mapStateToProps,
		mapDispatchToProps
)(AppComponent);

export default App;
