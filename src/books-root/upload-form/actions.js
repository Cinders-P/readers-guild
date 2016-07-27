export const handleUpload = (file) => ({ type: 'ADD_COVER', payload: file });

export const submitForm = (cover) => {
	const form = new FormData(document.getElementById('uploadForm'));
	for (const pair of form.entries()) {
		console.log(`${pair[0]}, ${pair[1]}`);
	}
	if (!cover) {
		return {
			type: 'UPLOAD_ERROR',
			payload: 3,
		};
	}
	if (!form.get('author')) {
		return {
			type: 'UPLOAD_ERROR',
			payload: 2,
		};
	}
	if (!form.get('title')) {
		return {
			type: 'UPLOAD_ERROR',
			payload: 1,
		};
	}
	form.delete('cover');
	form.append('cover', cover);
	return (dispatch) => {
		$.ajax({
			url: '/upload',
			data: form,
			processData: false,
			contentType: false,
			type: 'POST',
		}).done(() => {
			dispatch({ type: 'UPLOAD_SUCCESS' });
			document.getElementById('uploadForm').reset();
			$('.boxOver').text('Drop a book cover image.');
		}).fail(() => {
			dispatch({ type: 'UPLOAD_FAIL' });
		});
	};
};
