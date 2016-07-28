export default (state = {}, action) => {
	if (action.type === 'REFRESH_USER') {
		return action.payload;
	}
	return state;
};
