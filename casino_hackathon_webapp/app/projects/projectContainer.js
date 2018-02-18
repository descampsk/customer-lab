import React from 'react';
import { connect } from 'react-redux';

import component from './project.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './projectStyle';

const mapStateToProps = (state) => {
	return {
		projectContainerStyle: styles.projectContainer,
		imgContainerStyle: styles.imgContainer,
		//imgWidth: styles.projectContainer.width,
		imgWidth: '100%',
		flagStyle: styles.flag,
		infoStyle: styles.info,
		nameStyle: styles.name,
		desStyle: styles.des,
		tagsStyle: styles.tags,
		tagInfoStyle: styles.tagInfo,
		tagIconStyle: styles.tagIcon,
		geolocStyle: styles.geoloc,
		geolocIconStyle: styles.geolocIcon,
		detailFundingStyle: styles.detailFunding,
		progressContainerStyle: styles.progressContainer,
		beginLabelStyle: styles.beginLabel,
		endLabelStyle: styles.endLabel,
		progressStyle: styles.progress,
		moreStyle: styles.more,
		seeMoreLabelStyle: styles.seeMoreLabel,
		seeMoreImgStyle: styles.seeMoreImg
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
