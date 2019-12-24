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
let angle1 = 45*0.01*Math.PI;
const target=[0,0,0];
const up=[0,1,0];

//stores how the cube and 'wheels' rotate
let Wheeldegrees = 0;

//stores how the cube rotates
let Cubedegrees = 0;

/**
 * Sets up all the drawings that are then drawn onto canvas.
 */
function setup() {
    "use strict";
    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d');
    let m4 = twgl.m4;
    let slider = document.getElementById('slider');
    slider.value = 0;

    /**
     * Sets up all the transformations and draws all the components of the picture.
     */
    function draw() {
        //clears the canvas screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        angle1 +=.01;
        let eye = [500*Math.cos(angle1),200,500*Math.sin(angle1)];

        //determines how fast the entire shape is spinning around x axis
        let Cuberadians = slider.value * (Math.PI/180);

        //determines how fast the wheels spin around their individual z axis
        Wheeldegrees += 0;
        let Wheelradians = Wheeldegrees * (Math.PI/180);

        //determines how fast the cube spins around the z axis
        Cubedegrees += 0;
        let Cuberadians1 = Cubedegrees * (Math.PI/180);

        //transformations for the main cube before rotations
        let Tcamera = m4.inverse(m4.lookAt(eye,target,up));

        let Trotations = m4.multiply(m4.rotationX(Cuberadians), m4.rotationZ(0));

        //transformations for the main cube
        let Tcube1 = m4.multiply(Tcamera,Trotations);

        //transformations for the red triangle
        let Ttrianglered = m4.multiply(Tcube1, m4.translation([-100, -100, -100]));

        //transformations for blue triangle
        let Ttriangleblue = m4.multiply(Tcube1, m4.translation([-100, 500, -100]));

        //transformations for purple triangle
        let Ttrianglepurple = m4.multiply(m4.rotationY(Math.PI), m4.translation([100, 100, 100]));
        let Ttrianglepurple1 = m4.multiply(Tcube1, Ttrianglepurple);

        //transformations for yellow triangle
        let Ttriangleyellow = m4.multiply(m4.translation([100,100,-100]),Tcube1);
        let Ttriangleyellow1 = m4.multiply(m4.rotationZ(-Math.PI/2),Ttriangleyellow);

        //transformations for orange triangle
        let Ttriangleorange = m4.multiply(m4.translation([100,-100,100]),Tcube1);
        let Ttriangleorange1 = m4.multiply(m4.rotationY(Math.PI),Ttriangleorange);

        //transformations for pink triangle
        let Ttrianglepink = m4.multiply(m4.rotationY(Math.PI/2), Ttriangleorange);
        let Ttrianglepink1 = m4.multiply(m4.rotationX(-Math.PI/2), Ttrianglepink);

        //transformations for green triangle
        let Ttrianglegreen = m4.multiply(m4.rotationX(Math.PI/2),Ttriangleblue);

        //creates a new wheel object
        let wheelObj = new Wheel();
        //creates a new cube object
        let cubeObj = new Cube();
        //creates a new Triangle object
        let triangleObj = new Triangle();

        //transformations for all the different "wheels'
        let Tbottomleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,-100,100]), Tcube1));
        let Ttopleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,-100,-100]), Tcube1));
        let Ttoprightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,-100,-100]), Tcube1));
        let Tbottomrightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,-100,100]), Tcube1));
        let Tuppertoprightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,100,-100]), Tcube1));
        let Tupperbottomrightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,100,100]), Tcube1));
        let Tupperbottomleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,100,100]), Tcube1));
        let Tuppertopleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,100,-100]), Tcube1));

        //calls all the draw methods
        triangleObj.drawTriangle(Ttrianglegreen,"green");
        triangleObj.drawTriangle(Ttrianglered,"red");
        triangleObj.drawTriangle(Ttriangleblue,"blue");
        triangleObj.drawTriangle(Ttrianglepurple1,"purple");
        triangleObj.drawTriangle(Ttriangleyellow1,"yellow");
        triangleObj.drawTriangle(Ttriangleorange1,"orange");
        triangleObj.drawTriangle(Ttrianglepink1,"pink");

        cubeObj.drawCube(Tcube1);

        wheelObj.drawWheel(Tbottomleftwheel);
        wheelObj.drawWheel(Ttopleftwheel);
        wheelObj.drawWheel(Ttoprightwheel);
        wheelObj.drawWheel(Tbottomrightwheel);
        wheelObj.drawWheel(Tuppertoprightwheel);
        wheelObj.drawWheel(Tupperbottomrightwheel);
        wheelObj.drawWheel(Tupperbottomleftwheel);
        wheelObj.drawWheel(Tuppertopleftwheel);

        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);

}
window.onload = setup;

