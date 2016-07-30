export const cancelTrade = (cover) => dispatch => {
	$.post('/api/cancel-trade', { cover }, (res) => {
		dispatch({ type: 'REFRESH_PENDING_TRADES', payload: res });
	});
};

export const acceptTrade = (cover) => dispatch => {
	$.post('/api/accept-trade', { cover }, res => {
		dispatch({ type: 'REFRESH_PENDING_TRADES', payload: res.pending });
		dispatch({ type: 'REFRESH_COMPLETED_TRADES', payload: res.done });
		$.get('/api/my-books', (res) => {
			dispatch({ type: 'REFRESH_MY_BOOKS', payload: res });
		});
	});
};
