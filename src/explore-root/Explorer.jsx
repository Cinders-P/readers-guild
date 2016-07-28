import { connect } from 'react-redux';

const Explorer = ({ books }) =>
		<div className='flex-row pad-bottom'>
			{books.map(book =>
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
								<button className='btn'>Request Trade</button>
							</div>
						</div>
					</div>
				)}
		</div>;


const mapStateToProps = state => ({ books: state.allBooks });

export default connect(mapStateToProps)(Explorer);
