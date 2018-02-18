import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Switch, Link } from 'react-router-dom';

import ReactDOM from 'react-dom';

const ErrorNotFound = (props) => (
		<h2>Error: URL not found</h2>
)

import MainLayoutContainer from '../app/AppContainer';
import MainView from '../main/container';
import Setup from '../setup/container';
import Project from '../project/container';

class Routes extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MainLayoutContainer>
				<Switch>
					<Route path="/test" render={() => (
						<div><h3>[!!!!]This is a test [!!!!]</h3></div>
					)} />
					<Route path="/projects/:projectId" render={({children}) => {
						return (
							<Project />
						)
					}} />
					<Route path="/setup" render={() => {
						return (
							<Setup />
						)
					}} />
					<Route exact path="/" render={() => {
						return (
							<MainView />
						)
					}} />
					<Route render={() => (
						<ErrorNotFound />
					)} />
				</Switch>
			</MainLayoutContainer>
		)
	}
}

export default Routes;
