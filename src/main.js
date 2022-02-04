const width = window.innerWidth;
const height = window.innerHeight;
const menu = 1

// MAIN
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.filter = 'blur(0px)'

function textLayer(){
    const box = {
        topLeft: (width/2)-270, //-half width
        bottomLeft: (height/2)-65, //-half height
        topRight: 540, //width
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
    ctx.fillText(' My name is Frederik Fagerlund,', width/2, height/2 +10);
    ctx.fillText('I make computers go beep boop, professionally', width/2, height/2+35 );

}

function menuLayer(){

    const box = {
        topLeft: (width/2)-50,
        bottomLeft: 30,
        topRight: 100,
        bottomRight: 70,
        spacing: 10
    }

    for(var i = -1; i < 1; i++){
        ctx.beginPath();
        ctx.rect(
            box.topLeft,
            box.bottomLeft,
            box.topRight,
            box.bottomRight);
        ctx.fillStyle = 'rgba(255,255,100,1)'
        ctx.fill();
    }
}

function background(){
    ctx.fillStyle = 'rgba(33, 33, 36, 1)';
    ctx.fillRect(0,0,width,height);
}

const cursor = {
    x: width / 2,
    y: height / 2,
    mappedX: 0.5,
    mappedY: 0.5,
}

background()
menuLayer()
textLayer()

window.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    cursor.mappedX = ((cursor.x - width)/width)+1
    cursor.mappedY = ((cursor.y - height)/height)+1

    background()
    menuLayer()
    textLayer()
})
