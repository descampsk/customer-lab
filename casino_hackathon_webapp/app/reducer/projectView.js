import { SET_DETAIL_VIEW, RESET_DETAIL_VIEW } from '../project/projectActions';

function projectView(state={selectedView: 0}, action) {
	switch(action.type) {
		case SET_DETAIL_VIEW:
			return Object.assign({}, state, {
				selectedView: action.selectedView
			});
		case RESET_DETAIL_VIEW:
			return Object.assign({}, state, {
				selectedView: 0
			});
		default:
			return state;
	}
}

export default projectView;
