const canvas = document.querySelector('#canvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');


ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

var ball = {
    x: 0,
    y: 0,
    radius: 25,
    color: 'blue',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};

function clear() {
  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(0,0,width,height);
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

function setText(text, x, y){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.font = '20px arial';
    ctx.strokeText(text, x, y);
}

canvas.addEventListener('mousemove', function(e) {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
});

ball.draw()
