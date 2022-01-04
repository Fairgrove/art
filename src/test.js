const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');



function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

init = function(){
    background()
}

updateText = function(text, x, y){
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.font = '20px arial';
    ctx.strokeText(text, x, y);
}

background = function(){
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.beginPath();
    ctx.arc(width/2, height/2, 2, degToRad(0), degToRad(360), false);
    ctx.fill()



    // ctx.fillStyle = 'rgb(255,255,255)';
    // ctx.beginPath();
    // ctx.arc(width/2, height/2, (width/2)/(10/2), degToRad(0), degToRad(360), false);
    // ctx.stroke()
}

calcMandle = function(){
    const size = 100
    const max = 10000

    let ns = []

    for (let yy = 0; yy < height; yy++) {
        for (let xx = 0; xx < width; xx++) {
            let s = 10 //scale
            ss = (s/width)-(s/2)
            Re = xx * (s/width)-(s/2)
            Im = (yy * (s/height)-(s/2)) * -1
            // Re = x - (width/2)
            // Im = y - (height/2)
            //updateText(Re.toString()+ '  ' +Im.toString(),300,300)
            let n = 0;
            for (let i = 0; i < size; i++) {
                Re = Re + (((Re * Re)-(Im * Im)))
                Im = Im + (((Im*Re)+(Re*Im)))

                //updateText(Re.toString()+ '  ' +Im.toString(),300,300+((i+1)*30))
                if (Math.abs(Re) > max || Math.abs(Im) > max) {

                    break;
                }
                n = n+1
            }
            ns.push(n)
        }
    }
    return ns
}

drawMandle = function(){
    const max = 100
    let ns = calcMandle();

    for (let yy = 0; yy < height; yy = yy + 10) {
        for (let xx = 0; xx < width; xx = xx + 10) {

            blue = Math.ceil((255/100)*ns[yy+xx])
            str = 'rgb(255,255,'+blue.toString()+')'

            ctx.fillStyle = str //'rgb(0,0,255)';
            ctx.beginPath();
            ctx.arc(xx, yy, 1, degToRad(0), degToRad(360), false);
            ctx.fill();
        }
    }

}

cursor = function(event) {
    //ctx.clearRect(0,0,width,height)

    x = event.clientX
    y = event.clientY

    background();

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    ctx.moveTo(x, y);

    let s = 10 //scale
    ss = (s/width)-(s/2)
    Re = x * (s/width)-(s/2)
    Im = (y * (s/height)-(s/2)) * -1

    for (let i = 0; i < 100; i++) {
        Re = Re + (((Re * Re)-(Im * Im)))
        Im = Im + (((Im*Re)+(Re*Im)))

        if (Math.abs(Re) > 10000 || Math.abs(Im) > 10000) {
            break;
        }

        ctx.lineTo(Re* (width/2)+(width/2), (-1*Im)* (height/2)+(height/2));
    }
    ctx.stroke();
}


document.onload = init();
document.onmousemove = cursor;
