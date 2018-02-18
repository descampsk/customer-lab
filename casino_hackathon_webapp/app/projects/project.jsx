import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import Interactive from 'react-interactive';

import { Line } from 'rc-progress';

import ProgressBar from './progressBarContainer';

import SimpleMap from './googleMap.js';

class component extends Component {
	constructor(props) {
		super(props);
	}

	getTagIconUrl() {
		return "./pics/tag_red.png";
	}

	getGeolocIconUrl() {
		return "./pics/geoloc_red.png";
	}

	getPicUrl() {
		return './pics/' + this.props.project.daysLeft;
	}

	renderTag(tag, id) {
		return (
			<div className="tag" key={id} style={this.props.tagInfoStyle}>
				{ tag }
			</div>
		)
	}

	render() {
		const _tags = this.props.project.tags;
		var tags = _tags ? _tags.split(',') : [];
		return (
			<div className="project-container col-xs-12" style={this.props.projectContainerStyle}>
				<div className="row">
					<div className="img-container" style={this.props.imgContainerStyle}>
						<img src={this.getPicUrl()} width={this.props.imgWidth} />
						<div className="flags" style={this.props.flagStyle}>
							Flag
						</div>
					</div>
					<div className="project-info" style={this.props.infoStyle}>
						<div className="project-name" style={this.props.nameStyle}>
							{ this.props.project.projectName }
						</div>
						<div className="project-des" style={this.props.desStyle}>
							{ this.props.project.description }
						</div>
						<div className="project-tags" style={this.props.tagsStyle}>
							<span className="tag-icon" style={this.props.tagIconStyle}>
								<img src={this.getTagIconUrl()} width="10" />
							</span>
							{ tags && tags.map((tag, id) => this.renderTag(tag, id)) }
						</div>
						<div className="project-geoloc" style={this.props.geolocStyle}>
							<span className="geoloc-icon" style={this.props.geolocIconStyle}>
								<img src={this.getGeolocIconUrl()} width="10" />
							</span>
							{ this.props.project.geoloc }
						</div>
						<div className="google-map">
							<SimpleMap project={this.props.project} />
						</div>
					</div>
					<div className="detail-funding" style={this.props.detailFundingStyle}>
						<div className='progress-container' style={this.props.progressContainerStyle}>
							<ProgressBar project={this.props.project} />
						</div>
						<div className="more" style={this.props.moreStyle}>
							<Link to={'/projects/' + this.props.project['_id']}>
								<div className='see-more' style={this.props.seeMoreLabelStyle}>
									see more
								</div>
								<img src="./pics/seeMore.png" width='50' style={this.props.seeMoreImgStyle} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default component;
