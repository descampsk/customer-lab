import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Interactive from 'react-interactive';

import { Player } from 'video-react';

import ProgressBar from '../projects/progressBarContainer';

import DonateButton from '../donateButton/container';

import { dealWithLineBreak } from '../utils/utils';

import Notifications from 'react-notification-system-redux';

import YoutubeVideo from 'react-youtube-video';

class component extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.resetDetailTab();
		window.scrollTo(0, 0);
	}

	getTagIconUrl() {
		return '../pics/tag_red.png';
	}

	getGeolocIconUrl() {
		return '../pics/geoloc_red.png';
	}

	getPicUrl(project) {
		return '../pics/' + project.projectPicUrl;
	}

	getTagsFromProject(project) {
		return project.tags.split(',');
	}

	renderTag(tag, id) {
		return (
			<div className="tag" key={id} style={this.props.tagCardStyle}>
				{ tag }
			</div>
		)
	}

	handlePanelHeaderClick(id) {
		this.props.setDetailView(id);
	}

	renderPanelHeader(header, id) {
		var style = this.props.activePanel == id ? this.props.panelHeaderActiveStyle : this.props.panelHeaderStyle;
		return (
			<Interactive
				as='div'
				key={id}
				className='col-xs-4'
				style={this.props.activePanel == id ? this.props.panelHeaderActiveStyle : this.props.panelHeaderStyle}
				hover={this.props.panelHeaderHoverStyle}
				onClick={() => { this.handlePanelHeaderClick(id) }}>
				{ header }
			</Interactive>
		)
	}

	renderDetailPanel(id, project) {
		switch(id) {
			case 0:
				return this.renderDetailProject(project);
			case 1:
				return this.renderDetailDonation(project);
			case 2:
				return this.renderDetailComments(project);
		}
	}

	renderDetailProject(project) {
		return (
			<div className="detail-project-container" style={this.props.detailViewStyle}>
				<div className="header-detail-view" style={this.props.detailViewHeaderStyle}>
					Description:
				</div>
				<div className="main-detail-view" style={this.props.detailViewMainStyle}>
					{ dealWithLineBreak(project.longDescription) }
				</div>
			</div>
		)
	}

	renderDetailDonation(project) {
		return (
			<div className="detail-project-container" style={this.props.detailViewStyle}>
				<div className="header-detail-view" style={this.props.detailViewHeaderStyle}>
					Past Donation:
				</div>
				<div className="main-detail-view" style={this.props.detailViewMainStyle}>
					{ dealWithLineBreak(project.longDescription) }
				</div>
			</div>
		)
	}

	renderDetailComments(project) {
		return (
			<div className="detail-project-container" style={this.props.detailViewStyle}>
				<div className="header-detail-view" style={this.props.detailViewHeaderStyle}>
					Comments:
				</div>
				<div className="main-detail-view" style={this.props.detailViewMainStyle}>
					{ dealWithLineBreak(project.longDescription) }
				</div>
			</div>
		)
	}

	render() {
		const projectId = this.props.match.params.projectId;
		var project = this.props.projects.filter(project => project['_id'] == projectId)[0];
		var tags = project.tags.split(',');
		const panels = ['Project', 'Past Donation', 'Comments'];
		return (
			<div className="main-project-container col-xs-12" style={this.props.mainProjectContainer}>
				<div className='cover-container row' style={this.props.coverContainerStyle}>
					<div className="video-container col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-1" style={this.props.videoContainerStyle}>
						<YoutubeVideo url="https://www.youtube.com/watch?v=8lsdLFsnCX4"/>
					</div>
					<div className="cover-card col-xs-10 col-xs-offset-1 col-md-3" style={this.props.coverCardStyle}>
						<div className="project-name" style={this.props.projectNameCardStyle}>
							{ project.projectName }
						</div>
						<div className="description" style={this.props.descriptionCardStyle}>
							{ dealWithLineBreak(project.description) }
						</div>
						<div className="tags" style={this.props.tagsCardContainerStyle}>
							<span style={this.props.tagIconStyle}>
								<img src={this.getTagIconUrl()} width='10' />
							</span>
							{ tags && tags.map((tag, id) => this.renderTag(tag, id)) }
						</div>
						<div className="geoloc" style={this.props.geolocCardStyle}>
							<span style={this.props.geolocIconStyle}>
								<img src={this.getGeolocIconUrl()} width='10' />
							</span>
							{ project.geoloc }
						</div>
						<div className="card-footer col-xs-12" style={this.props.cardFooterStyle}>
							<div className='progress-bar-container' style={this.props.progressBarContainerStyle}>
								<ProgressBar project={project} />
							</div>
							<DonateButton project={project} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="detail-panel-container col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2" style={this.props.detailPanelContainerStyle}>
						<div className="detail-header" style={this.props.detailHeaderStyle}>
							<div className="">
								{ panels.map((header, id) => this.renderPanelHeader(header, id)) }
							</div>
						</div>
						{ this.renderDetailPanel(this.props.activePanel, project) }
					</div>
				</div>
				<Notifications notifications={this.props.notifications} style={{NotificationItem: {DefaultStyle: {marginTop: '55px'}}}}/>
			</div>
		)
	}
}

export default component;
