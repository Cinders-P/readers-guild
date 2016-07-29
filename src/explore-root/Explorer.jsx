import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTrade, selectTrade, cancelTrade } from './actions.js';


const Explorer = ({ myBooks, books, loggedIn, createTrade,
	selectTrade, cancelTrade, show, selectedBook }) =>
		<div className='flex-row pad-bottom'>
			{books.map(book =>
				(!book.inTrade ?
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
								<p>Owned by {book.ownerName}</p>
								{loggedIn ?
									<button onClick={ selectTrade.bind(null, book.cover) }
										className='btn'>Request Trade</button> : null}
							</div>
						</div>
					</div> : null)
				)}
				{show ?
				<div className='tradePanel'>
					<h4>Your offer:</h4>
					{myBooks.map((book) =>
						(!book.inTrade ?
						<button onClick={ createTrade.bind(null, book.cover, selectedBook) }
							className='tradeButton'>{book.title}</button> : null)
					)}
					<button onClick={ cancelTrade } className='btn btn-danger'>Cancel</button>
				</div>
				: null}
		</div>;

const mapStateToProps = state => ({
	myBooks: state.myBooks.books,
	books: state.allBooks,
	loggedIn: state.loggedIn,
	show: state.tradePanel.show,
	selectedBook: state.tradePanel.selectedBook,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ createTrade, selectTrade, cancelTrade }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
