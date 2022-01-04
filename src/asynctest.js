const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

function setText(text, x, y){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.font = '20px arial';
    ctx.strokeText(text, x, y);
}

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

ctx.fillStyle = 'rgb(255,255,255)';
ctx.beginPath();
ctx.arc(200, 200, 20, degToRad(0), degToRad(360), false);
ctx.fill()

async function myFunction() {
    n = 0
    for (let i = 0; i < 100000; i++){
        for (let j = 0; j < 10000; j++){
            n+=1
        }
    }
    return n
}

myFunction().then(
    function(value) { /* code if successful */

    },
    function(error) { /* code if some error */

    }
);
