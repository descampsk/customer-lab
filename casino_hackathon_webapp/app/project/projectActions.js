export const RESET_DETAIL_VIEW = "RESET_DETAIL_VIEW";
export const SET_DETAIL_VIEW = "SET_DETAIL_VIEW";

export function setDetailView(viewId) {
	return {
		type: SET_DETAIL_VIEW,
		selectedView: viewId
	}
}

export function resetDetailView() {
	return {
		type: RESET_DETAIL_VIEW
	}
}
