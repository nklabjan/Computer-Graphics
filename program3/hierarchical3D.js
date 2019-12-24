/////////////////////////////////////////////////////////////////////
//
// File name: hierarchical3D.js
//
// @author Nick Klabjan
//
// Description: Draws an object that demonstrates hierarchical
//              Modeling in 3D.
/////////////////////////////////////////////////////////////////////

//creates the viewing angle on the 3D objects
const angle1 = 45*0.01*Math.PI;
const eye=[500*Math.cos(angle1),200,500*Math.sin(angle1)];
const target=[0,0,0];
const up=[0,1,0];

//variable to store how the objects moves horizontally
var x1 = 0;

//stores how the cube and 'wheels' rotate
var Wheeldegrees = 0;

//creates a new image that will be used as the pattern for the wheels


/**
 * Sets up all the drawings that are then drawn onto canvas.
 */
function setup() {
    "use strict";
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var m4 = twgl.m4;
    var slider = document.getElementById('slider');
    slider.value = 0;

    /**
     * Allows us to move to a position in 3D.
     *
     * @param x, x location in 3D
     * @param y, y location in 3D
     * @param z, z location in 3D
     * @param Tx, transformation to be applied to the point
     */
    function moveToTx(x,y,z,Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.moveTo(locTx[0]+100,-locTx[1]+300);
    }

    /**
     * Allows us to draw a line in 3D.
     *
     * @param x, x location of end of line in 3D
     * @param y, y location of end of line in 3D
     * @param z, z location of end of line in 3D
     * @param Tx, transformation to be applied to the end point of line
     */
    function lineToTx(x,y,z,Tx) {
        var loc = [x,y,z];
        var locTx = m4.transformPoint(Tx,loc);
        context.lineTo(locTx[0]+100,-locTx[1]+300);
    }

    /**
     * Draws the giant ride cube, aka center of object.
     *
     * @param Tx, transformation being applied to all the points
     */
    function drawCube(Tx) {
        //draws the back face of the cube
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "rgba(250,0,0,.3)";
        moveToTx(x1,0,0,Tx);
        lineToTx(x1+200,0,0,Tx);
        lineToTx(x1+200,200,0,Tx);
        lineToTx(x1,200,0,Tx);
        lineToTx(x1,0,0,Tx);
        context.fill();
        context.stroke();
        context.closePath();

        //draws the front face of the cube
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "rgba(250,0,0,.3)";
        moveToTx(x1,0,200,Tx);
        lineToTx(x1+200,0,200,Tx);
        lineToTx(x1+200,200,200,Tx);
        lineToTx(x1,200,200,Tx);
        lineToTx(x1,0,200,Tx);
        context.fill();
        context.stroke();
        context.closePath();

        //draws the right face of the cube
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "rgba(250,0,0,.3)";
        moveToTx(x1+200,0,200,Tx);
        lineToTx(x1+200,0,0,Tx);
        lineToTx(x1+200,200,0,Tx);
        lineToTx(x1+200,200,200,Tx);
        lineToTx(x1+200,0,200,Tx);
        context.fill();
        context.stroke();
        context.closePath();

        //draws the bottom face of the cube
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "rgba(250,0,0,.3)";
        moveToTx(x1,0,0,Tx);
        lineToTx(x1+200,0,0,Tx);
        lineToTx(x1+200,0,200,Tx);
        lineToTx(x1,0,200,Tx);
        lineToTx(x1,0,0,Tx);
        context.fill();
        context.stroke();
        context.closePath();

        //draws the left face of the cube
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "rgba(250,0,0,.3)";
        moveToTx(x1,0,0,Tx);
        lineToTx(x1,0,200,Tx);
        lineToTx(x1,200,200,Tx);
        lineToTx(x1,200,0,Tx);
        lineToTx(x1,0,0,Tx);
        context.fill();
        context.stroke();
        context.closePath();

        //draws the top face of the cube
        context.beginPath();
        context.strokeStyle = "red";
        context.fillStyle = "rgba(250,0,0,.3)";
        moveToTx(x1,200,0,Tx);
        lineToTx(x1,200,200,Tx);
        lineToTx(x1+200,200,200,Tx);
        lineToTx(x1+200,200,0,Tx);
        lineToTx(x1,200,0,Tx);
        context.fill();
        context.stroke();
        context.closePath();
    }

    /**
     * Sets up all the transformations and draws all the components of the picture.
     */
    function draw() {
        //clears the canvas screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        //allows the entire drawing to move in x direction
        x1 = (x1 + 1) % 900;

        //determines how fast the entire shape is spinning around x axis
        var Cuberadians = slider.value * (Math.PI/180);

        //determines how fast the wheels spin around their individiual z axis
        Wheeldegrees += 3;
        var Wheelradians = Wheeldegrees * (Math.PI/180);

        //transformations for the main cube
        var Tcube = m4.multiply(m4.rotationX(Cuberadians),
            m4.inverse(m4.lookAt(eye,target,up)));

        var Obj = new Wheel();

        //transformations for all the different "wheels'
        var Tbottomleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1,0,200]), Tcube));
        var Ttopleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1,0,0]), Tcube));
        var Ttoprightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1+200,0,0]), Tcube));
        var Tbottomrightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1+200,0,200]), Tcube));
        var Tuppertoprightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1+200,200,0]), Tcube));
        var Tupperbottomrightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1+200,200,200]), Tcube));
        var Tupperbottomleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1,200,200]), Tcube));
        var Tuppertopleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([x1,200,0]), Tcube));

        //calls all the draw methods
        drawCube(Tcube);
        Obj.drawWheel(Tbottomleftwheel);
        Obj.drawWheel(Ttopleftwheel);
        Obj.drawWheel(Ttoprightwheel);
        Obj.drawWheel(Tbottomrightwheel);
        Obj.drawWheel(Tuppertoprightwheel);
        Obj.drawWheel(Tupperbottomrightwheel);
        Obj.drawWheel(Tupperbottomleftwheel);
        Obj.drawWheel(Tuppertopleftwheel);
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);

}
window.onload = setup;

