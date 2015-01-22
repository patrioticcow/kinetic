chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            chrome.storage.sync.get(null, function (data) { console.log(data);
                localStorage.maxvelocity = data.maxvelocity;
                localStorage.sensitivity = data.sensitivity;
                localStorage.slowdown = data.slowdown;
                localStorage.snap = data.snap;
                localStorage.throttleFPS = data.throttleFPS;
                localStorage.value = data.value;
                localStorage.xaxis = data.xaxis;
                localStorage.yaxis = data.yaxis;
            });

            var sensitivity = localStorage.sensitivity ? parseFloat(localStorage.sensitivity * 100) : 6;
            var maxvelocity = localStorage.maxvelocity ? parseFloat(localStorage.maxvelocity * 100) : 40;
            var throttleFPS = localStorage.throttleFPS ? parseFloat(localStorage.throttleFPS * 100) : 60;
            var slowdown = localStorage.slowdown ? parseFloat(localStorage.slowdown * 10) : parseFloat(0.9);
            var xaxis = localStorage.xaxis && localStorage.xaxis === 'no' ? false : true;
            var yaxis = localStorage.yaxis && localStorage.yaxis === 'no' ? false : true;
            var zoom = 100;
            var body = $('body');
            kinectSnap = localStorage.snap ? localStorage.snap : 'yes';

            kinectOptions = {
                slowdown: slowdown,
                x: xaxis,
                y: yaxis,
                maxvelocity: maxvelocity,
                throttleFPS: throttleFPS
            };

            console.log(sensitivity);
            console.log(localStorage);
            console.log(kinectOptions);

            $scroller = body.kinetic('detach', kinectOptions);

            window.onmousewheel = function (e) {
                if (localStorage.scroller === 'yes') {
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
        $scroller.kinetic('attach');
    } else {
        $scroller.kinetic('detach');

        if (kinectSnap === 'yes') body.css({zoom: '100%'});
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