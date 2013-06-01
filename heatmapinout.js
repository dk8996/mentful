startUpdateListener = function() {
    console.log("startUpdateListener");
    // var xy = getCoords(event, element);
    // console.log("handleClick, x" + xy[0] + ", y" + xy[1]);

    var socket = io.connect('http://ec2-54-243-14-81.compute-1.amazonaws.com:9123');

    socket.on('update', function(data) {
		console.log('Someone sent a update event');

		if (data.event === 'click') {
		    var heatMapWidth = $("#heatmapArea")[0].clientWidth;
		    var heatMapHeight = $("#heatmapArea")[0].clientHeight;

		    var xy = scale(data.x, data.y, data.creative_width, data.creative_height, heatMapWidth, heatMapHeight, 0, 0);
		    var tmp = $("canvas")[0];
		    var ctx = document.getElementById('canvas').getContext('2d');
		}

	    });

};

startUpdateListener();