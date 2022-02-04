const width = window.innerWidth;
const height = window.innerHeight;

let backgroundAnim = 1 + Math.floor(Math.random()*2)

let menu = 1
const nButtons = 3
const buttonSymbols = ['#', 'Ω', 'N']
let menuButtons = []

const about = [
    'hej',
    'I gotta tell you about Jeff.',
    'Jeff loves mattresses,',
    'He will, on the reg, just go and get a new one.',
    'Some days he even gets two, just for the sake of it.',
    'So, anyway, one day... Jeff doesn\'t show up to the mattress store.',
    'and we\'re all like, Where TF Jeff at?',
    'like, you gotta understand, this guy',
    'I mean...',
    'He REALLY loves mattresses.',
    'god only knows what he does with them.',
    'anyway, Jeff didn\'t come to the mattress store one day',
    'and everyone was wondering if anything might have happened.',
    'He died of Corona.',
    'Moral of the story:',
    'If you love mattresses, you get corona and die from it',
    'Just like Jeff did.',
    'gotta be careful out there.',
    'but man, that guy was really into mattresses',
    '...',
    'Like, perhaps, you don\'t even understand',
    'It was crazy!',
    'one time, he gave a whole speech!',
    'it was about how good his purchase was from the day before.',
    'But, I digress.',
    'One must be careful with too much exposure to mattresses',
    'Because, as it turns out.',
    'You might end up dead',
    'in a ditch',
    'Of corona, of course.',
]

// MAIN
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.filter = 'blur(0px)'

const cursor = {
    x: width / 2,
    y: height / 2,
    mappedX: 0.5,
    mappedY: 0.5,
    clickX: 0,
    clickY: 0,
}

class button{
    constructor(id, text){
        this.id = id
        this.width = 150 //width
        this.height = 100 //height
        this.startX = (width/2)-75 //-half width
        this.startY = 30 //-half height

        this.text = text

        this.offset = 5

        let difference = this.width + this.offset
        let pos = -((nButtons-1)/2) * difference + ((this.id - 1) * difference)

        this.startX += pos
    }

    draw(){
        ctx.beginPath();
        ctx.rect(
            this.startX,
            this.startY,
            this.width,
            this.height);
        ctx.fillStyle = 'rgba(0,100,100,1)'
        ctx.fill();

        ctx.fillStyle  = 'white';
        ctx.textAlign = "center"
        ctx.lineWidth = 1;
        ctx.font = '50px verdana';
        ctx.fillText(this.text, this.startX+this.width/2, this.startY+15+this.height/2);

        if (cursor.x >= this.startX && cursor.x <= (this.startX + this.width)){
            if (cursor.y >= this.startY && cursor.y <= (this.startY + this.height)) {
                ctx.beginPath();
                ctx.rect(
                    this.startX,
                    this.startY,
                    this.width,
                    this.height);
                ctx.fillStyle = 'rgba(255,255,255,0.5)'
                ctx.fill();
            }
        }
    }

    click(){
        if (cursor.clickX >= this.startX && cursor.clickX <= (this.startX + this.width)){
            if (cursor.clickY >= this.startY && cursor.clickY <= (this.startY + this.height)) {
                //if (menu != this.id){
                    menu = this.id
                //}
            }
        }
    }
}

function randomColor() {
    rgb = ['rgb','rgba']
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;

    //use for normal color
    rgb[0] = 'rgb(' + r + ',' + g + ',' + b + ')'

    //intentionally left open to have variable alpha
    // end with " + alpha + ')' "
    rgb[1] = 'rgba(' + r + ',' + g + ',' + b  + ','
    return rgb
}

function findSign(x1, x2){
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

function homePage(){
    const box = {
        topLeft: (width/2)-300, //-half width
        bottomLeft: (height/2)-65, //-half height
        topRight: 600, //width
        bottomRight: 140, //height
        shadowOffset: 20,
    }

    ctx.beginPath();
    ctx.rect(
        box.topLeft,
        box.bottomLeft,
        box.topRight,
        box.bottomRight);
    ctx.fillStyle = 'rgba(0,255,100,0.3)'
    ctx.fill();

    ctx.beginPath();
    //ctx.rect((width/2)-275, (height/2)-50, 550, 100);
    ctx.rect(
        box.topLeft-box.shadowOffset*cursor.mappedX,
        box.bottomLeft-box.shadowOffset*cursor.mappedY,
        box.topRight+box.shadowOffset,
        box.bottomRight+box.shadowOffset)
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.fill();

    ctx.fillStyle  = 'white';
    ctx.textAlign = "center"
    ctx.lineWidth = 1;
    ctx.font = '30px arial';
    ctx.fillText('Hi :)', width/2, height/2-21);

    ctx.fillStyle  = 'white';
    ctx.textAlign = "center"
    ctx.lineWidth = 1;
    ctx.font = '20px verdana';
    ctx.fillText('My name is Frederik Fagerlund,', width/2, height/2 +10);
    ctx.fillText('I make computers go beep boop, (soon) professionally', width/2, height/2+35 );

}

function aboutPage(){
    const box = {
        topLeft: (width/2)-300, //-half width
        bottomLeft: (height/2)-(21*about.length)/2, //-half height
        topRight: 600, //width
        bottomRight: 23*about.length, //height
        shadowOffset: 25,
    }

    ctx.beginPath();
    ctx.rect(
        box.topLeft,
        box.bottomLeft,
        box.topRight,
        box.bottomRight);
    ctx.fillStyle = 'rgba(0,255,100,0.3)'
    ctx.fill();

    ctx.beginPath();
    //ctx.rect((width/2)-275, (height/2)-50, 550, 100);
    ctx.rect(
        box.topLeft-box.shadowOffset*cursor.mappedX,
        box.bottomLeft-box.shadowOffset*cursor.mappedY,
        box.topRight+box.shadowOffset,
        box.bottomRight+box.shadowOffset)
    ctx.fillStyle = 'rgba(0,0,0,0.15)'
    ctx.fill();

    ctx.fillStyle  = 'white';
    ctx.textAlign = "center"
    ctx.lineWidth = 1;
    ctx.font = '15px verdana';
    for (var i = 0; i < about.length; i++) {
        ctx.fillText(about[i], width/2, height/2 + 50 + (22*(i-(about.length/2))))
    }
}

function pagePicker(){
    if (menu == 1) {
        homePage()
    } else if (menu == 2) {
        aboutPage()
    }
}

function menuLayer(){
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].draw()
    }
}

function background(){
    ctx.fillStyle = 'rgba(33, 33, 36, 1)';
    ctx.fillRect(0,0,width,height);
}

function artPicker(){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.font = '20px arial';
    ctx.textAlign = "center";
    ctx.strokeText(backgroundAnim, 200, 100);

    if (backgroundAnim == 1){
        followCursor()
    } else if (backgroundAnim == 2) {
        runChaoticGravity()
    }
}

//creating buttons
for (var i = 1; i < 4; i++) {
    menuButtons.push(new button(i, buttonSymbols[i-1]))
}

background()
menuLayer()
pagePicker()

window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    cursor.mappedX = ((cursor.x - width)/width)+1
    cursor.mappedY = ((cursor.y - height)/height)+1
})

window.addEventListener('mouseup', e => {
    cursor.clickX = e.offsetX
    cursor.clickY = e.offsetY

    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].click()
    }
});


function update(){
    background()
    artPicker()
    menuLayer()
    pagePicker()

    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

/*
--------------------------------------------------------------------------------
    ART GOES HERE
--------------------------------------------------------------------------------
*/

/*
--------------------------------------------------------------------------------
    Simple Follow Cursor trail
--------------------------------------------------------------------------------
*/

let trailLen = 50
let trail = [[],[]]

function followCursor(){
    if (trail[0].length >= trailLen) {
        trail[0].shift()
        trail[1].shift()

        trail[0].push(cursor.x)
        trail[1].push(cursor.y)
    } else {
        trail[0].push(cursor.x)
        trail[1].push(cursor.y)
    }

    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.lineWidth = 5;
    //ctx.moveTo(cursor.x, cursor.y);

    for (var i = 1; i < trail[0].length; i++) {
        ctx.lineTo(trail[0][i], trail[1][i]);
    }

    ctx.stroke();
}


/*
--------------------------------------------------------------------------------
    Chaotic Gravity
--------------------------------------------------------------------------------
*/

const universeG = 1;
const timeIncrease = 0.000001
const initTimeStep = 0.05
let timeStep = initTimeStep
const maxVelocity = 200
const trailInterval = 2
let numBodies = 10
let showTrial = true

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

        this.radius = radius
        this.mass = this.radius**2 * Math.PI
        this.initalVelocity = initalVelocity
        this.currentVelocity = [0,0]

        this.color = randomColor()
        this.life = this.radius
        this.text = String(this.id)

        this.trail = [[x],[y]]
        this.trailInterval = 0
        this.numTails = 3 + Math.floor(Math.random()*5)
        this.tailPos = [[],[]]
        for (var i = 0; i < this.numTails; i++) {
            x = (i/this.numTails)*2*Math.PI
            this.tailPos[0].push(this.radius*(Math.cos(x)))
            this.tailPos[1].push(this.radius*(-Math.sin(x)))
        }
    }

    wake(){
        this.currentVelocity = this.initalVelocity
    }

    draw(){
        // drawing trail
        if (this.id != 0 && showTrial){
            for (var i = 0; i < this.numTails; i++) {
                //let tailPos = Math.floor(Math.random()*5)
                ctx.strokeStyle = this.color[1] + 0.5 + ')'
                ctx.beginPath();
                ctx.lineWidth = 5;

                for (var j = 1; j < this.trail[0].length; j++) {
                    ctx.lineTo(
                        this.trail[0][j] + this.tailPos[0][i],
                        this.trail[1][j] + this.tailPos[1][i])
                }

                ctx.stroke();
            }
        }

        //drawing celestial body
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color[1] + 0.7 + ')'
        ctx.fill();

    }

    updateVelocity(bodies){
        for (var i = 0; i < bodies.length; i++) {
            if (bodies[i] != this) {
                var distance = Math.sqrt((bodies[i].pos[0] - this.pos[0])**2 + (bodies[i].pos[1] - this.pos[1])**2)

                var forceDir = [
                   findSign(bodies[i].pos[0], this.pos[0]), // x
                   -findSign(bodies[i].pos[1], height - this.pos[1]), // y
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
        //capping velocity
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

    bodies[0].mass = 1000000
    bodies[0].radius = 1
    bodies[0].pos = [cursor.x, cursor.y]
    bodies[0].color = 'rgba(0,0,0,0)'

    return bodies
}

function killPlanets(bodies){
    for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].life <= 0) {
            bodies.splice(i,1)
        }
    }
}

bodies = createSolarSystem(numBodies)

function restart(){
    timeStep = initTimeStep
    for (var i = 0; i < bodies.length; i++) {
        bodies.splice(i,1)
    }

    bodies = createSolarSystem(numBodies)

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].wake()
    }
}

function runChaoticGravity(){
    timeStep += timeIncrease
    bodies[0].pos = [cursor.x, cursor.y]
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
        if (bodies[i].inside && i != 1) {
            counter += 1
        }
    }

    if (counter == 1) {
        restart()
    }
}
