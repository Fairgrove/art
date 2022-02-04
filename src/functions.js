export function randomColor() {
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

export function findSign(x1, x2){
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
