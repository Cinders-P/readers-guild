export const toggleUpload = () => ({ type: 'TOGGLE_UPLOAD' });

export const deleteBook = title => dispatch => {
	$.post('/api/delete-book', { title }, res => {
		if (res === 'true') {
			$.get('/api/my-books', (res) => {
				if (Array.isArray(res)) {
					dispatch({ type: 'REFRESH_MY_BOOKS', payload: res });
				}
			});
		}
	});
};
