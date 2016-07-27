import { Component } from 'react';
import dragDrop from 'drag-drop';

class dropBox extends Component {
	checkFile(file) {
		const handleUpload = this.props.handleUpload;

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
	}
	componentDidMount() {
		const that = this;

		$('#uploadErrorMsg').hide();
		dragDrop('#drop', {
			onDrop(files) {
				const file = files.pop();
				that.checkFile(file);
			},
			onDragOver() {
				$('#drop').addClass('over');
			},
			onDragLeave() {
				$('#drop').removeClass('over');
			},
		});
	}
	triggerInput() {
		$('input[type="file"]').click().bind('change', () => {
			const input = $('input[type="file"]');
			const file = input[0].files[0];
			this.checkFile(file);
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
				<div onClick={ this.triggerInput.bind(this) } className='boxOver'>
					Drop a book cover image.
				</div>
		</div>
	</div>
	);
	}
}

export default dropBox;
