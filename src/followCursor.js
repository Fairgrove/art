const width = window.innerWidth;
const height = window.innerHeight;

// MAIN
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.filter = 'blur(0px)'

ctx.fillStyle = 'rgba(33, 33, 36, 1)';
ctx.fillRect(0,0,width,height);

function clearAll(){
    ctx.fillStyle = 'rgba(33, 33, 36, 1)';
    ctx.fillRect(0,0,width,height);
}

const cursor = {
    x: width / 2,
    y: height / 2,
}

ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.font = '20px arial';
ctx.strokeText(cursor.x + ',' + cursor.y, cursor.x, cursor.y);

export function run(){
    window.addEventListener("mousemove", (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        clearAll()
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.font = '20px arial';
        ctx.strokeText(cursor.x + ',' + cursor.y, cursor.x, cursor.y);
    })
}
