import { SET_USER_KEYS, SET_PROJECT_KEYS } from '../utils/blockchainActions';
import { SET_ACTIVE_USER, SET_ACTIVE_USER_FUNDS } from '../header/menuActions';

function blockchain(state={userKeys: [], projectKeys: [], activeUser: {key: "", token1: "", token2: ""}}, action) {
	switch(action.type) {
		case SET_USER_KEYS:
			return Object.assign({}, state, {
				userKeys: action.keys
			});
		case SET_PROJECT_KEYS:
			return Object.assign({}, state, {
				projectKeys: action.keys
			});
		case SET_ACTIVE_USER:
			return Object.assign({}, state, {
				activeUser: { key: action.key }
			});
		case SET_ACTIVE_USER_FUNDS:
			const newActiveUser = Object.assign({}, state.activeUser, {
				token1: action.funds.token1,
				token2: action.funds.token2
			});
			return Object.assign({}, state, {
				activeUser: newActiveUser
			});
		default:
			return state;
	}
}

export default blockchain;
