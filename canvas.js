//HALF_PI   PI   QUARTER_PI  TAU  TWO_PI  DEGREES  RADIANS
var canvas;
let width = $(window).width();
let height = $(window).height();

let mob;
detectMob();

console.log(height);
let px = 100 + width*0.05, py = 350 + height *0.2, pSize = 1, pDeltaX = pDeltaY =  pAngle = Math.random()*6.28;
let mapSize = Math.floor(height/9); let mapX = 9, mapY = 9;
let screenWidth  = width - (mapSize*mapX) - 5, screenX = mapSize*mapX;
px = Math.random((mapX-2)*mapSize), py = px = Math.random((mapX-2)*mapSize);
let pp = Math.floor(Math.floor(py/mapSize)* mapX + Math.floor(px/mapSize));



let map =
    [
        1,1,1,1,1,1,1,1,1,
        1,0,0,0,1,0,0,0,1,
        1,0,0,0,1,0,0,0,1,
        1,0,0,0,1,0,0,0,1,
        1,0,0,0,0,0,0,0,1,
        1,1,0,0,1,1,1,1,1,
        1,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1
    ];


function setup(){

    canvas = createCanvas(width, height);
    canvas.position(0,0);

}

function detectMob() {
    //alert('Height is: ' + height + ' and width is: ' + width);
    if( ( window.screen.availWidth <= 800 ) && ( window.screen.availHeight <= 600 ) )  {
        alert('Height is: ' + window.screen.availHeight + ' and width is: ' + window.screen.availWidth + 'Device is mobile.');
        //width = window.screen.availWidth* window.devicePixelRatio;
        //height = window.screen.availHeight* window.devicePixelRatio;
        mob = true;

    }
    else{
        alert('Height is: ' + window.screen.availHeight + ' and width is: ' + window.screen.availWidth + 'Device is NOT mobile.');
        mob = false;
        //width = window.screen.availWidth*0.8* window.devicePixelRatio;
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
    keyPress();
    //fill(80,70,50);
    fill(0);
    rect(width, 0, width, height);
    drawRays();

     drawMap();
    drawPlayer();
//    strokeWeight(1);
   // fill(0);
   // rect(0,0, floor(mapSize)*mapX, height);


}

function keyPress() {

    if (keyIsPressed) {
        console.log('Player angle is: ' + pAngle);
        if (keyCode === UP_ARROW) {

            if (map[floor(((px + pDeltaX)/mapSize) + floor((py + pDeltaY) / mapSize)*mapX)] !== 1 && map[floor(floor((px + pDeltaX + pSize)/mapSize) + floor((py + pDeltaY + pSize) / mapSize)*mapX)] !== 1
                && map[floor(floor((px + pDeltaX)/mapSize) + floor((py + pDeltaY + pSize) / mapSize)*mapX)] !== 1 && map[floor(floor((px + pDeltaX + pSize)/mapSize) + floor((py + pDeltaY) / mapSize)*mapX)] !== 1) {

                px += pDeltaX;
                py += pDeltaY;
            }
        } else if (keyCode === DOWN_ARROW) {
            if (map[(floor((py - pDeltaY) / mapSize)*mapX) + floor((px - pDeltaX) / mapSize)] !== 1 && map[(floor((py - pDeltaY + pSize) / mapSize)*mapX) + floor((px - pDeltaX + pSize) / mapSize)] !== 1
                && map[(floor((py - pDeltaY + pSize) / mapSize)*mapX) + floor((px - pDeltaX) / mapSize)] !== 1 && map[(floor((py - pDeltaY) / mapSize)*mapX) + floor((px - pDeltaX + pSize) / mapSize)] !== 1) {

                px -= pDeltaX;
                py -= pDeltaY;
            }
        } else if (keyCode === LEFT_ARROW) {
            pAngle -= 0.05;
            if (pAngle < 0) {
                pAngle += 2 * PI;
            }
            pDeltaX = cos(pAngle) * 3;
            pDeltaY = sin(pAngle) * 3;

        } else if (keyCode === RIGHT_ARROW) {
            pAngle += 0.05;
            if (pAngle > 2 * PI) {
                pAngle -= 2 * PI;
            }
            pDeltaX = cos(pAngle) * 3;
            pDeltaY = sin(pAngle) * 3;

        }

        return false;
    }
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
    let r, mx, my, mp, dof, rx, ry, ra, xOffset, yOffset, aTan, MS = floor(mapSize), numOfRays = 100;
    ra = pAngle - 0.5 - (0.5 *(1/6));
    let rr = ra;



        //for horizontal
let disH = 10000, disV = 10000, distFinal, hx = px, vx = px, hy = py, vy = py;
    for(r = 0; r < 300; r++) {

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

        if (disV < disH) {


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
        let ca = pAngle - rr; if(ca < 0) ca += 2*PI; if (ca > 2*PI) ca -= 2*PI;

        let lineH = (MS*height)/distFinal; if(lineH > height) lineH = height;
        let lineOffset = height/2 - lineH/2;
        let shading = height*1.2/lineH;
        noStroke();
        fill(170/shading,210/shading,290/shading);
        rect(r*(width/300), lineOffset,width/250, lineH);
        ra += 0.01/3; rr += 0.01/3
        if(ra > 2*PI)
        ra -= 2*PI;
        if(ra <0)
            ra += 2*PI;

        strokeWeight(1);
        stroke(255,0,0);
        line(px/3, py/3, rx/3, ry/3);
    }


}

