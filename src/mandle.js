const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

calcMandle = function(x, y){
    let n = 0;

    let s = 10 //scale
    Re = x * (s/width)-(s/2)
    Im = (y * (s/height)-(s/2)) * -1

    for (let i = 0; i < 100; i++) {
        Re = Re + (((Re * Re)-(Im * Im)))
        Im = Im + (((Im*Re)+(Re*Im)))

        n += 1
        if (Math.abs(Re) > 10000 || Math.abs(Im) > 10000) {
            break;
        }
    }
    return n
}

mandle = function(){
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,width,height);

    for (let yy = 0; yy < height; yy+=1) {
        for (let xx = 0; xx < width; xx+=1) {

            n = calcMandle(xx, yy)

            if (n > 0) {
                color = Math.ceil(  (255 / (100)) * (n) )
                str = 'rgb(0,0,'+color.toString()+')'

                ctx.fillStyle = str;
                ctx.beginPath();
                ctx.arc(5+xx, 5+yy, 1, degToRad(0), degToRad(360), false);
                ctx.fill()
            }
        }
    }
}

document.onload = mandle();
