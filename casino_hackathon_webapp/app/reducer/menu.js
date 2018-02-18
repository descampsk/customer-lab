import { OPEN_MENU, CLOSE_MENU, OPEN_USER_DROPDOWN, CLOSE_USER_DROPDOWN } from '../header/menuActions';

function menu(state={ isOpen: false, isDDOpen: false }, action) {
	switch(action.type) {
		case OPEN_MENU:
			return Object.assign({}, state, {
				isOpen: true
			});
		case CLOSE_MENU:
			return Object.assign({}, state, {
				isOpen: false
			});
		case OPEN_USER_DROPDOWN:
			return Object.assign({}, state, {
				isDDOpen: true
			});
		case CLOSE_USER_DROPDOWN:
			return Object.assign({}, state, {
				isDDOpen: false
			});
		default:
			return state;
	}
}

export default menu;
