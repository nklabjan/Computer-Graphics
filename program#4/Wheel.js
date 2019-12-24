/////////////////////////////////////////////////////////////////////
//
// File name: Wheel.js
//
// @author Nick Klabjan
//
// Description: Draws an object that demonstrates hierarchical
//              Modeling in 3D.
/////////////////////////////////////////////////////////////////////

class Wheel {
    /**
     * Constructs a new Wheel.
     */
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.context = this.canvas.getContext('2d');
        this.m4 = twgl.m4;
    }

    /**
     * Allows us to move to a position in 3D.
     *
     * @param x, x location in 3D
     * @param y, y location in 3D
     * @param z, z location in 3D
     * @param Tx, transformation to be applied to the point
     */
    moveToTx(x,y,z,Tx) {
        let loc = [x,y,z];
        let locTx = this.m4.transformPoint(Tx,loc);
        this.context.moveTo(locTx[0]+250,-locTx[1]+400);
    }

    /**
     * Allows us to draw a line in 3D.
     *
     * @param x, x location of end of line in 3D
     * @param y, y location of end of line in 3D
     * @param z, z location of end of line in 3D
     * @param Tx, transformation to be applied to the end point of line
     */
    lineToTx(x,y,z,Tx) {
        let loc = [x,y,z];
        let locTx = this.m4.transformPoint(Tx,loc);
        this.context.lineTo(locTx[0]+250,-locTx[1]+400);
    }

    /**
     * Draws a wheel.
     *
     * @param f1 an array of coordinates to move to
     * @param f2 an array of coordinates that draws a line
     * @param f3 an array of coordinates that draws a line
     * @param f4 an array of coordinates that draws a line
     * @param f5 an array of coordinates that draws a line
     * @param Tx transformations ot be made onto the wheel
     * @param color
     */
    drawWheelHelper(f1,f2,f3,f4,f5,Tx, color) {
        this.context.beginPath();
        this.context.strokeStyle = "white";
        this.context.fillStyle = color;
        this.moveToTx(f1[0],f1[1],f1[2],Tx);
        this.lineToTx(f2[0],f2[1],f2[2],Tx);
        this.lineToTx(f3[0],f3[1],f3[2],Tx);
        this.lineToTx(f4[0],f4[1],f4[2],Tx);
        this.lineToTx(f5[0],f5[1],f5[2],Tx);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }

    /**
     * Draws the upper bottom left wheel relative to the picture when not in motion.
     *
     * @param Tx, transformation applied to the points
     */
    drawWheel(Tx) {
        //color to fill wheels
        let color = "black";

        //bottom face of wheel
        this.drawWheelHelper([-20,-20,-20],[20,-20,-20],[20,-20,20],[-20,-20,20],[-20,-20,-20],Tx, color);
        //back face of wheel
        this.drawWheelHelper([-20,-20,-20],[-20,20,-20],[20,20,-20],[20,-20,-20],[-20,-20,-20],Tx, color);
        //right face of wheel
        this.drawWheelHelper([20,-20,-20],[20,-20,20],[20,20,20],[20,20,-20],[20,-20,-20],Tx, color);
        //top face of wheel
        this.drawWheelHelper([20,20,20],[20,20,-20],[-20,20,-20],[-20,20,20],[20,20,20],Tx, color);
        //front face of wheel
        this.drawWheelHelper([20,-20,20],[-20,-20,20],[-20,20,20],[20,20,20],[20,-20,20],Tx, color);
        //left face of wheel
        this.drawWheelHelper([-20,-20,20],[-20,-20,-20],[-20,20,-20],[-20,20,20],[-20,-20,20],Tx, color);
    }
}