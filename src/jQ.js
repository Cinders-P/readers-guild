window.onscroll = function () {
	const speed = 0.5;
	document.querySelector('.window').style.backgroundPosition = `0 ${-(window.pageYOffset * speed) + 50}px`;
	document.querySelector('.books').style.backgroundPosition = `0 ${-window.pageYOffset * speed}px`;
};

$(() => {
	$('.bookCard').hover(function () {
		$(this).css('opacity', 1);
	}, function () {
		$(this).css('opacity', 0);
	});
});
