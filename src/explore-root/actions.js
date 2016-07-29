export const createTrade = (cover, selectedBook) => dispatch => {
	$.post('/create-trade', { book1: cover, book2: selectedBook }, (res) => {
		dispatch({ type: 'REFRESH_ALL_BOOKS', payload: res });
		dispatch({ type: 'TRADE_PANEL_OFF' });
		dispatch({ type: 'SET_SELECTED_BOOK', payload: '' });
	});
};

export const selectTrade = (bookCover) => dispatch => {
	dispatch({ type: 'TRADE_PANEL_ON' });
	dispatch({ type: 'SET_SELECTED_BOOK', payload: bookCover });
};

export const cancelTrade = () => dispatch => {
	dispatch({ type: 'TRADE_PANEL_OFF' });
	dispatch({ type: 'SET_SELECTED_BOOK', payload: '' });
};
