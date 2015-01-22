chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------


		}
	}, 10);
});

var zoom = 100;
var body = $('body');

$scroller = body.kinetic('detach');

window.onmousewheel = function (e) {
	if (localStorage.scroller === 'yes') {
		e.preventDefault();

		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		if (delta === 1) {
			zoom += 6;
		} else {
			zoom -= 6;
		}

		body.css({zoom: zoom + '%'});

		return false;
	}
};


function storeScroller() {
	localStorage.scroller = localStorage.scroller !== undefined && localStorage.scroller === 'yes' ? 'no' : 'yes';
	console.log(localStorage.scroller);

}

function setupScroller() {
	if (localStorage.scroller === 'yes') {
		$scroller.kinetic('attach');
	} else {
		$scroller.kinetic('detach');
		body.css({zoom: '100%'});
	}
}

var sTestEventType = 'mousedown';

function handleMouseEvent(e) {
	var evt = (e == null ? event : e);
	var clickType = 'LEFT';

	if (evt.which) {
		if (evt.which == 3) {
			clickType = 'RIGHT';
		}
		if (evt.which == 2) {
			clickType = 'MIDDLE';
			//middleEvent();
		}
	}
	else if (evt.button) {
		if (evt.button == 2) {
			clickType = 'RIGHT';
		}
		if (evt.button == 4) {
			clickType = 'MIDDLE';
			//middleEvent();
		}
	}

	if (evt.type === 'dblclick') {
		storeScroller();
		setupScroller();
	}

	//console.log(evt.type + ': ' + clickType + ' button!');
	return true;
}

document.onmousedown = handleMouseEvent;
document.onmouseup = handleMouseEvent;
document.onclick = handleMouseEvent;
document.ondblclick = handleMouseEvent;