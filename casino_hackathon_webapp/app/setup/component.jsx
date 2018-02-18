import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Interactive from 'react-interactive';

import { Form, Field, Control, Errors } from 'react-redux-form';

class component extends Component {
	constructor(props) {
		super(props);
	}

	handleNewProjSubmit(values) {
		this.props.submitNewProj(values);
	}

	renderNewProjectForm() {
		return (
			<Form model="forms.newProj" onSubmit={this.handleNewProjSubmit.bind(this)} style={this.props.newProjFormStyle}>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Category:
					</label>
					<Control.text model='.category' placeholder="Category" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Public Key:
					</label>
					<Control.text model='.publicKey' placeholder="publicKey" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Company Name:
					</label>
					<Control.text key="t" model='.companyName' placeholder="Company Name" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Project Name:
					</label>
					<Control.text model='.projectName' placeholder="Project Name" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Description:
					</label>
					<Control.textarea model='.description' placeholder="Short description" style={this.props.textAreaStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Long description:
					</label>
					<Control.textarea model='.longDescription' placeholder="Long description" style={this.props.textAreaStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Remaining Days:
					</label>
					<Control.text model='.daysLeft' placeholder="nb of days left" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Pic Url for project:
					</label>
					<Control.text model='.projectPicUrl' placeholder="Url of the project's picture" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Pic url for company:
					</label>
					<Control.text model='.companyPicUrl' placeholder="Url of the company's picture" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Tags:
					</label>
					<Control.text model='.tags' placeholder="Some tags..." style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Geoloc:
					</label>
					<Control.text model='.geoloc' placeholder="Geoloc" style={this.props.inputStyle} />
				</div>
				<div className="field" style={this.props.fieldStyle}>
					<label style={this.props.labelStyle}>Quote:
					</label>
					<Control.text model='.quote' placeholder="Quote" style={this.props.inputStyle} />
				</div>
				<button type="submit" style={this.props.buttonStyle}>
					Submit
				</button>
				<Control.reset model="forms.newProj" style={this.props.secondaryButton}>
					Clear
				</Control.reset>
			</Form>
				
		)			
	}

	render() {
		return (
			<div className='setup-container' style={this.props.setupContainerStyle}>
				<div className="header" style={this.props.headerStyle}>
					Setup
				</div>
				<div className="projects" style={this.props.groupStyle}>
					<div className="title" style={this.props.groupTitleStyle}>
						Projects
					</div>
					<div className="add-projects" style={this.props.subGroupStyle}>
						<div className="sub-title" style={this.props.subGroupTitleStyle}>
							Add new projects
						</div>
						{ this.renderNewProjectForm() }
					</div>
				</div>
			</div>
		)
	}
}

export default component;
