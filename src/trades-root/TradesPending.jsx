import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cancelTrade, acceptTrade } from './actions.js';

const TradesPending = ({ trades, username, cancelTrade, acceptTrade }) =>
	<div className='trades-root'><h2>Trades Pending</h2>
		{trades.length ?
		trades.map(trade =>
			(trade.owner === username ?
			<p>You offered
				<span className='ribbon-color'>{trade.title1}</span>
			for {trade.recipient}''s
				<span className='ribbon-color'>{trade.title2}</span>.
			<span
				className='trade-trigger'
				onClick={ cancelTrade.bind(null, trade.book1) }
				>Cancel</span></p> :
			<p>{trade.owner} has offered you&nbsp;
				<span className='ribbon-color'>{trade.title1}</span>&nbsp;
			for your&nbsp;
				<span className='ribbon-color'>{trade.title2}</span>.&nbsp;
				<span className='trade-trigger'>Accept</span>&nbsp;
				<span className='trade-trigger' onClick={ cancelTrade.bind(null, trade.book1) }
				>Decline</span></p>))
		: <p>None</p> }
	</div>;

const mapStateToProps = store => ({
	trades: store.tradesPending,
	username: store.user.username,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ cancelTrade, acceptTrade }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TradesPending);
