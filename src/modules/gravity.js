const width = window.innerWidth;
const height = window.innerHeight;
const universeG = 1;
const timeIncrease = 0.000001
const initTimeStep = 0.05
let timeStep = initTimeStep
const maxVelocity = 50
const trailLen = 0
const trailInterval = 2

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
ctx.filter = 'blur(3px)'

// TEXT
const textCanvas = document.querySelector("#text");
textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight;
const textCtx = textCanvas.getContext('2d');

function clearAll(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0,0,width,height);
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
        this.inside = true

        this.trail = [[x],[y]]
        this.trailInterval = 0

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
        //drawing celestial body
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color[0];
        ctx.fill();


        for (var i = 1; i < this.trail[0].length; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.color[1] + (i/this.trail[0].length) + ')'
            ctx.closePath();
            ctx.arc(this.trail[0][i], this.trail[1][i], this.radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
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
            }
        }
        for (var i in this.currentVelocity) {
            let sign = 1
            if (this.currentVelocity[i] < 0) {
                sign = -1
            }

            if (Math.abs(this.currentVelocity[i]) > maxVelocity) {
                this.currentVelocity[i] = maxVelocity * sign
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

        //pop the last position of the trail and push the new position
        this.trailInterval += 1
        if (this.trailInterval % trailInterval == 0) {
            if (this.trail[0].length >= trailLen) {
                this.trail[0].shift()
                this.trail[1].shift()

                this.trail[0].push(this.pos[0])
                this.trail[1].push(this.pos[1])
            } else {
                this.trail[0].push(this.pos[0])
                this.trail[1].push(this.pos[1])
            }

            //check if the celestial body is inside the universe
            if (this.pos[0] >= width+this.radius
                || this.pos[0] <= 0-(this.radius)
                || this.pos[1] >= height+this.radius
                || this.pos[1] <= 0-(this.radius)) {
                    this.inside = false
            } else {
                this.inside = true
            }
        }
    }
}

function createSolarSystem(nBodies){
    var bodies = []
    for (var i = 0; i < nBodies; i++) {
        //p = new Planet(pos[i][0], pos[i][1])
        p = new Planet(i)
        bodies.push(p)
    }

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

function restart(){
    timeStep = initTimeStep
    for (var i = 0; i < bodies.length; i++) {
        bodies.splice(i,1)
    }

    bodies = createSolarSystem(10)

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].wake()
    }
}

function update(){
    clearAll()

    timeStep += timeIncrease

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].updateVelocity(bodies)
    }
    for (var i = 0; i < bodies.length; i++) {
        bodies[i].updatePosition()
        bodies[i].collisionCheck(bodies)
        //killPlanets(bodies)
        bodies[i].draw()
    }

    let counter = 0
    for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].inside) {
            counter += 1
        }
    }

    if (counter == 0) {
        restart()
    }

    window.requestAnimationFrame(update)
}

restart()
window.requestAnimationFrame(update)
