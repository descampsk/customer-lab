import { SELECT_CAT } from '../projects/projectsActions';

function projectsFilter(state={selectedCat: 0}, action) {
	switch(action.type) {
		case SELECT_CAT:
			return Object.assign({}, state, {
				selectedCat: action.cat
			});
		default:
			return state;
	}
}

export default projectsFilter;
