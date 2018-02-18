export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

export const OPEN_USER_DROPDOWN = "OPEN_USER_DROPDOWN";
export const CLOSE_USER_DROPDOWN = "CLOSE_USER_DROPDOWN";

export const SET_ACTIVE_USER = "SET_ACTIVE_USER";
export const SET_ACTIVE_USER_FUNDS = "SET_ACTIVE_USER_FUNDS";

export function openMenu() {
	return {
		type: OPEN_MENU
	}
}

export function closeMenu() {
	return {
		type: CLOSE_MENU
	}
}

export function openUserDropDown() {
	return {
		type: OPEN_USER_DROPDOWN
	}
}

export function closeUserDropDown() {
	return {
		type: CLOSE_USER_DROPDOWN
	}
}

export function setActiveUser(key) {
	return {
		type: SET_ACTIVE_USER,
		key: key
	}
}

export function setActiveUserFunds(funds) {
	return {
		type: SET_ACTIVE_USER_FUNDS,
		funds: funds
	}
}
