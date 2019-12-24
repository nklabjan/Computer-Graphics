//////////////////////////////////////////////////////////////
//
// File: drawing.js
//
// Author: Nick Klabjan
//
//////////////////////////////////////////////////////////////

/**
 * html file calls this method to run the javascript program
 */
function start() {
    "use strict";

    // sets up webgl, twgl, and canvas
    let canvas = document.getElementById("mycanvas");
    let gl = canvas.getContext("webgl");
    let m4 = twgl.m4;

    // sets up the sliders
    let slider = document.getElementById('slider');
    slider.value = 0;
    let slider1 = document.getElementById('slider1');
    slider1.value = 0;
    let slider2 = document.getElementById('slider2');
    slider2.value = 0;

    // reads the vertex shader and fragment shader
    let vertexSource = document.getElementById("vs").text;
    let fragmentSource = document.getElementById("fs").text;

    // compiles the vertex shader
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    // checks if compilation of vertex shader worked
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertexShader)); return null; }

    // compiles the fragment shader
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    // checks if compilation of fragment shader worked
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    // attaches both vertex and fragment shader to the shader program
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    // checks to see that the program was linked correctly
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);

    // sets up the vPosition attribute for the vertex shader
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);

    //sets up the vColor attribute for the vertex shader
    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);

    // access to the matrix uniform
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");

    // array of vertices for the main cube
    let vertexPosCube = new Float32Array(
        [   1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,
            1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,
            1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,
            -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,
            -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,
            1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1    ]);

    // array of colors for the main cube
    let colorsForCube = new Float32Array(
        [   .7067,.5833,.1833,   .7067,.5833,.1833,    .7067,.5833,.1833,    .7067,.5833,.1833,
            .7067,.5833,.1833,   .7067,.5833,.1833,    .7067,.5833,.1833,    .7067,.5833,.1833,
            .7067,.5833,.1833,   .7067,.5833,.1833,    .7067,.5833,.1833,    .7067,.5833,.1833,
            .7067,.5833,.1833,   .7067,.5833,.1833,    .7067,.5833,.1833,    .7067,.5833,.1833,
            .7067,.5833,.1833,   .7067,.5833,.1833,    .7067,.5833,.1833,    .7067,.5833,.1833,
            .7067,.5833,.1833,   .7067,.5833,.1833,    .7067,.5833,.1833,    .7067,.5833,.1833     ]);

    // triangle indices for the main cube
    let triangleIndicesCube  = new Uint8Array(
        [   0, 1, 2,   0, 2, 3,
            4, 5, 6,   4, 6, 7,
            8, 9,10,   8,10,11,
            12,13,14,  12,14,15,
            16,17,18,  16,18,19,
            20,21,22,  20,22,23    ]);

    // puts vertices into a buffer to allow us to transfer them to the graphics hardware
    let trianglePosBufferCube = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferCube);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosCube, gl.STATIC_DRAW);
    trianglePosBufferCube.itemSize = 3;
    trianglePosBufferCube.numItems = 24;

    // puts colors into a buffer to allow us to transfer them to the graphics hardware
    let colorBufferCube = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferCube);
    gl.bufferData(gl.ARRAY_BUFFER, colorsForCube, gl.STATIC_DRAW);
    colorBufferCube.itemSize = 3;
    colorBufferCube.numItems = 24;

    // puts indices into a buffer to allow us to transfer them to the graphics hardware
    let indexBufferCube = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferCube);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesCube, gl.STATIC_DRAW);

    // vertex positions for the silver triangle
    let vertexPosSilverTriangle = new Float32Array (
        [   0,0,0,       .25,1,.25,   0,0,1,
            0,0,0,       1,0,0,       0,0,1,
            0,0,0,       1,0,0,       .25,1,.25,
            .25,1,.25,   1,0,0,       0,0,1         ]);

    // colors for each vertex for the silver triangle
    let vertexColorsSilverTriangle = new Float32Array (
        [   .64,.64,.64,    .64,.64,.64,    .64,.64,.64,
            .35,.35,.35,    .35,.35,.35,    .35,.35,.35,
            .75,.75,.75,    .75,.75,.75,    .75,.75,.75,
            .2,.2,.2,       .2,.2,.2,       .2,.2,.2,    ]);

    // triangle indices for the silver triangle
    let triangleIndicesSilverTriangle = new Uint8Array(
        [   0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9,10,11     ]);

    // puts vertices into a buffer to allow us to transfer them to the graphics hardware
    let trianglePosBufferSilverTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferSilverTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosSilverTriangle, gl.STATIC_DRAW);
    trianglePosBufferSilverTriangle.itemSize = 3;
    trianglePosBufferSilverTriangle.numItems = 12;

    // puts colors into a buffer to allow us to transfer them to the graphics hardware
    let colorBufferSilverTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferSilverTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColorsSilverTriangle, gl.STATIC_DRAW);
    colorBufferSilverTriangle.itemSize = 3;
    colorBufferSilverTriangle.numItems = 12;

    // puts indices into a buffer to allow us to transfer them to the graphics hardware
    let indexBufferSilverTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferSilverTriangle);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesSilverTriangle, gl.STATIC_DRAW);

    // vertex positions for the silver triangle
    let vertexPosGreenTriangle = new Float32Array (
        [   0,0,0,       .25,1,.25,   0,0,1,
            0,0,0,       1,0,0,       0,0,1,
            0,0,0,       1,0,0,       .25,1,.25,
            .25,1,.25,   1,0,0,       0,0,1         ]);

    // colors for each vertex for the silver triangle
    let vertexColorsGreenTriangle = new Float32Array (
        [   .5,.8,0,    .5,.8,0,    .5,.8,0,
            0,1,0,      0,1,0,      0,1,0,
            .2,.6,.1,   .2,.6,.1,   .2,.6,.1,
            .6,1,.2,    .6,1,.2,    .6,1,.2,    ]);

    // triangle indices for the silver triangle
    let triangleIndicesGreenTriangle = new Uint8Array(
        [   0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9,10,11     ]);

    // puts vertices into a buffer to allow us to transfer them to the graphics hardware
    let trianglePosBufferGreenTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferGreenTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosGreenTriangle, gl.STATIC_DRAW);
    trianglePosBufferGreenTriangle.itemSize = 3;
    trianglePosBufferGreenTriangle.numItems = 12;

    // puts colors into a buffer to allow us to transfer them to the graphics hardware
    let colorBufferGreenTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferGreenTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColorsGreenTriangle, gl.STATIC_DRAW);
    colorBufferGreenTriangle.itemSize = 3;
    colorBufferGreenTriangle.numItems = 12;

    // puts indices into a buffer to allow us to transfer them to the graphics hardware
    let indexBufferGreenTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferGreenTriangle);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesGreenTriangle, gl.STATIC_DRAW);

    // vertex positions for the silver triangle
    let vertexPosBlueTriangle = new Float32Array (
        [   0,0,0,       .25,1,.25,   0,0,1,
            0,0,0,       1,0,0,       0,0,1,
            0,0,0,       1,0,0,       .25,1,.25,
            .25,1,.25,   1,0,0,       0,0,1         ]);

    // colors for each vertex for the silver triangle
    let vertexColorsBlueTriangle = new Float32Array (
        [   .2,.2,1,   .2,.2,1,   .2,.2,1,
            0,0,1,     0,0,1,     0,0,1,
            .2,.6,1,   .2,.6,1,   .2,.6,1,
            0,0,.5,    0,0,.5,    0,0,.5,    ]);

    // triangle indices for the silver triangle
    let triangleIndicesBlueTriangle = new Uint8Array(
        [   0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9,10,11     ]);

    // puts vertices into a buffer to allow us to transfer them to the graphics hardware
    let trianglePosBufferBlueTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferBlueTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosBlueTriangle, gl.STATIC_DRAW);
    trianglePosBufferBlueTriangle.itemSize = 3;
    trianglePosBufferBlueTriangle.numItems = 12;

    // puts colors into a buffer to allow us to transfer them to the graphics hardware
    let colorBufferBlueTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferBlueTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColorsBlueTriangle, gl.STATIC_DRAW);
    colorBufferBlueTriangle.itemSize = 3;
    colorBufferBlueTriangle.numItems = 12;

    // puts indices into a buffer to allow us to transfer them to the graphics hardware
    let indexBufferBlueTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferBlueTriangle);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesBlueTriangle, gl.STATIC_DRAW);

    // vertex positions for the silver triangle
    let vertexPosRedTriangle = new Float32Array (
        [   0,0,0,       .25,1,.25,   0,0,1,
            0,0,0,       1,0,0,       0,0,1,
            0,0,0,       1,0,0,       .25,1,.25,
            .25,1,.25,   1,0,0,       0,0,1         ]);

    // colors for each vertex for the silver triangle
    let vertexColorsRedTriangle = new Float32Array (
        [   1,0,0,     1,0,0,      1,0,0,
            .4,0,0,    .4,0,0,     .4,0,0,
            .6,0,0,    .6,0,0,     .6,0,0,
            .8,0,0,    .8,0,0,     .8,0,0,     ]);

    // triangle indices for the silver triangle
    let triangleIndicesRedTriangle = new Uint8Array(
        [   0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9,10,11     ]);

    // puts vertices into a buffer to allow us to transfer them to the graphics hardware
    let trianglePosBufferRedTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferRedTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPosRedTriangle, gl.STATIC_DRAW);
    trianglePosBufferRedTriangle.itemSize = 3;
    trianglePosBufferRedTriangle.numItems = 12;

    // puts colors into a buffer to allow us to transfer them to the graphics hardware
    let colorBufferRedTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRedTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColorsRedTriangle, gl.STATIC_DRAW);
    colorBufferRedTriangle.itemSize = 3;
    colorBufferRedTriangle.numItems = 12;

    // puts indices into a buffer to allow us to transfer them to the graphics hardware
    let indexBufferRedTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferRedTriangle);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesRedTriangle, gl.STATIC_DRAW);

    /**
     * This method actually draws the objects to be drawn.
     */
    function draw() {
        // first slider changes camera position around the y-axis
        let angle1 = slider.value * (Math.PI/180);
        // second slider rotates the object
        let angle2 = slider1.value * (Math.PI/180);
        // third slider rotates the triangles
        let angle3 = slider2.value * (Math.PI/180);

        // sets up the camera view
        let eye = [400.0*Math.sin(angle1),150.0,400.0*Math.cos(angle1)];
        let target = [0,0,0];
        let up = [0,1,0];
        let tCamera = m4.inverse(m4.lookAt(eye,target,up));

        // rotates entire object over x-axis
        let xRotation = m4.axisRotation([1,0,0],angle2);

        // model transformation for the cube
        let tModelCube = m4.multiply(m4.scaling([75,75,75]), xRotation);

        // rotation for all triangles
        let tRotation = m4.axisRotation([1,1,1], angle3);

        // model transformation for the silver triangle
        let tModel_SilverTriangle = m4.multiply(m4.scaling([50,50,50]), m4.translation([75,-75,75]));
        let tModelSilverTriangle = m4.multiply(m4.multiply(tRotation, tModel_SilverTriangle), xRotation);

        // model transformation for the green triangle
        let rotation = m4.axisRotation([0,1,0], -Math.PI/2);
        let tModel_GreenTriangle = m4.multiply(m4.scaling([50,50,50]), m4.translation([-75,-75,75]));
        let tModelGreenTriangle1 = m4.multiply(m4.multiply(rotation, tModel_GreenTriangle), xRotation);
        let tModelGreenTriangle = m4.multiply(tRotation, tModelGreenTriangle1);

        // model transformation for the green triangle
        let rotation1 = m4.axisRotation([0,1,0],Math.PI);
        let tModel_BlueTriangle = m4.multiply(m4.scaling([50,50,50]), m4.translation([-75,-75,-75]));
        let tModelBlueTriangle1 = m4.multiply(m4.multiply(rotation1, tModel_BlueTriangle), xRotation);
        let tModelBlueTriangle = m4.multiply(tRotation, tModelBlueTriangle1);

        // model transformation for the red triangle
        let rotation2 = m4.axisRotation([0,1,0],Math.PI/2);
        let tModel_RedTriangle = m4.multiply(m4.scaling([50,50,50]), m4.translation([75,-75,-75]));
        let tModelRedTriangle1 = m4.multiply(m4.multiply(rotation2, tModel_RedTriangle), xRotation);
        let tModelRedTriangle = m4.multiply(tRotation, tModelRedTriangle1);

        // projection transformation
        let tProjection = m4.perspective(Math.PI/3,1,10,1000);

        // sets up all transformations together
        let tMVPCube = m4.multiply(m4.multiply(tModelCube,tCamera),tProjection);
        let tMVPSilverTriangle = m4.multiply(m4.multiply(tModelSilverTriangle,tCamera),tProjection);
        let tMVPGreenTriangle = m4.multiply(m4.multiply(tModelGreenTriangle,tCamera),tProjection);
        let tMVPBlueTriangle = m4.multiply(m4.multiply(tModelBlueTriangle,tCamera),tProjection);
        let tMVPRedTriangle = m4.multiply(m4.multiply(tModelRedTriangle,tCamera),tProjection);

        // clears the screen and performs z-buffering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // sets up the uniform matrix and attributes for Cube
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVPCube);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferCube);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBufferCube.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferCube);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBufferCube.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferCube);
        // draws Cube
        gl.drawElements(gl.TRIANGLES, triangleIndicesCube.length, gl.UNSIGNED_BYTE, 0);

        // sets up the uniform matrix and attributes for silver triangle
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVPSilverTriangle);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferSilverTriangle);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBufferSilverTriangle.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferSilverTriangle);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBufferSilverTriangle.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferSilverTriangle);
        // draws silver triangle
        gl.drawElements(gl.TRIANGLES, triangleIndicesSilverTriangle.length, gl.UNSIGNED_BYTE, 0);

        // sets up the uniform matrix and attributes for green triangle
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVPGreenTriangle);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferGreenTriangle);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBufferGreenTriangle.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferGreenTriangle);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBufferGreenTriangle.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferGreenTriangle);
        // draws silver triangle
        gl.drawElements(gl.TRIANGLES, triangleIndicesGreenTriangle.length, gl.UNSIGNED_BYTE, 0);

        // sets up the uniform matrix and attributes for blue triangle
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVPBlueTriangle);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferBlueTriangle);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBufferBlueTriangle.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferBlueTriangle);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBufferBlueTriangle.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferBlueTriangle);
        // draws blue triangle
        gl.drawElements(gl.TRIANGLES, triangleIndicesBlueTriangle.length, gl.UNSIGNED_BYTE, 0);

        // sets up the uniform matrix and attributes for red triangle
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVPRedTriangle);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBufferRedTriangle);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBufferRedTriangle.itemSize,
            gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRedTriangle);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBufferRedTriangle.itemSize,
            gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferRedTriangle);
        // draws red triangle
        gl.drawElements(gl.TRIANGLES, triangleIndicesRedTriangle.length, gl.UNSIGNED_BYTE, 0);
    }
    slider.addEventListener("input",draw);
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}

