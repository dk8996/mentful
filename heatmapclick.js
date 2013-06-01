  startUpdateListener = function() {
    console.log("startUpdateListener");
   // var xy = getCoords(event, element);
   // console.log("handleClick, x" + xy[0] + ", y" + xy[1]);

    var socket = io.connect('http://ec2-54-243-14-81.compute-1.amazonaws.com:9123');

    socket.on('update', function(data) {
	console.log('Someone sent a update event');
	var heatMapWidth = $("#heatmapAreaClicks")[0].clientWidth;
	var heatMapHeight = $("#heatmapAreaClicks")[0].clientHeight;
	
	var xy = scale(data.x, data.y, data.creative_width, data.creative_height, heatMapWidth, heatMapHeight, 0, 0);
	
	var tmp = $("#heatmapAreaClicks")[0].getElementsByTagName("canvas");
	if(data.event === 'click'){
	simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent("mouseclick", true, true, window, 1, window.innerWidth, window.innerHeight, xy[0], xy[1], false, false, false, false, 0, null);
       
        var countElement =  $("#click-count")[0];
        countElement.textContent = +countElement.textContent + 1;
	tmp.onclick(simulatedEvent);
	}
	
    });

};

window.onload = function() {
    var xx = h337.create({
	"element" : document.getElementById("heatmapAreaClicks"),
	"radius" : 25,
	"visible" : true
    });

    $("#heatmapAreaClicks")[0].getElementsByTagName("canvas").onclick = function(ev) {
	var pos = h337.util.mousePosition(ev);
	xx.store.addDataPoint(pos[0], pos[1]);
    };

};

startUpdateListener();