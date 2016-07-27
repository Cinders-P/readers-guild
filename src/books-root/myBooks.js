export default (state = {}, action) => {
	switch (action.type) {
	case 'TOGGLE_UPLOAD':
		return { ...state, uploadVisible: !state.uploadVisible };
	case 'ADD_COVER':
		return { ...state, cover: action.payload };
	case 'UPLOAD_ERROR':
		$('#uploadErrorMsg').show();
		return { ...state, uploadError: action.payload };
	case 'UPLOAD_SUCCESS':
		return { ...state, uploadError: 0, cover: '' };
	case 'UPLOAD_FAIL':
		return { ...state, uploadError: 4 };
	default:
		return state;
	}
};
