import { combineEpics } from 'redux-observable';

import { newProjEpic, projectsEpic } from './projectsEpic';

const rootEpic = combineEpics(
		newProjEpic,
		projectsEpic
);

export default rootEpic;
