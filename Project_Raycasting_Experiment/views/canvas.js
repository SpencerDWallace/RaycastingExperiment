//HALF_PI   PI   QUARTER_PI  TAU  TWO_PI  DEGREES  RADIANS
var canvas;
let width = ($(window).width())*0.9;
let height = ($(window).height()*0.8);

console.log(height);
let px = 100 + width*0.05, py = 350 + height *0.2, pSize = 1, pDeltaX = 5,pDeltaY = 0,pAngle = 0;
let mapSize = (height/9); let mapX = 9, mapY = 9;
let screenWidth  = width - (mapSize*mapX) - 5, screenX = mapSize*mapX;
let map =
        [
            1,1,1,1,1,1,1,1,1,
            1,0,0,0,1,0,0,0,1,
            1,0,0,1,1,0,1,0,1,
            1,0,0,1,0,0,1,1,1,
            1,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,1,
            1,0,0,1,1,1,0,0,1,
            1,0,0,0,1,0,0,0,1,
            1,1,1,1,1,1,1,1,1
        ];

function setup(){
    canvas = createCanvas(width, height);
    canvas.position(width*0.05, height *0.2);

}

function drawPlayer(){
    stroke(2);
    fill(320,240,64);
    square(px,py, pSize);
    strokeWeight(5);
    fill(255,0,0);
   // line(px,py,px +pDeltaX*5,py + pDeltaY*5);

}

function draw(){
    background(70);
    drawMap();
    drawPlayer();
    keyPress();
    fill(80,70,50);
    rect(screenX, 0, screenWidth, height);
    drawRays();
    strokeWeight(1);



}

function keyPress() {
    let MS = floor(mapSize);

    if (keyIsPressed) {
        if (keyCode === UP_ARROW) {

            if (map[floor(((px + pDeltaX)/MS) + floor((py + pDeltaY) / MS)*mapX)] !== 1 && map[floor(floor((px + pDeltaX + pSize)/MS) + floor((py + pDeltaY + pSize) / MS)*mapX)] !== 1
                && map[floor(floor((px + pDeltaX)/MS) + floor((py + pDeltaY + pSize) / MS)*mapX)] !== 1 && map[floor(floor((px + pDeltaX + pSize)/MS) + floor((py + pDeltaY) / MS)*mapX)] !== 1) {

                px += pDeltaX;
                py += pDeltaY;
            }
        } else if (keyCode === DOWN_ARROW) {
            if (map[(floor((py - pDeltaY) / MS)*mapX) + floor((px - pDeltaX) / MS)] !== 1 && map[(floor((py - pDeltaY + pSize) / MS)*mapX) + floor((px - pDeltaX + pSize) / MS)] !== 1
                && map[(floor((py - pDeltaY + pSize) / MS)*mapX) + floor((px - pDeltaX) / MS)] !== 1 && map[(floor((py - pDeltaY) / MS)*mapX) + floor((px - pDeltaX + pSize) / MS)] !== 1) {

                px -= pDeltaX;
                py -= pDeltaY;
            }
        } else if (keyCode === LEFT_ARROW) {
            pAngle -= 0.1;
            if (pAngle < 0) {
                pAngle += 2 * PI;
            }
            pDeltaX = cos(pAngle) * 5;
            pDeltaY = sin(pAngle) * 5;

        } else if (keyCode === RIGHT_ARROW) {
            pAngle += 0.1;
            if (pAngle > 2 * PI) {
                pAngle -= 2 * PI;
            }
            pDeltaX = cos(pAngle) * 5;
            pDeltaY = sin(pAngle) * 5;

        }

        return false;
    }
}



function drawMap(){
    let MS = floor(mapSize)
    let x, y, xOffset,yOffset;
    for(y=0; y<mapY;y++){
        for(x=0; x<mapX;x++){
            if(map[y*mapX+x] === 1){fill(255);}
            else fill(60,255,100);
            stroke(2);
            xOffset = x*MS; yOffset = y*MS;
            rect(xOffset,yOffset, MS,MS);
        }
    }
}

function distt(a, b){
    let d = (Math.sqrt(a*a + b*b))
    console.log("sqrt is: " + d)
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
    let r, mx, my, mp, dof, rx, ry, ra, xOffset, yOffset, aTan, MS = floor(mapSize);
    ra = pAngle;// - .25;



        //for horizontal
let disH = 10000, disV = 10000, distFinal, hx = px, vx = px, hy = py, vy = py;
    for(r = 0; r < 1; r++) {
        stroke(255, 0, 0);
        strokeWeight(1);
        dof = 0;
        //checking horizontals
        aTan = -1 * (1 / tan(ra));
        // looking down
        if (ra < PI) {
            ry = (floor(py / MS) + 1) * MS +0.01;
            rx = (py - ry) * aTan + px;
            yOffset = MS - 0.02;
            xOffset = -yOffset * aTan;
        }
        //looking up
        else if (ra > PI) {
            ry = floor(py / MS) * MS - 0.01;
            rx = (py - ry) * aTan + px;
            yOffset = -1 * MS;
            xOffset = -yOffset * aTan;
        } else {
            rx = px;
            ry = py;
            dof = 8;
        }
if(rx >= MS*mapX || ry >= MS*mapX)
    dof=8;
        while (dof < 8) {

            mx = floor(rx / MS);

            my = floor(ry / MS);
            mp = floor(my * mapX + mx);
            if (mp > 0 && mp < mapX * mapY && map[mp] > 0) {
                hx = rx;
                hy = ry;
                disH = distt(px - hx, py - hy,);
                dof = 9;
            } else {
                rx += xOffset;
                ry += yOffset;
                dof += 1;
            }
        }
        console.log("mp is: " + mp);
         line(px, py, rx, ry);


        //checking verticals
        nTan = -1 * (tan(ra));
        dof = 0;
        //looking left
        if (ra > PI / 2 && ra < (3 * PI / 2)) {
            rx = floor(px / MS) * MS - 0.001;
            ry = (px - rx) * nTan + py;
            xOffset = -1 * MS;
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
            dof = 8;
        }
        while (dof < 8) {

            mx = floor(rx / MS);

            my = floor(ry / MS);
            mp = floor(my * mapX + mx);
            if (mp > 0 && mp < mapX * mapY && map[mp] > 0) {
                vx = rx;
                vy = ry;
                disV = distt(px - vx, py - vy);
                dof = 9;
            } else {
                rx += xOffset;
                ry += yOffset;
                dof += 1;
            }
        }

/*
        if (disV < disH) {
            line(px, py, vx, vy);
            distFinal = disV;
        } else if (disH <= disV){
            line(px, py, hx, hy);
            distFinal = disV;
        }*/

        ra += 0.01;

       /* //Render 3D
        distFinal = distFinal*cos(pAngle-ra);
        let lineH = (MS*height)/distFinal; if(lineH > height) lineH = height;
        let lineOffest = height/2 - lineH/2;
       stroke(40);
        fill(255);
       //strokeWeight(screenWidth/50);
        rect(screenX + r*(screenWidth/50), 0,(screenWidth/50), lineH + lineOffest);
*/

    }


}

