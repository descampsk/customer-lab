import { URL_MONGODB, NEW_PROJ_PATH, PROJS_PATH } from '../dbAccess/mongoDB';

export function getUrlNewProj() {
	return URL_MONGODB + NEW_PROJ_PATH;
}

export function getOptionsNewProj() {
	return {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		}
	}
}

export function getBodyNewProj(values) {
	return values;
}

export function getUrlProjects() {
	return URL_MONGODB + PROJS_PATH;
}

export function getOptionsProjects() {
	return {
		method: 'get',
		headers: {
			'Content-Type': 'application/json'
		}
	}
}
