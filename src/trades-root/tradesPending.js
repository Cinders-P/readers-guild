export default (state = [], action) => {
	if (action.type === 'REFRESH_PENDING_TRADES') {
		return action.payload;
	}
	return state;
};
