import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Interactive from 'react-interactive';

import FlipMove from 'react-flip-move';

import Project from '../projects/projectContainer';

class component extends Component {
	constructor(props) {
		super(props);
	}

	handleCatClick(id) {
		this.props.selectCat(id);
	}

	renderCat(cat, id) {
		return (
			<Interactive
		   		as='div'
				key={id}
				style={this.props.activeCat == id ? this.props.catActiveStyle : this.props.catStyle}
				hover={this.props.catHoverStyle}
				onClick={() => { this.handleCatClick(id) } } >
				{ cat }
			</Interactive>
		)
	}

	renderProject(project, id) {
		return (
			<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={id}>
			<Project project={project} key={id} />
			</div>
		)
	}

	render() {
		var items = this.props.projectsList.map((project, id) => this.renderProject(project, id));
		//var items = this.props.projectsList.map((project, id) => <Project project={project} key={id} /> );
		return (
			<div className="main-main-container col-xs-12" style={this.props.mainContainerStyle}>
				<div className="row">
					<div className="background-intro">
						<div className="introduction">
							<div className="header" style={this.props.headerStyle}>
								Join the Revolution
							</div>
							<img className="logo" src="./pics/logo.png" width='50' />
							<div className="sub-header" style={this.props.subHeaderStyle}>
								Fund projects and help producers that you loved
							</div>
						</div>
					</div>
					<div className="projects-container col-xs-12 col-sm-12 col-md-12 col-lg-12" style={this.props.projectsContainerStyle}>
						<div className="cat-container row" style={this.props.catListStyle}>
							{ this.props.catList.map((cat, id) => this.renderCat(cat, id)) }
						</div>
						<div className="project-list row" style={this.props.projectsListStyle}>
							<FlipMove enterAnimation="fade" leaveAnimation="fade" duration={1000}>
								{ items }
							</FlipMove>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default component;
