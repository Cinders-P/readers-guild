import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './jQ.js';
import MyBooks from './books-root/MyBooks.jsx'; // Components/containers are PascalCase
import myBooks from './books-root/myBooks.js'; // Actions/reducers are camelCase

const initialState = {
	myBooks: {
		uploadVisible: false,
		uploadError: 0,
		uploadErrorMsg: ['', 'You must add a title.',
		'You must add an author.', 'You must upload a book cover.',
		'There was an error processing your request.'],
		cover: '',
		books: [
			'Magic the Gathering', 'A Day in the Life', 'Bones',
		],
		covers: ['123', 'abc', 'qwerty'],
	},
};
const master = combineReducers({ myBooks });
const middleware = applyMiddleware(logger(), thunk);

$(() => {
	if (document.getElementById('profile-root')) {
		ReactDOM.render(
		<Provider store={createStore(master, initialState, middleware)}>
		<div className='container centered'>
			<div className='flex-row'>
				<img id='profile' src='https://placeholdit.imgix.net/~text?txtsize=23&bg=ffffff&txtclr=000000&txt=250%C3%97250&w=250&h=250'/>
				<div>
					<h2>Username</h2>
					<p>City Name</p>
					<p>Edit Profile</p>
				</div>
			</div>
			<MyBooks/>
			<hr/>
			<div className='trades-root'>
				<h2>Trades Pending</h2>
				<p>None</p>
			</div>
			<hr/>
			<div className='trades-done'>
				<h2>Trade History</h2>
				<p>None</p>
			</div>
		</div>
	</Provider>, document.getElementById('profile-root'));
	}
});
