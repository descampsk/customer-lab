import React from 'react';
import { connect } from 'react-redux';

import component from './component.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './style';

import { selectCat } from '../projects/projectsActions';

function getCatList(state) {
	return state.projects.reduce((arr, item, id) => {
		if (arr.indexOf(item.category) == -1) {
			arr.push(item.category);
		}
		return arr;
	}, ['All']);
}

function getProjectsList(state) {
	const catArray = getCatList(state);
	const filter = state.projectsFilter.selectedCat;
	var res = state.projects.reduce((arr, item, id) => {
		if (!filter || catArray.indexOf(item.category) == filter) {
			arr.push(item);
		}
		return arr;
	}, []);
	console.log(res);
	return res;
}

const mapStateToProps = (state) => {
	return {
		catList: getCatList(state),
		projectsList: getProjectsList(state),
		activeCat: state.projectsFilter.selectedCat,
		mainContainerStyle: styles.mainContainer,
		headerStyle: styles.header,
		subHeaderStyle: styles.subHeader,
		projectsContainerStyle: styles.projectsContainer,
		catListStyle: styles.catList,
		projectsListStyle: styles.projectsList,
		illustrationImageStyle: styles.illustrationImage,
		catStyle: styles.cat,
		catHoverStyle: styles.catHover,
		catActiveStyle: styles.catActive
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		selectCat: (id) => { dispatch(selectCat(id)) }
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
