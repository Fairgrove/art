const width = window.innerWidth;
const height = window.innerHeight;
var raf;

// BACKGROUND
const bckCanvas = document.querySelector("#background");
bckCanvas.width = window.innerWidth;
bckCanvas.height = window.innerHeight;
const bckCtx = bckCanvas.getContext('2d');

bckCtx.fillStyle = 'rgb(0, 0, 0)';
bckCtx.fillRect(0,0,width,height);

// MAIN
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.filter = 'blur(7px)'

// TEXT
const textCanvas = document.querySelector("#text");
textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight;
const textCtx = textCanvas.getContext('2d');

/*
* ACTUAL CODE BELOW
*/

var marker = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 20,
    color: 'blue',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function clearAll(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0,0,width,height);
}

function draw(){
    clearAll();

    marker.draw()
    marker.x += marker.vx
    marker.y += marker.vy
    // marker.vy *= .99;
    // marker.vy += .25;

    if (marker.y + marker.vy > height ||
        marker.y + marker.vy < 0) {
    marker.vy = -marker.vy;
    }
    if (marker.x + marker.vx > width ||
        marker.x + marker.vx < 0) {
    marker.vx = -marker.vx;
    }

    x = marker.x
    y = marker.y

    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(x, y);

    let s = 2 //scale
    ss = (s/width)-(s/2)
    Re = x * (s/width)-(s/2)
    Im = (y * (s/height)-(s/2)) * -1

    for (let i = 0; i < 100; i++) {
        Re = Re + (((Re * Re)-(Im * Im)))
        Im = Im + (((Im*Re)+(Re*Im)))

        if (Math.abs(Re) > 10000 || Math.abs(Im) > 10000) {
            break;
        }

        ctx.lineTo(Re* (width/2)+(width/2), (-1*Im)* (height/2)+(height/2));
    }
    ctx.stroke();
    raf = window.requestAnimationFrame(draw)
}

raf = window.requestAnimationFrame(draw)

textCtx.strokeStyle = 'white';
textCtx.lineWidth = 1;
textCtx.font = '20px arial';
textCtx.textAlign = "center";
textCtx.strokeText('text', width/2, height/2);
