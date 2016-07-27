import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormContainer from './upload-form/FormContainer.jsx';
import { toggleUpload } from './actions.js';

const MyBooks = ({ uploadVisible, toggleUpload }) => (
		<div className='books-root'>
			<h2>My Books
				<span onClick={ toggleUpload }> (upload)</span>
			</h2>
			{(uploadVisible) ? <FormContainer /> : null }
			<p>None</p>
		</div>
	);

const mapStateToProps = (store) => ({ uploadVisible: store.myBooks.uploadVisible });

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleUpload }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
