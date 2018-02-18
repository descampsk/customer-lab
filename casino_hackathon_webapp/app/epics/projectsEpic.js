import { ajax } from 'rxjs/observable/dom/ajax';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { POST_NEW_PROJ, receivePostNewProjResponse, GET_PROJECTS_REQUEST, receiveProjectsResponse } from '../projects/projectsActions';

export const newProjEpic = (action$) => {
	return action$.ofType(POST_NEW_PROJ).switchMap((action) =>
			ajax(action.request).map((result) => {
				const data = result.response;
				return receivePostNewProjResponse(data);
			})
		)
}

export const projectsEpic = (action$) => {
	return action$.ofType(GET_PROJECTS_REQUEST).switchMap((action) =>
			ajax(action.request).map((result) => {
				const data = result.response;
				return receiveProjectsResponse(data);
			})
		)
}
