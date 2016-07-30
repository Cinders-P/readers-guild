export const cancelTrade = (cover) => dispatch => {
	$.post('/api/cancel-trade', { cover }, (res) => {
		dispatch({ type: 'REFRESH_PENDING_TRADES', payload: res });
	});
};

export const acceptTrade = (cover) => dispatch => {

};
