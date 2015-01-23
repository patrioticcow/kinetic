chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			var L = localStorage;

			L.scroller = 'no'; // set default

			// todo make the settings work
			var sensitivity = L.sensitivity && !isNaN(L.sensitivity) ? parseFloat(L.sensitivity) * 100 : 6;
			var maxvelocity = L.maxvelocity && !isNaN(L.maxvelocity) ? parseFloat(L.maxvelocity) * 100 : 40;
			var throttleFPS = L.throttleFPS && !isNaN(L.throttleFPS) ? parseFloat(L.throttleFPS) * 100 : 60;
			var slowdown = L.slowdown && !isNaN(L.slowdown) ? parseFloat(L.slowdown) * 10 : parseFloat(0.9);
			var xaxis = L.xaxis && L.xaxis === 'no' ? false : true;
			var yaxis = L.yaxis && L.yaxis === 'no' ? false : true;
			var zoom = 100;
			var body = $('body');

			var kinectOptions = {
				slowdown: slowdown.toFixed(2),
				x: xaxis,
				y: yaxis,
				maxvelocity: maxvelocity,
				throttleFPS: throttleFPS
			};

			$scroller = body.kinetic('detach');

			// zoom function
			window.onmousewheel = function (e) {
				//console.log('onmousewheel');
				//console.log(L.scroller);
				if (L.scroller !== undefined && L.scroller === 'yes') {
					e.preventDefault();

					var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
					if (delta === 1) {
						zoom += sensitivity;
					} else {
						zoom -= sensitivity;
					}

					body.css({zoom: zoom + '%'});

					return false;
				}
			};

			// use triple click
			var timer, timeout = 200;

			window.addEventListener("dblclick", function (evt) {
				timer = setTimeout(function () {
					timer = null;
				}, timeout);
			});

			window.addEventListener("click", function (evt) {
				if (timer) {
					storeScroller();
					setupScroller();

					clearTimeout(timer);
					timer = null;
				}
			});

			// for the double click (disabled)
			document.onmousedown = handleMouseEvent;
			document.onmouseup = handleMouseEvent;
			document.onclick = handleMouseEvent;
			document.ondblclick = handleMouseEvent;
		}
	}, 10);
});

function storeScroller() {
	localStorage.scroller = localStorage.scroller !== undefined && localStorage.scroller === 'yes' ? 'no' : 'yes';
}

function setupScroller() {
	var body = $('body');

	if (localStorage.scroller === 'yes') {
		chrome.runtime.sendMessage({ "newIconPath" : 'attach' });
		$scroller.kinetic('attach');
	} else {
		chrome.runtime.sendMessage({ "newIconPath" : 'detach' });
		$scroller.kinetic('detach');

		body.css({zoom: '100%'});
	}
}

// double click, not used
function handleMouseEvent(e) {
	var evt = (e == null ? event : e);
	var clickType = 'LEFT';

	if (evt.which) {
		if (evt.which == 3) clickType = 'RIGHT';
		if (evt.which == 2) clickType = 'MIDDLE';
	}
	else if (evt.button) {
		if (evt.button == 2) clickType = 'RIGHT';
		if (evt.button == 4) clickType = 'MIDDLE';
	}

	if (evt.type === 'dblclick') {
		//storeScroller();
		//setupScroller();
	}

	//console.log(evt.type + ': ' + clickType + ' button!');
	return true;
}