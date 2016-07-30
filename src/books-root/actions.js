export const toggleUpload = () => ({ type: 'TOGGLE_UPLOAD' });

export const deleteBook = cover => dispatch => {
	$.post('/api/delete-book', { cover }, res => {
		if (res === 'true') {
			$.get('/api/my-books', (res) => {
				if (Array.isArray(res)) {
					dispatch({ type: 'REFRESH_MY_BOOKS', payload: res });
				}
			});
		} else if (res === 'trade') {
			alert('You cannot delete a book that is in a trade.');
		}
	});
};
