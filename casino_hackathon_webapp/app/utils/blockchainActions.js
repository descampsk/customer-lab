export const SET_USER_KEYS = "SET_USER_KEYS";
export const SET_PROJECT_KEYS = "SET_PROJECT_KEYS";

export function setUserKeys(keys) {
	return {
		type: SET_USER_KEYS,
		keys: keys
	}
}

export function setProjectKeys(keys) {
	return {
		type: SET_PROJECT_KEYS,
		keys: keys
	}
}
