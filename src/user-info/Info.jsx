import { connect } from 'react-redux';
import { toggleUserEdit, handleSubmit } from './actions.js';

const Info = ({ user, userEdit, toggleUE, handleSubmit }) =>
	(userEdit ?
		<form id='userEditForm' method='post' action='/update-user' encType='multipart/form-data'>
			<div className='input-group'>
				<label>Real name:</label>
				<input type='text' className='form-control' name='realname'></input>
			</div>
			<div className='input-group'>
				<label>City:</label>
				<input type='text' className='form-control' name='city'></input>
			</div>
			<div className='input-group'>
				<label>Profile picture:</label>
				<input type='file' className='form-control' name='picture'></input>
			</div>
			<button className='btn' type='button' onClick={ toggleUE }>Cancel</button>
			<button className='btn' type='button' onClick={ handleSubmit }>Save</button>
		</form>
		:
		<div className='flex-row'>
			{(user.picture.length) ? <div id='profile'
				style={{ backgroundImage: `url('/img/profile-pics/${user.picture}')` }}/>
				: <img id='profile' src='/img/profile-pics/default.png'/> }
			<div id='profile-text'>
				<h2>{user.username}</h2>
				{user.realname.length ? <strong>{user.realname}</strong> : null}
				{user.city.length ? <p className='shift-up'>{user.city}</p> : null}
				<p onClick={ toggleUE } className='link'>Edit Profile</p>
			</div>
		</div>);

const mapStateToProps = state => ({ user: state.user, userEdit: state.userEdit });
const mapDispatchToProps = dispatch => ({
	toggleUE: () => dispatch(toggleUserEdit()),
	handleSubmit: () => dispatch(handleSubmit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
