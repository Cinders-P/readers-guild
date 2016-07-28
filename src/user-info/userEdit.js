export default (state = {}, action) => {
	if (action.type === 'TOGGLE_USER_EDIT') {
		return !state;
	}
	return state;
};
