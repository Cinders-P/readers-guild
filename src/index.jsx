import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, bindActionCreators, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import dragDrop from 'drag-drop';
import './jQ.js';

const initialState = {
	myBooks: {
		uploadVisible: false,
		books: [
			'Magic the Gathering', 'A Day in the Life', 'Bones',
		],
		covers: ['123', 'abc', 'qwerty'],
	},
};

// ACTION CREATORS
const toggleUpload = () => ({ type: 'TOGGLE_UPLOAD' });

// REDUCERS

const myBooks = (state = {}, action) => {
	switch (action.type) {
	case 'TOGGLE_UPLOAD':
		return {
			...state,
			uploadVisible: !state.uploadVisible,
		};

	default:
		return state;

	}
};

const master = combineReducers({ myBooks });

// COMPONENTS
let MyBooks = ({ toggleUpload }) => {
	return (
		<div className='books-root'>
			<h2>My Books
				<span onClick={toggleUpload}>(upload)</span>
			</h2>
			<form id='uploadForm' action='/upload' method='post' encType='multipart/form-data'>
				<div className='input-group'>
				<label>Author</label>
				<input className='form-control' type='text' name='author'></input>
				</div> <div className='input-group'>
				<label>Title</label>
				<input className='form-control' type='text' name='title'></input>
				</div>
				<div className='box' id='drop'>
					<div className='boxOver'>Drop a book cover image.</div>
				</div>
				<button type='button' className='btn'>Submit</button>
			</form>
			<p>None</p>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		toggleUpload,
	}, dispatch);
};

MyBooks = connect(null, mapDispatchToProps)(MyBooks);

// RENDER
const middleware = applyMiddleware(logger());

$(() => {
	ReactDOM.render(
		<Provider store={createStore(master, initialState, middleware)}>
		<div className='container centered'>
			<MyBooks/>
			<hr/>
		</div>
	</Provider>, document.getElementById('root'));

	let form;

	dragDrop('#drop', {
		onDrop(files, pos) {
			const ajaxData = new FormData(document.getElementById('uploadForm'));
			ajaxData.append('hello', files[0]);
			for (const pair of ajaxData.entries()) {
				console.log(pair[0] + ', ' + pair[1]);
			}
			form = ajaxData;
		},
		onDragOver() {
			$('#drop').addClass('over');
		},
		onDragLeave() {
			$('#drop').removeClass('over');
		},
	});

	$('button:contains("Submit")').click(() => {
		for (const pair of form.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
		$.ajax({
			url: '/upload',
			data: form,
			processData: false,
			contentType: false,
			type: 'POST',
			success(data) {
				alert('done booyaH');
			},
		});
	});
});
