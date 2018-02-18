import { ADD_PROJECT, POST_NEW_PROJ, GET_PROJECTS_RESPONSE } from '../projects/projectsActions';

import { initialList } from '../projects/initialList';

function projects(state=initialList, action) {
	switch(action.type) {
		case ADD_PROJECT:
			var newItem = action.item;
			var newList = state.push(item);
			return newList;
		case GET_PROJECTS_RESPONSE:
			var projects = action.response;
			return projects;
		default:
			return state;
	}
}

export default projects;
