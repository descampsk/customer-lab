import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Radium from 'radium';
import Interactive from 'react-interactive';

import * as blockchain from '../utils/blockchain';

class component extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		setInterval(() => {
			var context = this;
			blockchain.getUserFunds(this, this.props.activeUser, this.activeUserFundsResponse);
		}, 4000);
	}

	componentDidUpdate(prevProps, prevState) {
		if (!!this.props.activeUser && this.props.activeUser != prevProps.activeUser) {
			blockchain.getUserFunds(this, this.props.activeUser, this.activeUserFundsResponse);
		}
	}

	toggleMenu() {
		if (this.props.isMenuOpen) {
			this.props.closeMenu();
		} else {
			this.props.openMenu();
		}
	}

	renderMenuButton(open) {
		const imgSrc = open ? this.props.openMenuButton : this.props.closeMenuButton;
		return (
			<img src={imgSrc} width="32" style={{margin: "3px"}} />
		)
	}

	renderMenu() {
		return (
			<div className='main-menu' style={this.props.menuContainerStyle}>
				<div className='menu-header' style={this.props.menuHeaderStyle}>
					Menu
				</div>
				<Interactive
					as='div'
					style={this.props.menuItemStyle}
					hover={this.props.menuItemHoverStyle}
					onClick={() => { this.toggleMenu() }} >
					<Link to='/' style={{textDecoration: 'none', color: 'black'}}>
						Home
					</Link>
				</Interactive>
				<Interactive
					as='div'
					style={this.props.menuItemStyle}
					hover={this.props.menuItemHoverStyle}
					onClick={() => { this.toggleMenu() }} >
					<Link to='/consumer' style={{textDecoration: 'none', color: 'black'}}>
						Consumer
					</Link>
				</Interactive>
				<Interactive
					as='div'
					style={this.props.menuItemStyle}
					hover={this.props.menuItemHoverStyle}
					onClick={() => { this.toggleMenu() }} >
					<Link to='/producer' style={{textDecoration: 'none', color: 'black'}}>
						Producer
					</Link>
				</Interactive>
				<Interactive
					as='div'
					style={this.props.menuItemStyle}
					hover={this.props.menuItemHoverStyle}
					onClick={() => { this.toggleMenu() }} >
					<Link to='/about' style={{textDecoration: 'none', color: 'black'}}>
						About
					</Link>
				</Interactive>
				<Interactive
					as='div'
					style={this.props.menuItemStyle}
					hover={this.props.menuItemHoverStyle}
					onClick={() => { this.toggleMenu() }} >
					<Link to='/setup' style={{textDecoration: 'none', color: 'black'}}>
						Setup
					</Link>
				</Interactive>
			</div>
		)
	}

	triggerDropDown() {
		if (this.props.isDDOpen) {
			this.props.closeUserDropDown();
		} else {
			this.props.openUserDropDown();
		}
	}

	handleUserKeyClick(key) {
		this.props.setActiveUser(key);
		this.props.closeUserDropDown();
	}

	renderUserKey(key, id) {
		return (
			<div className="user-key" key={id} style={this.props.userKeyStyle} onClick={() => this.handleUserKeyClick(key)}>
				{ key }
			</div>
		)
	}

	renderDropDown() {
		return (
			<div className="dropdown-container col-xs-3" style={this.props.dropdownStyle}>
				{ this.props.userKeys.map((key, id) => this.renderUserKey(key, id)) }
			</div>
		)
	}

	activeUserFundsResponse(context, err, result) {
		if (err) {
			console.log("error while retrieving funds");
			console.log(err);
		} else {
			console.log("successfuly retrieve funds");
		}
		context.props.updateActiveUserFunds({token1: result.invest, token2: result.discount});
	}

	render() {
		const userTokenFirst = this.props.activeUser ? this.props.activeUserTokenFirst : '0';
		const userTokenSecond = this.props.activeUser ? this.props.activeUserTokenSecond : '0';
		return (
			<div className="header-main row" style={this.props.mainStyle}>
				<div className='menu-button col-xs-2 col-md-1' style={this.props.menuButtonStyle} onClick={() => { this.toggleMenu() }}>
					{ this.renderMenuButton(this.props.isMenuOpen) }
				</div>
				<div className='userDropDown col-xs-3 col-md-6' style={this.props.userDropdownStyle} onClick={() => { this.triggerDropDown() }}>
					{ this.props.activeUser }
				</div>
				<div className="user-token-first col-xs-3 col-md-2" style={this.props.userTokenFirstStyle}>
					{ userTokenFirst }
					<span className="grey_logo" style={this.props.coinLogoStyle}>
						<img src="../pics/logo_grey.png" style={{borderRadius: '50px'}} width="28" />
					</span>
				</div>
				<div className="user-token-second col-xs-3 col-md-2" style={this.props.userTokenSecondStyle}>
					{ userTokenSecond }
					<span className="grey_logo" style={this.props.coinLogoStyle}>
						<img src="../pics/logo_color.png" style={{borderRadius: '50px'}} width="28" />
					</span>
				</div>
				{ this.props.isDDOpen && this.renderDropDown() }
				<ReactCSSTransitionGroup
					transitionName="menuTransition"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}>
					{ this.props.isMenuOpen && this.renderMenu() }
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}

export default Radium(component);
