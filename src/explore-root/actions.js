export const createTrade = (cover, selectedBook) => dispatch => {
	$.post('/create-trade', { book1: cover, book2: selectedBook }, (res) => {
		// Requested book is already in a trade; State is outdated.
		if (res === 'trade') {
			$.get('/api/all-books', (res) => {
				dispatch({ type: 'REFRESH_ALL_BOOKS', payload: res });
			});
			$.get('/api/my-books', (res) => {
				dispatch({ type: 'REFERSH_MY_BOOKS', payload: res });
			});
			return;
		}
		dispatch({ type: 'REFRESH_ALL_BOOKS', payload: res.books });
		dispatch({ type: 'REFRESH_MY_BOOKS', payload: res.myBooks });
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
