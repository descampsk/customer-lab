import React, { Component } from 'react';
import { Route } from 'react-router';

import Header from '../header/container';
import Footer from '../footer/container';

import * as blockchain from '../utils/blockchain';

class App extends Component {
	constructor(props) {
		super(props);
	}

	publicKeyResponse(err, keys) {
		if (err) {
			console.log('error');
			console.log(err);
		} else {
			console.log("success");
			console.log(keys);
		}
		this.props.updateUserKeys(keys.userKeyList);
		this.props.updateProjectKeys(keys.projectKeyList);
		this.props.setActiveUser(keys.userKeyList[0]);
		return keys;
	}

	txResponse(err) {
		if (err) {
			console.log('error');
		} else {
			console.log('success');
		}
	}

	retrieveBlockchainKeys() {
		var context = this;
		blockchain.getAllPublicKeys(function(err, keys) {
			context.props.updateUserKeys(keys.userKeyList);
			context.props.updateProjectKeys(keys.projectKeyList);
			context.props.setActiveUser(keys.userKeyList[0]);
			return keys;
		});
	}

	setupApp() {
		this.props.fetchProjects();
		this.retrieveBlockchainKeys();
	}

	componentDidMount() {
		this.setupApp();
	}

				//<Footer />
	render() {
		return (
			<div className='app-container container-fluid' style={this.props.mainStyle}>
				<Header />
				<div style={this.props.containerStyle} id='container' className='container-main row'>
					{ this.props.children }
				</div>
			</div>
		)
	}
}

export default App;
