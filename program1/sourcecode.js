var STARTRADIUS = 100;
var MAXRADIUS = 135;
var WIDTH = 5;

function rainbow() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider = document.getElementById('slider');
    slider.value = 0;
    var dx = slider.value;
    var dy = slider.value;
    var y = canvas.height / 2;
    var x = canvas.width / 2;
    var colors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
    context.lineWidth = WIDTH;

    for (i = STARTRADIUS; i < MAXRADIUS; i = i + WIDTH) {
        context.beginPath();
        context.arc(x, y, i, Math.PI, 0);
        context.strokeStyle = colors[(i-STARTRADIUS)/WIDTH];
        context.stroke();
        context.closePath();
    }

    context.translate(dx,dy);
}



