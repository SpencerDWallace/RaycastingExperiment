//HALF_PI   PI   QUARTER_PI  TAU  TWO_PI  DEGREES  RADIANS
var canvas;
let width1 = $(window).width();
let height = $(window).height();
let mob;
detectMob();

console.log(height);
let px = 100 + width1*0.05, py = 350 + height *0.2, pSize = 1, pDeltaX = pDeltaY =  pAngle = Math.random()*6.28;
let mapSize = Math.floor(height/9); let mapX = 9, mapY = 9;
let screenWidth  = width1 - (mapSize*mapX) - 5, screenX = mapSize*mapX;
px = Math.random((mapX-2)*mapSize), py = px = Math.random((mapX-2)*mapSize);
let pp = Math.floor(Math.floor(py/mapSize)* mapX + Math.floor(px/mapSize));
let mouseMove = 0;
let joystick;
let jStkOX = jStkX = 5*width1/6;
let jStkOY = jStkY = height*0.8;
let jStickDiam = height *0.1, jStickRad = height *0.05;
let jStkMid = height*0.8 + height *0.05;
let jYcap, jStkMax = Math.sqrt(jStickRad*jStickRad*window.devicePixelRatio);
let jStkAngle;



let map =
    [
        1,1,1,1,1,1,1,1,1,
        1,0,0,0,1,0,0,0,1,
        1,0,0,0,1,0,1,0,1,
        1,0,1,0,1,0,0,0,1,
        1,0,0,0,0,0,0,0,1,
        1,1,0,0,1,1,1,1,1,
        1,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1
    ];


function setup(){

    canvas = createCanvas(width1, height);
    canvas.position(0,0);


}


function detectMob() {

    //alert('innerHeight is: ' + window.screen.availHeight + ' and innerWidth is: ' + window.screen.availWidth);
    if ( ( window.screen.availWidth <= 1000 ) && ( window.screen.availHeight <= 800 ) ) {
        alert('Load the page on landscape for a better experience.');
        mob = true;

    }
    else{
        // alert('Device is NOT mobile.');
        mob = false;
        // width1 = window.screen.availWidth*0.8* window.devicePixelRatio;
        //height = window.screen.availHeight*0.7* window.devicePixelRatio;
    }
}

function drawPlayer(){
    while(map[pp] > 0){
        px = random((mapX-2)*mapSize) + mapSize, py = random((mapX-2)*mapSize) + mapSize;
        pp = Math.floor(Math.floor(py/mapSize)* mapX + Math.floor(px/mapSize));
    }
    stroke(255,255,50);
    fill(320,240,64);
    //square(px,py, pSize);
    //strokeWeight(1);
    fill(255,0,0);
    square(px/3,py/3,2);
    stroke(255,0,0);
    line(px/3 + 1,py/3 - 1,px/3 +pDeltaX*5,py/3 + pDeltaY*5);

}

function draw(){

    background(70);
    keyPressed();

    rect(width1, 0, width1, height);
    drawRays();

    drawMap();
    drawPlayer();
    noStroke();

    fill('rgba(10%,10%,10%,0.2)')
    circle(jStkOX, jStkOY, jStickDiam + 25)

    fill(120);
    circle(jStkX, jStkY, jStickDiam);
    fill(0);

    joystickDetection();
    joystickMovement();
}

function joystickMovement(){
    let x, y, jStkRatio;
    x = jStkOX - jStkX;
    y = jStkY - jStkOY;
    jStkRatio = Math.abs(x/jStickRad);

    jStkAngle = atan(y/x);
    if(jStkAngle < 0)
        jStkAngle += 2*PI;
    else if(jStkAngle > 2*PI)
        jStkAngle -= 2*PI;
    console.log(jStkAngle);
    if(jStkY < jStkOY - jStickRad/2 && jStkX < jStkOX + jStickRad/2 && jStkX > jStkOX - jStickRad/2 )
        moveUp();
    else if(jStkY > jStkOY + jStickRad/2 && jStkX < jStkOX + jStickRad/2 && jStkX > jStkOX - jStickRad/2 )
        moveDown();
    /*else if(jStkX > jStkOX + jStickRad/2 && jStkY < jStkOY + jStickRad/2 && jStkY > jStkOY - jStickRad/2 )
        moveRight();

    else if(jStkX < jStkOX - jStickRad/2 && jStkY < jStkOY + jStickRad/2 && jStkY > jStkOY - jStickRad/2 )
        moveLeft();
    */
    if(jStkRatio < 0.1)
        jStkRatio = 0;
    if(x > 0)
        pAngle -= 0.06*jStkRatio/window.devicePixelRatio;
    else if(x < 0)
        pAngle += 0.06*jStkRatio/window.devicePixelRatio;
    if (pAngle < 0) {
        pAngle += 2 * PI;
    }
    pDeltaX = cos(pAngle) * 2;
    pDeltaY = sin(pAngle) * 2;


}

function joystickDetection(){
    let d;
    let x;
    let y;
    if(mouseIsPressed) {
        x = mouseX - jStkOX;
        y = mouseY - jStkOY;
        x = x * x;
        y = y * y;
        if (Math.sqrt(x + y) > jStkMax)
            d = false;
        else
            d = true;
    }
    if(mouseIsPressed && d){
        jStkX = mouseX;
        jStkY = mouseY;

    }
    if(!mouseIsPressed){
        jStkX = jStkOX;
        jStkY = jStkOY;
    }

}

function keyPressed() {
    if (keyIsPressed) {
        if (keyCode === UP_ARROW) moveUp();
        else if (keyCode === DOWN_ARROW) moveDown();
        else if (keyCode === LEFT_ARROW) moveLeft();
        else if (keyCode === RIGHT_ARROW) moveRight();

    }return false;
}



function drawMap(){
    let MS = floor(mapSize)
    let x, y, xOffset,yOffset;
    for(y=0; y<mapY;y++){
        for(x=0; x<mapX;x++){
            if(map[y*mapX+x] === 1){fill(170,210,290);}
            else fill(80,70,50);
            stroke(150);
            // strokeWeight(1);
            xOffset = floor(x*MS/3); yOffset = floor(y*MS/3);
            rect(xOffset,yOffset, MS/3,MS/3);
        }
    }
}

function distt(a, b){
    let d = (Math.sqrt(a*a + b*b))
    // console.log("sqrt is: " + d)
    return d;
}

function drawRays() {
    /*mx is used for the column px is in, my is used for the row py is in,
    mp used for the block (index of map array) that the player is in,
    dof is for depth of field, rx is ray's x, ry is ray's y, ra is ray's angle,
    MS is the length-slash-width of each block, disH and disV are the distance
    the rays had to travel before hitting an object, set to 10000 as default,
    hx and hy are the x and y coordinates of the ray checking for horizontal contact,
    vx and vy are the x and y coordinates of the ray checking for vertical contact
     */
    let r, mx, my, mp, dof, rx, ry, ra, xOffset, yOffset, aTan, MS = floor(mapSize), numOfRays = 300;
    ra = pAngle - 0.5;
    let rr = ra;



    //for horizontal
    let disH = 10000, disV = 10000, distFinal, hx = px, vx = px, hy = py, vy = py;
    for(r = 0; r < numOfRays; r++) {

        disH = 10000, disV = 10000
        dof = 0;
        //checking horizontals
        aTan = -(1 / tan(ra));
        // looking down
        if (ra < PI && ra > 0) {
            ry = (floor(py / MS) + 1) * MS +0.01;
            rx = (py - ry) * aTan + px;
            yOffset = MS;
            xOffset = -1* yOffset * aTan;
        }
        //looking up
        else if (ra > PI && ra < 2*PI) {
            ry = floor(py / MS) * MS - 1;
            rx = (py - ry) * aTan + px;
            yOffset = -MS;
            xOffset = -1 * yOffset * aTan;
        } else {
            rx = px;
            ry = py;
            dof = mapX;
        }
        if(rx >= MS*mapX || ry >= MS*mapX)
            dof=8;
        while (dof < mapX) {

            mx = floor(rx / MS);

            my = floor(ry / MS);
            mp = floor(my * mapX + mx);

            if (mp >= 0 && mp < mapX * mapY && map[mp] > 0) {
                //log("mp horiz is: " + mp);
                hx = rx;
                hy = ry;
                disH = distt(px - hx, py - hy);
                dof = mapX;
            } else {

                rx += xOffset;

                ry += yOffset;
                dof += 1;
            }
        }

        //   console.log("mp is: " + mp);

        /*  strokeWeight(3);
         stroke(0,255,0);
          if(r==99)
              stroke(255,0,0);
          line(px, py, rx, ry);*/


        //checking verticals
        nTan = -1 * (tan(ra));
        dof = 0;
        //looking left
        if (ra > PI / 2 && ra < (3 * PI / 2)) {
            rx = floor(px / MS) * MS - 0.001;
            ry = (px - rx) * nTan + py;
            xOffset = -MS;
            yOffset = -xOffset * nTan;

        }
        //looking right
        else if (ra < PI / 2 || ra > (3 * PI / 2)) {
            rx = floor(px / MS) * MS + MS;
            ry = (px - rx) * nTan + py;
            xOffset = MS;
            yOffset = -xOffset * nTan;
        } else {
            rx = px;
            ry = py;
            dof = mapX;
        }
        while (dof < mapX) {

            mx = floor(rx / MS);

            my = floor(ry / MS);
            mp = floor(my * mapX + mx);
            if (mp >= 0 && mp < mapX * mapY && map[mp] > 0) {
                // console.log("mp vert is: " + mp);
                vx = rx;
                vy = ry;
                disV = distt(px - vx, py - vy);
                dof = mapX;
            } else {
                rx += xOffset;
                ry += yOffset;
                dof += 1;
            }
        }

        /* stroke(255,0,0);
         strokeWeight(2);
         if(r==99)
             stroke(0,255,0);
         line(px, py, rx, ry);*/

        if (disV <= disH) {


            rx = vx; ry = vy;
            distFinal = disV;


        } else if (disH < disV){

            rx = hx;
            ry = hy;

            distFinal = disH;
        }


        let w = Math.abs(px - rx);
        w = w*200/(MS*mapX)
        stroke(255, 0,0);
        //strokeWeight(1);

        mx = floor(rx / MS);

        my = floor(ry / MS);




        //Render 3D
        let w1 = numOfRays;
        let ca = pAngle - rr; if(ca < 0) ca += 2*PI; if (ca > 2*PI) ca -= 2*PI;

        let lineH = (MS*height)/distFinal; if(lineH > height) lineH = height;
        let lineOffset = height/2 - lineH/2;
        let shading = height*1.2/lineH;
        noStroke();
        fill(170/shading,210/shading,290/shading);
        rect(r*(width1/w1), lineOffset, width1/w1, lineH);
        ra += 0.5/(numOfRays/2); rr += 0.5/(numOfRays/2);
        if(ra > 2*PI)
            ra -= 2*PI;
        if(ra <0)
            ra += 2*PI;

        strokeWeight(1);
        stroke(255,0,0);
        //line(px/3, py/3, rx/3, ry/3);
    }


}


function moveUp() {
    if (map[floor(((px + pDeltaX) / mapSize) + floor((py + pDeltaY) / mapSize) * mapX)] !== 1 && map[floor(floor((px + pDeltaX + pSize) / mapSize) + floor((py + pDeltaY + pSize) / mapSize) * mapX)] !== 1
        && map[floor(floor((px + pDeltaX) / mapSize) + floor((py + pDeltaY + pSize) / mapSize) * mapX)] !== 1 && map[floor(floor((px + pDeltaX + pSize) / mapSize) + floor((py + pDeltaY) / mapSize) * mapX)] !== 1) {

        px += pDeltaX/window.devicePixelRatio;
        py += pDeltaY/window.devicePixelRatio;
    }
}

function moveDown() {
    if (map[(floor((py - pDeltaY) / mapSize) * mapX) + floor((px - pDeltaX) / mapSize)] !== 1 && map[(floor((py - pDeltaY + pSize) / mapSize) * mapX) + floor((px - pDeltaX + pSize) / mapSize)] !== 1
        && map[(floor((py - pDeltaY + pSize) / mapSize) * mapX) + floor((px - pDeltaX) / mapSize)] !== 1 && map[(floor((py - pDeltaY) / mapSize) * mapX) + floor((px - pDeltaX + pSize) / mapSize)] !== 1) {

        px -= pDeltaX/window.devicePixelRatio;
        py -= pDeltaY/window.devicePixelRatio;
    }
}

function moveRight(){
    pAngle += 0.08/window.devicePixelRatio;
    if (pAngle > 2 * PI) {
        pAngle -= 2 * PI;
    }
    pDeltaX = cos(pAngle) * 2;
    pDeltaY = sin(pAngle) * 2;
}


function moveLeft(){
    pAngle -= 0.08/window.devicePixelRatio;
    if (pAngle < 0) {
        pAngle += 2 * PI;
    }
    pDeltaX = cos(pAngle) * 2;
    pDeltaY = sin(pAngle) * 2;
}

function circlePressed(){
    if(!mouseReleased()) {
        if (mouseX > jStkX && mouseY > jStkY && mouseX < jStkX + height * 0.1 && mouseY < jStkY + height * 0.1)
            return true;
    }
}