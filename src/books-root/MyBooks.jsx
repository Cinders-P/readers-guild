import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormContainer from './upload-form/FormContainer.jsx';
import toggleUpload from './toggleUpload.js';

const MyBooks = ({ toggleUpload }) => (
		<div className='books-root'>
			<h2>My Books
				<span onClick={toggleUpload}> (upload)</span>
			</h2>
			<FormContainer />
			<p>None</p>
		</div>
	);

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleUpload }, dispatch);

export default connect(null, mapDispatchToProps)(MyBooks);
