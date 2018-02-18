import React from 'react';
import { connect } from 'react-redux';

import component from './component.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './style';

import { resetDetailView, setDetailView } from './projectActions';

const mapStateToProps = (state) => {
	return {
		projects: state.projects,
		activePanel: state.projectView.selectedView,
		mainProjectContainer: styles.projectContainer,
		coverContainerStyle: styles.coverContainer,
		coverImgStyle: styles.coverImg,
		infoContainerStyle: styles.infoContainer,
		projectNameCardStyle: styles.projectNameCard,
		descriptionCardStyle: styles.descriptionCard,
		tagsCardContainerStyle: styles.tagsCardContainer,
		tagCardStyle: styles.tagCard,
		tagIconStyle: styles.tagIcon,
		geolocCardStyle: styles.geolocCard,
		geolocIconStyle: styles.geolocIcon,
		cardFooterStyle: styles.cardFooter,
		progressBarContainerStyle: styles.progressBarContainer,
		videoContainerStyle: styles.videoContainer,
		coverCardStyle: styles.coverCard,
		detailPanelContainerStyle: styles.detailPanelContainer,
		detailHeaderStyle: styles.detailHeader,
		detailHeaderButtonStyle: styles.detailHeaderButton,
		panelHeaderActiveStyle: styles.panelHeaderActive,
		panelHeaderStyle: styles.panelHeader,
		panelHeaderHoverStyle: styles.panelHeaderHover,
		detailViewStyle: styles.detailView,
		detailViewHeaderStyle: styles.detailViewHeader,
		detailViewMainStyle: styles.detailViewMain,
		notifications: state.notifications
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetDetailTab: () => { dispatch(resetDetailView()) },
		setDetailView: (tabId) => { dispatch(setDetailView(tabId)) }
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
