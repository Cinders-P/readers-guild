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
	ReactDOM.render(
		<Provider store={createStore(master, initialState, middleware)}>
		<div className='container centered'>
			<MyBooks/>
			<hr/>
		</div>
	</Provider>, document.getElementById('root'));
});
