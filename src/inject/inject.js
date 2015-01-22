chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			var L = localStorage;

			if(L.scroller === undefined) L.scroller = 'no';

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

			window.onmousewheel = function (e) {
				if (L.scroller === 'yes') {
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
		storeScroller();
		setupScroller();
	}

	//console.log(evt.type + ': ' + clickType + ' button!');
	return true;
}