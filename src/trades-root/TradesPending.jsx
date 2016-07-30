import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelTrade, acceptTrade } from './actions.js';

const TradesPending = ({ trades, username, cancelTrade, tradesDone, acceptTrade }) =>
<div className='trades'>
	<div className='trades-root'><h2>Trades Pending</h2>
		{trades.length ?
		trades.map(trade =>
			(trade.owner === username ?
			<p>You offered&nbsp;
				<span className='ribbon-color'>{trade.title1}</span>&nbsp;
			to {trade.recipient} for their&nbsp;
				<span className='ribbon-color'>{trade.title2}</span>.&nbsp;
			<span
				className='trade-trigger'
				onClick={cancelTrade.bind(null, trade.book1)}
				>Cancel</span></p> :
			<p>{trade.owner} has offered you&nbsp;
				<span className='ribbon-color'>{trade.title1}</span>&nbsp;
			for your&nbsp;
				<span className='ribbon-color'>{trade.title2}</span>.&nbsp;
				<span
					className='trade-trigger'onClick={acceptTrade.bind(null, trade.book1)}
					>Accept</span>&nbsp;
				<span className='trade-trigger' onClick={cancelTrade.bind(null, trade.book1)}
				>Decline</span></p>))
		: <p>None</p> }
	</div>
	<hr />
	<div className='trades-done'>
		<h2>Trade History</h2>
		{tradesDone.length ?
		tradesDone.map(trade =>
			(trade.owner === username ?
			<p>You exchanged&nbsp;
				<span className='ribbon-color'>{trade.title1} </span>
			for <span className='ribbon-color'>{trade.title2} </span>
			with {trade.recipient}.</p> :
			<p>You exchanged&nbsp;
				<span className='ribbon-color'>{trade.title2} </span>
			for <span className='ribbon-color'>{trade.title1} </span>
			with {trade.owner}.</p>
	)) : <p>None</p> }
	</div>
</div>;

const mapStateToProps = store => ({
	trades: store.tradesPending,
	username: store.user.username,
	tradesDone: store.tradesDone,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ cancelTrade, acceptTrade }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TradesPending);
