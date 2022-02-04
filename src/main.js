const width = window.innerWidth;
const height = window.innerHeight;

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

function homePage(){
    const box = {
        topLeft: (width/2)-300, //-half width
        bottomLeft: (height/2)-65, //-half height
        topRight: 600, //width
        bottomRight: 140, //height
        shadowOffset: 15,
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
        bottomLeft: (height/2)-(24*about.length)/2, //-half height
        topRight: 600, //width
        bottomRight: 23*about.length, //height
        shadowOffset: 15,
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
        ctx.fillText(about[i], width/2, height/2 + (22*(i-(about.length/2))))
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

//creating buttons
for (var i = 1; i < 4; i++) {
    menuButtons.push(new button(i, buttonSymbols[i-1]))
}

background()
menuLayer()
homePage()

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
    menuLayer()
    pagePicker()

    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)
