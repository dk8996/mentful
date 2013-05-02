handleMouseMove = function(element) {
    console.log("handleMouseMove");
    var xy = getCoords(event, element);
    console.log("handleClick, x" + xy[0] + ", y" + xy[1]);

    var socket = io.connect('http://ec2-54-243-14-81.compute-1.amazonaws.com:9123');
    socket.emit('sendEvent', {
	event : 'click',
	x : xy[0],
	y : xy[1]
    });

    socket.on('update', function(data) {
	console.log('Someone sent a update event');
	var xy = scale(data.x, data.y, 270, 180, 720, 480, 5, 5);
	var newdiv = $("<div/>").css('background', 'url("dot.png")').css('position', 'absolute').css('width', '10px')
		.css('height', '10px').css('top', xy[1] + 'px').css('left', xy[0] + 'px');
	$("#image").append(newdiv);

    });

};

handleMouseOver = function(element) {
    console.log("handleMouseOver");
};

handleClick = function(element) {
    console.log("handleClick");
    var xy = getCoords(event, element);
    console.log("handleClick, x" + xy[0] + ", y" + xy[1]);

    var socket = io.connect('http://ec2-54-243-14-81.compute-1.amazonaws.com:9123');
    socket.emit('sendEvent', {
	event : 'click',
	x : xy[0],
	y : xy[1]
    });

    socket.on('update', function(data) {
	console.log('Someone sent a update event');
	var xy = scale(data.x, data.y, 270, 180, 720, 480, 25, 25);
	var newdiv = $("<div/>").css('background', 'url("dot.png")').css('position', 'absolute').css('width', '50px')
		.css('height', '50px').css('top', xy[1] + 'px').css('left', xy[0] + 'px');
	$("#image").append(newdiv);
    });

};

function scale(x, y, startW, startH, endW, endH, offSetX, offSetY) {
    var xScale = (endW / startW);
    var yScale = (endH / startH);

    x = x * xScale;
    y = y * yScale;
    return [ x - offSetX, y - offSetY ];
}

// Get X and Y position of the elm (from: vishalsays.wordpress.com)
function getXYpos(elm) {
    var x = elm.offsetLeft; // set x to elm’s offsetLeft
    var y = elm.offsetTop; // set y to elm’s offsetTop

    elm = elm.offsetParent; // set elm to its offsetParent

    // use while loop to check if elm is null
    // if not then add current elm’s offsetLeft to x
    // offsetTop to y and set elm to its offsetParent
    while (elm != null) {
	x = parseInt(x) + parseInt(elm.offsetLeft);
	y = parseInt(y) + parseInt(elm.offsetTop);
	elm = elm.offsetParent;
    }

    // returns an object with "xp" (Left), "=yp" (Top) position
    return {
	'xp' : x,
	'yp' : y
    };
}

// Get X, Y coords, and displays Mouse coordinates
function getCoords(e, element) {
    // coursesweb.net/
    var xy_pos = getXYpos(element);
    var x = 0;
    var y = 0;

    // if IE
    if (navigator.appVersion.indexOf("MSIE") != -1) {
	// in IE scrolling page affects mouse coordinates into an element
	// This gets the page element that will be used to add scrolling value
	// to correct mouse coords
	var standardBody = (document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;

	x = event.clientX + standardBody.scrollLeft;
	y = event.clientY + standardBody.scrollTop;
    } else {
	x = e.pageX;
	y = e.pageY;
    }

    x = x - xy_pos['xp'];
    y = y - xy_pos['yp'];

    return [ x, y ];
}
