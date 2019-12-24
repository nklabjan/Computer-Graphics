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
const target = [0,0,0];
const up = [0,1,0];

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

    /**
     * Sets up all the transformations and draws all the components of the picture.
     */
    function draw() {
        //clears the canvas screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        angle1 += .01;
        let eye = [500*Math.cos(angle1),200,500*Math.sin(angle1)];

        //determines how fast the wheels spin around their individual z axis
        Wheeldegrees += 3;
        let Wheelradians = Wheeldegrees * (Math.PI/180);

        //determines how fast the cube spins around the z axis
        Cubedegrees += 0;
        let Cuberadians = Cubedegrees * (Math.PI/180);

        //transformations for the main cube before rotations
        let Tcamera = m4.inverse(m4.lookAt(eye,target,up));

        //transformation regarding the perspective
        let Tprojection = m4.perspective(Math.PI/3,1,-100,-200);

        //normalizes the projection
        let Tviewport = m4.multiply(m4.scaling([200,200,0]),m4.translation([200,-100,0]));

        //transformations for the main cube and red triangle
        let Tcube1 = m4.multiply(Tcamera,m4.rotationZ(Cuberadians));

        //combines all tranformations into one so far
        let Tfinal = m4.multiply(m4.multiply(Tcube1,Tprojection),Tviewport);

        //transformations for the red triangle
        let Ttrianglered = m4.multiply(m4.translation([-100, -100, -100]), Tfinal);

        //transformations for blue triangle
        let Ttriangleblue = m4.multiply(m4.translation([-100, 100, -100]), Tfinal);

        //transformations for purple triangle
        let Ttrianglepurple = m4.multiply(m4.rotationY(Math.PI),
            m4.multiply(m4.translation([100, 100, 100]), Tfinal));

        //transformations for yellow triangle
        let Ttriangleyellow = m4.multiply(m4.translation([100,100,-100]),Tfinal);
        let Ttriangleyellow1 = m4.multiply(m4.rotationZ(-Math.PI/2),Ttriangleyellow);

        //transformations for orange triangle
        let Ttriangleorange = m4.multiply(m4.translation([100,-100,100]),Tfinal);
        let Ttriangleorange1 = m4.multiply(m4.rotationY(Math.PI),Ttriangleorange);

        //transformations for pink triangle
        let Ttrianglepink = m4.multiply(m4.rotationY(Math.PI/2), Ttriangleorange);
        let Ttrianglepink1 = m4.multiply(m4.rotationX(-Math.PI/2), Ttrianglepink);

        //transformations for green triangle
        let Ttrianglegreen = m4.multiply(m4.rotationX(Math.PI/2),Ttriangleblue);

        //transformations for cyan triangle
        let Ttrianglecyan = m4.multiply(m4.translation([100,-100,-100]),Tfinal);
        let Ttrianglecyan1 = m4.multiply(m4.rotationY(Math.PI), Ttrianglecyan);
        let Ttrianglecyan2 = m4.multiply(m4.rotationX(-Math.PI/2), Ttrianglecyan1);

        //transformations for violet triangle
        let Ttriangleviolet = m4.multiply(m4.translation([-100,-100,-100]),Tfinal);
        let Ttriangleviolet1 = m4.multiply(m4.rotationZ(Math.PI/2), Ttriangleviolet);

        //transformations for gray triangle
        let Ttrianglegray = m4.multiply(m4.translation([-100,100,100]),Tfinal);
        let Ttrianglegray1 = m4.multiply(m4.rotationY(Math.PI/2), Ttrianglegray);
        let Ttrianglegray2 = m4.multiply(m4.rotationX(Math.PI/2), Ttrianglegray1);

        //transformations for tomato triangle
        let Ttriangletomato = m4.multiply(m4.translation([100,-100,100]),Tfinal);
        let Ttriangletomato1 = m4.multiply(m4.rotationY(-Math.PI/2), Ttriangletomato);
        let Ttriangletomato2 = m4.multiply(m4.rotationZ(Math.PI/2), Ttriangletomato1);

        //transformations for tomato triangle
        let Ttrianglespringgreen = m4.multiply(m4.translation([-100,100,100]),Tfinal);
        let Ttrianglespringgreen1 = m4.multiply(m4.rotationX(Math.PI/2), Ttrianglespringgreen);

        //creates a new wheel object
        let wheelObj = new Wheel();
        //creates a new cube object
        let cubeObj = new Cube();
        //creates a new Triangle object
        let triangleObj = new Triangle();

        //transformations for all the different "wheels'
        let Tbottomleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,-100,100]), Tfinal));
        let Ttopleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,-100,-100]), Tfinal));
        let Ttoprightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,-100,-100]), Tfinal));
        let Tbottomrightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,-100,100]), Tfinal));
        let Tuppertoprightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,100,-100]), Tfinal));
        let Tupperbottomrightwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([100,100,100]), Tfinal));
        let Tupperbottomleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,100,100]), Tfinal));
        let Tuppertopleftwheel = m4.multiply(m4.rotationZ(-Wheelradians),
            m4.multiply(m4.translation([-100,100,-100]), Tfinal));

        //calls all the draw methods
        cubeObj.drawCube(Tfinal);
        triangleObj.drawTriangle(Ttrianglegreen,"green");
        triangleObj.drawTriangle(Ttrianglecyan2,"cyan");
        triangleObj.drawTriangle(Ttriangleviolet1,"violet");
        triangleObj.drawTriangle(Ttrianglegray2,"gray");
        triangleObj.drawTriangle(Ttrianglered,"red");
        triangleObj.drawTriangle(Ttriangleblue,"blue");
        triangleObj.drawTriangle(Ttrianglepurple,"purple");
        triangleObj.drawTriangle(Ttriangleyellow1,"yellow");
        triangleObj.drawTriangle(Ttriangleorange1,"orange");
        triangleObj.drawTriangle(Ttrianglepink1,"pink");
        triangleObj.drawTriangle(Ttriangletomato2,"tomato");
        triangleObj.drawTriangle(Ttrianglespringgreen1,"springgreen");


        wheelObj.drawWheel(Ttopleftwheel);
        wheelObj.drawWheel(Ttoprightwheel);
        wheelObj.drawWheel(Tbottomleftwheel);
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

