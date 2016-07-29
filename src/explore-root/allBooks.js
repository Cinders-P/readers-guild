export default (state = {}, action) => {
	if (action.type === 'REFRESH_ALL_BOOKS') {
		return action.payload;
	}
	return state;
};
