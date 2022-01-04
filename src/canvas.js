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
