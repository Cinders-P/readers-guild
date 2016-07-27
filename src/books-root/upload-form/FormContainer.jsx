import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookInputs from './BookInputs.jsx';
import DropBox from './DropBox.jsx';
import { handleUpload, submitForm } from './actions.js';

const FormContainer = ({ cover, submitForm, handleUpload, msgArr, boxMsg }) => {
	const sendToSubmit = () => {
		submitForm(cover);
	};
	return (
		<form id='uploadForm' action='/upload' method='post' encType='multipart/form-data'>
			<BookInputs />
			<DropBox handleUpload={ handleUpload } boxMsg={ boxMsg } msgArr={ msgArr }/>
			<button type='button' onClick={sendToSubmit} className='btn'>Submit</button>
		</form>
	);
};
const mapStateToProps = (store) => ({
	cover: store.myBooks.cover,
	boxMsg: store.myBooks.uploadError,
	msgArr: store.myBooks.uploadErrorMsg,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ submitForm, handleUpload }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
