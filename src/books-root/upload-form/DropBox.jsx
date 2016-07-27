import { Component } from 'react';
import dragDrop from 'drag-drop';
import { triggerInput } from './functions.js';

class dropBox extends Component {
	componentDidMount() {
		$('#uploadErrorMsg').hide();
		const handleUpload = this.props.handleUpload;
		dragDrop('#drop', {
			onDrop(files) {
				const file = files.pop();
				if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
					$('.boxOver').text('Only .png, .jpg, and .gif files are allowed.');
					return;
				}
				if (file.size > 2000000) {
					$('.boxOver').text('That file is too large. Maximum file size is 2MB.');
					return;
				}
				// dispatch handleUpload; sends file to store
				$('.boxOver').text(`Selected file: ${file.name}`);
				handleUpload(file);
			},
			onDragOver() {
				$('#drop').addClass('over');
			},
			onDragLeave() {
				$('#drop').removeClass('over');
			},
		});
	}
	render() {
		let msg = null;
		if (this.props.boxMsg) {
			msg = <div id='uploadErrorMsg'>{this.props.msgArr[this.props.boxMsg]}</div>;
		}
		return (
			<div>
				{msg}
				<input type='file' hidden></input>
				<div className='box' id='drop'>
				<div onClick={ triggerInput } className='boxOver'>
					Drop a book cover image.
				</div>
		</div>
	</div>
	);
	}
}

export default dropBox;
