/////////////////////////////////////////////////////////////////////
//
// File name: Triangle.js
//
// @author Nick Klabjan
//
// Description: Draws an object that demonstrates hierarchical
//              Modeling in 3D.
/////////////////////////////////////////////////////////////////////

class Triangle{
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
     * Draws the giant ride cube, aka center of object.
     *
     * @param Tx, transformation being applied to all the points
     * @param color, the color for Triangle to be filled
     */
    drawTriangle(Tx,color) {
        //draws the back face of the cube
        this.context.beginPath();
        this.context.fillStyle = color;
        this.moveToTx(0,0,0,Tx);
        this.lineToTx(200,0,0,Tx);
        this.lineToTx(0,0,200,Tx);
        this.lineToTx(0,0,0,Tx);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }
}