export default (state = [], action) => {
	if (action.type === 'REFRESH_COMPLETED_TRADES') {
		return action.payload;
	}
	return state;
};
