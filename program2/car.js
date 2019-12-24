/////////////////////////////////////////////////////////////////
//
// File: car.js
//
// @author Nick Klabjan
//
// Description: Creates a car moving across a canvas screen.
//
/////////////////////////////////////////////////////////////////

//radius of both wheels
var wheelRadius = 13;
//radius of the rims for both wheels
var rimRadius = 8;
//the y coordinate for the center of both wheels
var centerOfWheelY = 40;
//the x coordinate of the back wheel
var centerOfBackWheelX = 25;
//the x coordinate of the front wheel
var centerOfFrontWheelX = 65;
//the rim color
var rimColor = "white";
//the rotation speed of the wheel
var rotationSpeed = 5;

/**
 * Creates a hierarchical model of a car that has both wheels spinning
 * while the car moves across the screen.
 */
function setup() {
    //creates the canvas to be drawn on
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    //stores the x coordinate of the car in motion
    var x = 0;
    //stores how fast the wheels will turn
    var degrees = 0;

    /**
     * Draws each part of the car creating the entire car
     */
    function drawCar() {
        //clears canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        //draws body of car
        drawBodyOfCar("silver");
        //draws back light
        drawBackLight("red");
        //draws windows
        drawWindow("silver");
        //draws front light
        drawFrontLight("yellow");
        //draws the two wheels
        drawFrontWheel("black");
        drawBackWheel("black");
        //how the car moves horizontally across the screen
        x = (x + 3) % 700;
        //draws the car at each new x value making the car move
        window.requestAnimationFrame(drawCar);
    }

    /**
     * Draws the body of the car.
     *
     * @param color, the color of the body of the car
     */
    function drawBodyOfCar(color) {
        //fills two rectangles with the specified color
        context.fillStyle = color;
        context.fillRect(x+5,15,80,25);
        context.fillRect(x+25,0,45,15);
    }

    /**
     * Draws the front window of the car.
     *
     * @param color, the color of the window
     */
    function drawWindow(color) {
        //draws a quarter of an arc outlined in the color specified
        context.beginPath();
        context.arc(x+70,15,15,3*Math.PI/2,0);
        context.strokeStyle = color;
        context.stroke();
    }

    /**
     * Draws the back light of the car.
     *
     * @param color, the color of the back light
     */
    function drawBackLight(color) {
        //draws a rectangle filled with the color specified
        context.fillStyle = color;
        context.fillRect(x+1,15,4,8);
    }

    /**
     * Draws the front light of the car.
     *
     * @param color, the color of the front light
     */
    function drawFrontLight(color) {
        //draws a semi-circle filled with the color specified
        context.beginPath();
        context.arc(x+85,18,4,3*Math.PI/2,Math.PI/2);
        context.fillStyle = color;
        context.fill();
    }

    /**
     * Draws the back wheel of the car.
     *
     * @param color, the color of the back wheel
     */
    function drawBackWheel(color) {
        context.save();
        //adjusts the rotation speed of the wheel
        degrees += rotationSpeed;
        //changes degrees to radians
        var radians = degrees * (Math.PI / 180);
        context.beginPath();
        //shifts the canvas axis to the center of the back wheel
        context.translate(x + centerOfBackWheelX,centerOfWheelY);
        //rotates the wheel around the new axis
        context.rotate(radians);
        context.arc(0,0,wheelRadius,2*Math.PI,0);
        context.fillStyle = color;
        context.fill();
        //draws the rims of back tire
        context.beginPath();
        context.lineWidth = 2;
        context.arc(0,0,rimRadius,2*Math.PI,0);
        context.moveTo(0,6);
        context.lineTo(0,-6);
        context.moveTo(-6,0);
        context.lineTo(6,0);
        context.strokeStyle = rimColor;
        context.stroke();
        context.restore();
    }

    /**
     * Draws the front wheel of the car.
     *
     * @param color, the color of the front wheel
     */
    function drawFrontWheel(color) {
        context.save();
        //adjusts the rotation speed of the wheel
        degrees += rotationSpeed;
        //changes degrees to radians
        var radians = degrees * (Math.PI / 180);
        context.beginPath();
        //shifts the canvas axis to the center of the front wheel
        context.translate(x + centerOfFrontWheelX,centerOfWheelY);
        //rotates the wheel around the new axis
        context.rotate(radians);
        context.arc(0,0,wheelRadius,2*Math.PI,0);
        context.fillStyle = color;
        context.fill();
        //draws the rims of back tire
        context.beginPath();
        context.lineWidth = 2;
        context.arc(0,0,rimRadius,2*Math.PI,0);
        context.moveTo(0,6);
        context.lineTo(0,-6);
        context.moveTo(-6,0);
        context.lineTo(6,0);
        context.strokeStyle = rimColor;
        context.stroke();
        context.restore();
    }
    //draws the car at each new x value making the car move
    window.requestAnimationFrame(drawCar);
}
window.onload = setup;