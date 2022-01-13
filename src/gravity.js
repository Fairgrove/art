const width = window.innerWidth;
const height = window.innerHeight;
const universeG = 5;
const timeStep = 0.1

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
ctx.filter = 'blur(0px)'

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

function normalise(x1, x2){
    var min, max = 0

    if (x1 < x2){
        min = x1
        max = x2
    } else {
        min = x2
        max = x1
    }

    return ((x1 - x2) - min)/(min-max)
}

function norm(x1, x2){
    x = x1-x2
    if (x < 0){
        x = -1
    } else if (x > 0) {
        x = 1
    } else {
        x = 0
    }
    return x
}

class Planet{
    constructor(
        id,
        x = 50 +Math.floor(Math.random()*(width-50)),
        y = 50 + Math.floor(Math.random()*(height-50)),
        radius = 15 + Math.floor(Math.random()*50),
        initalVelocity = [
            Math.floor(Math.random() * 20) - 10,
            Math.floor(Math.random() * 20) - 10,
        ]
    ){
        this.id = id
        this.pos = [x, y]

        this.radius = radius
        this.mass = this.radius**2 * Math.PI
        this.initalVelocity = initalVelocity
        this.currentVelocity = [0,0]

        this.color = randomColor()
        this.life = this.radius
        this.text = String(this.id)
    }

    wake(){
        this.currentVelocity = this.initalVelocity
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.font = '20px arial';
        ctx.textAlign = "center";
        ctx.strokeText(this.text, this.pos[0], this.pos[1]);
    }

    updateVelocity(bodies){
        for (var i = 0; i < bodies.length; i++) {
            if (bodies[i] != this) {
                var distance = Math.sqrt((bodies[i].pos[0] - this.pos[0])**2 + (bodies[i].pos[1] - this.pos[1])**2)

                var forceDir = [
                   norm(bodies[i].pos[0], this.pos[0]), // x
                   -norm(bodies[i].pos[1], height - this.pos[1]), // y
               ]

                var force = [
                    forceDir[0] * universeG * this.mass * bodies[i].mass / distance**2,
                    forceDir[1] * universeG * this.mass * bodies[i].mass / distance**2
                ]

                var acceleration = [
                    force[0] / this.mass,
                    force[1] / this.mass
                ]

                this.currentVelocity[0] += acceleration[0] * timeStep
                this.currentVelocity[1] += acceleration[1] * timeStep
                //this.text = String(this.currentVelocity)
            }
        }
    }

    collisionCheck(bodies){
        for (var i = 0; i < bodies.length; i++) {
            if (bodies[i] != this) {
                var distance = Math.sqrt((bodies[i].pos[0] - this.pos[0])**2 + (bodies[i].pos[1] - this.pos[1])**2)
                var collision = this.radius + bodies[i].radius
                if (distance < collision) {
                    this.life -= bodies[i].radius
                    //this.text = String(this.life)
                }
            }
        }
    }

    updatePosition(){
        this.pos[0] += this.currentVelocity[0] * timeStep
        this.pos[1] += this.currentVelocity[1] * timeStep
    }
}

function createSolarSystem(nBodies){
    var bodies = []
    for (var i = 0; i < nBodies; i++) {
        //p = new Planet(pos[i][0], pos[i][1])
        p = new Planet(i)
        bodies.push(p)
    }

    // p1 = new Planet(0, width/2, height/2, 10, [0,0])
    // //p1.mass = p1.mass * 4
    // bodies.push(p1)
    //
    // p4 = new Planet(1, width/2+100, height/2, 30, [0,0])
    // bodies.push(p4)

    // p2 = new Planet((width/2)+150, (height/2)+150, 30, [-1,0])
    // bodies.push(p2)

    // p3 = new Planet((width/2), (height/2)+50, 5, [-7.15,0])
    // bodies.push(p3)

    return bodies
}

function killPlanets(bodies){
    for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].life <= 0) {
            bodies.splice(i,1)
        }
    }
}

bodies = createSolarSystem(10)
//bodies[0].wake()
function update(){
    clearAll()

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].updateVelocity(bodies)
    }
    for (var i = 0; i < bodies.length; i++) {
        bodies[i].updatePosition()
        bodies[i].collisionCheck(bodies)
        killPlanets(bodies)
        bodies[i].draw()
    }
    window.requestAnimationFrame(update)
}

for (var i = 0; i < bodies.length; i++) {
    bodies[i].wake()
}
window.requestAnimationFrame(update)
