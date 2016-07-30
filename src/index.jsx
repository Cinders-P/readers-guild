/* global loggedIn*/

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import './parallax.js';
import MyBooks from './books-root/MyBooks.jsx'; // Components/containers are PascalCase
import Info from './user-info/Info.jsx';
import Explorer from './explore-root/Explorer.jsx';
import TradesPending from './trades-root/TradesPending.jsx';
import myBooks from './books-root/myBooks.js'; // Actions/reducers are camelCase
import user from './user-info/user.js';
import userEdit from './user-info/userEdit.js';
import tradePanel from './explore-root/tradePanel.js';
import allBooks from './explore-root/allBooks.js';
import tradesPending from './trades-root/tradesPending.js';

const initialState = {
	userEdit: false,
	tradePanel: {
		show: false,
		selectedBook: '',
	},
	user: {
		username: '',
		realname: '',
		city: '',
		picture: '',
	},
	myBooks: {
		uploadVisible: false,
		uploadError: 0,
		uploadErrorMsg: ['', 'You must add a title.',
		'You must add an author.', 'You must upload a book cover.',
		'There was an error processing your request.'],
		cover: '',
		books: [],
	},
	allBooks: {},
	loggedIn: false,
	tradesPending: [],
};

const master = combineReducers({
	userEdit,
	myBooks,
	user,
	loggedIn: (state = false) => state,
	tradePanel,
	allBooks,
	tradesPending,
});
const middleware = applyMiddleware(logger(), thunk);

const renderProfile = (...promises) => {
	// only render elements after intialState is setup
	Promise.all(promises).then(() => {
		ReactDOM.render(
		<Provider store={createStore(master, initialState, middleware)}>
		<div className='container centered'>
			<Info />
			<MyBooks/>
			<hr/>
			<TradesPending/>
			<hr/>
			<div className='trades-done'>
				<h2>Trade History</h2>
				<p>None</p>
			</div>
		</div>
	</Provider>, document.getElementById('profile-root'));
	}).then(() => {
		$('.bookCard').hover(function hoveron() {
			$(this).css('opacity', 1);
		}, function hoveroff() {
			$(this).css('opacity', 0);
		});
	});
};

$(() => {
	if (document.getElementById('explore-root')) {
		// loggedIn in is passed through Express into the Pug template into here
		initialState.loggedIn = loggedIn;
		const p1 = new Promise((resolve) => {
			$.get('/api/all-books', (res) => {
				initialState.allBooks = res;
			}).done(resolve);
		});
		let p2 = 1;
		if (loggedIn) {
			// List of owned books is needed for making trade requests
			p2 = new Promise((resolve) => {
				$.get('/api/my-books', (res) => {
					initialState.myBooks.books = res;
				}).done(resolve);
			});
		}
		Promise.all([p1, p2]).then(() => {
			ReactDOM.render(
				<Provider store={createStore(master, initialState, middleware)}>
					<Explorer />
				</Provider>, document.getElementById('explore-root'));
		}).then(() => {
			$('.bookCard').hover(function hoveron() {
				$(this).css('opacity', 1);
			}, function hoveroff() {
				$(this).css('opacity', 0);
			});
		});
	// runs if user is on their profile page
	} else if (document.getElementById('profile-root')) {
		const p1 = new Promise((resolve) => {
			$.get('/api/user', (res) => {
				initialState.user = res;
			}).done(resolve);
		});
		const p2 = new Promise((resolve) => {
			$.get('/api/my-books', (res) => {
				initialState.myBooks.books = res;
			}).done(resolve);
		});
		const p3 = new Promise(resolve => {
			$.get('/api/pending-trades', res => {
				if (res !== 'none') {
					initialState.tradesPending = res;
				}
			}).done(resolve);
		});
		renderProfile(p1, p2, p3);
	}
});
