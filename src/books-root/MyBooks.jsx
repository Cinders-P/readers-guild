import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormContainer from './upload-form/FormContainer.jsx';
import { toggleUpload, deleteBook } from './actions.js';

const MyBooks = ({ uploadVisible, toggleUpload, deleteBook, books }) => (
		<div className='books-root'>
			<h2>My Books
				<span onClick={ toggleUpload }> (upload)</span>
			</h2>
			{/* if User has clicked upload, show them the form */}
			{(uploadVisible) ? <FormContainer /> : null }
			<div className='flex-row'>
			{/* if User has books, show the books*/}
			{ (books.length) ?
			books.map((book) =>
				<div className='combo'>
					<div className='bookListing' style={{
						backgroundImage: `url('/img/covers/${book.cover}')`,
					}}></div>
					<div className='bookCard'>
						<div className='info'>
							<h4>{book.title}</h4>
							<small>by {book.author}</small>
						</div>
						<div className='action'>
							<button onClick={ deleteBook.bind(null, book.title) } className='btn'>Delete</button>
						</div>
					</div>
				</div>
			) : null}
			</div>
		</div>
	);

const mapStateToProps = (store) => ({
	uploadVisible: store.myBooks.uploadVisible,
	books: store.myBooks.books,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ toggleUpload, deleteBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
