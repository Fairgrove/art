const width = window.innerWidth;
const height = window.innerHeight;

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

function clearAll(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0,0,width,height);
}

function randomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

class Planet{
    constructor() {
        this.pos = [Math.floor(Math.random()*(width-30)), Math.floor(Math.random()*(height-30))]

        this.radius = 15 + Math.floor(Math.random()*50)
        this.mass = this.radius * Math.PI
        this.initalVelocity = [1,1]
        this.currentVelocity = [0,0]

        this.color = randomColor()
    }

    wake(){
        this.initalVelocity = this.currentVelocity
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createSolarSystem(nBodies){
    var bodies = []

    for (var i = 0; i < nBodies; i++) {
        p = new Planet()
        bodies.push(p)
    }
    return bodies
}

bodies = createSolarSystem(2)
function update(){
    clearAll()

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].draw()
    }

    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

textCtx.strokeStyle = 'white';
textCtx.lineWidth = 1;
textCtx.font = '20px arial';
textCtx.textAlign = "center";
textCtx.strokeText('text', width/2, height/2);
