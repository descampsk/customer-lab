import React from 'react';
import { connect } from 'react-redux';

import component from './component.jsx';

import { withRouter } from 'react-router-dom';

import { styles } from './style';

import { openMenu, closeMenu, openUserDropDown, closeUserDropDown, setActiveUser, setActiveUserFunds } from './menuActions';

import { getUserFunds } from '../utils/blockchain';

function getOpenMenuIcon() {
	return "./pics/openMenuIcon.png";
}

function getCloseMenuIcon() {
	return "./pics/closeMenuIcon.png";
}

function addThousandsSepFromString(x) {
	if (!x) {
		return x;
	}
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getActiveUserTokenFirst(state) {
	if (state.blockchain.activeUser.key) {
		return addThousandsSepFromString(state.blockchain.activeUser.token1);
	} else {
		return "";
	}
}

function getActiveUserTokenSecond(state) {
	if (state.blockchain.activeUser.key) {
		return addThousandsSepFromString(state.blockchain.activeUser.token2);
	} else {
		return "";
	}
}

const mapStateToProps = (state) => {
	return {
		isMenuOpen: state.menu.isOpen,
		isDDOpen: state.menu.isDDOpen,
		activeUser: state.blockchain.activeUser.key,
		activeUserTokenFirst: getActiveUserTokenFirst(state),
		activeUserTokenSecond: getActiveUserTokenSecond(state),
		userKeys: state.blockchain.userKeys,
		dropdownStyle: styles.dropdown,
		userDropdownStyle: styles.userDropdown,
		userKeyStyle: styles.userKey,
		mainStyle: styles.main,
		menuContainerStyle: styles.menuContainer,
		menuHeaderStyle: styles.menuHeader,
		menuItemStyle: styles.menuItem,
		menuItemHoverStyle: styles.menuItem[':hover'],
		menuButtonStyle: styles.menuButton,
		openMenuButton: getOpenMenuIcon(),
		closeMenuButton: getCloseMenuIcon(),
		userTokenFirstStyle: Object.assign({}, styles.userToken, styles.userTokenFirst),
		userTokenSecondStyle: Object.assign({}, styles.userToken, styles.userTokenSecond),
		coinLogoStyle: styles.coinLogo,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		openMenu: () => { dispatch(openMenu()) },
		closeMenu: () => { dispatch(closeMenu()) },
		openUserDropDown: () => { dispatch(openUserDropDown()) },
		closeUserDropDown: () => { dispatch(closeUserDropDown()) },
		setActiveUser: (key) => { dispatch(setActiveUser(key)) },
		updateActiveUserFunds: (funds) => { dispatch(setActiveUserFunds(funds)) }
	}
}

const comp = connect(
		mapStateToProps,
		mapDispatchToProps
)(component);

export default withRouter(comp);
