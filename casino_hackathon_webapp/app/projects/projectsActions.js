export const ADD_PROJECT = "ADD_PROJECT";
export const SELECT_CAT = "SELECT_CAT";

export const POST_NEW_PROJ = "POST_NEW_PROJ";
export const POST_NEW_PROJ_RESPONSE = "POST_NEW_PROJ_RESPONSE";

export const GET_PROJECTS_REQUEST = "GET_PROJECTS_REQUEST";
export const GET_PROJECTS_RESPONSE = "GET_PROJECTS_RESPONSE";

export function selectCat(id) {
	return {
		type: SELECT_CAT,
		cat: id
	}
}

export function postNewProj(request, header, body) {
	const req = Object.assign({}, header, {
		body: body,
		url: request
	});
	return {
		type: POST_NEW_PROJ,
		request: req
	}
}

export function receivePostNewProjResponse(json) {
	return {
		type: POST_NEW_PROJ_RESPONSE,
		res: json
	}
}

export function getProjects(request, header) {
	const req = Object.assign({}, header, {
		url: request
	});
	return {
		type: GET_PROJECTS_REQUEST,
		request: req
	}
}

export function receiveProjectsResponse(json) {
	return {
		type: GET_PROJECTS_RESPONSE,
		response: json
	}
}
