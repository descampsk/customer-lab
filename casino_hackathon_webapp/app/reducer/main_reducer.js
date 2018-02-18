import { combineReducers } from 'redux';

import init from './init';
import menu from './menu';
import projects from './projects';
import projectsFilter from './projectsFilter';
import forms from './forms';
import projectView from './projectView';
import blockchain from './blockchain';

import {reducer as notifications} from 'react-notification-system-redux';

const rootReducer = combineReducers({
	init,
	menu,
	projects,
	projectsFilter,
	forms,
	projectView,
	blockchain,
	notifications
});

export default rootReducer;
