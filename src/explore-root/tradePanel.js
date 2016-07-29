export default (state = false, action) => {
	switch (action.type) {
	case 'TRADE_PANEL_ON':
		return { show: true, selectedBook: state.selectedBook };
	case 'TRADE_PANEL_OFF':
		return { show: false, selectedBook: state.selectedBook };
	case 'SET_SELECTED_BOOK':
		return { show: state.show, selectedBook: action.payload };
	default:
		return state;
	}
};
