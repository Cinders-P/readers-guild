export const toggleUserEdit = () => ({ type: 'TOGGLE_USER_EDIT' });

export const handleSubmit = () => {
	const form = new FormData();
	form.append('realname', $('input[name="realname"]').val());
	form.append('city', $('input[name="city"]').val());
	const pic = $('input[name="picture"]')[0];
	// only append file if size is under 2MB and the file has an accepted extension
	if (pic.files.length && pic.files[0].size < 2000000 &&
		pic.files[0].type.match(/image\/(?:png|jpeg|gif)/g)) {
		form.append('picture', $('input[name="picture"]')[0].files[0]);
	}
	return dispatch => {
		$.ajax({
			url: '/update-user',
			data: form,
			processData: false,
			contentType: false,
			type: 'POST',
		}).done((res) => {
			console.log(res);
			dispatch({ type: 'REFRESH_USER', payload: res });
			dispatch({ type: 'TOGGLE_USER_EDIT' });
		});
	};
};
