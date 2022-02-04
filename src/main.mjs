const width = window.innerWidth;
const height = window.innerHeight;

//import * as myModule from './test.js';

const bckCanvas = document.querySelector("#background");
bckCanvas.width = window.innerWidth;
bckCanvas.height = window.innerHeight;
const bckCtx = bckCanvas.getContext('2d');

bckCtx.fillStyle = 'rgb(0, 0, 0)';
bckCtx.fillRect(0,0,width,height);

// MAIN
const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.filter = 'blur(0px)'

// TEXT
const textCanvas = document.querySelector("#text");
textCanvas.width = window.innerWidth;
textCanvas.height = window.innerHeight;
const textCtx = textCanvas.getContext('2d');

import { hello } from './test3.mjs';
let val = hello();  // val is "Hello";

ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.font = '20px arial';
ctx.textAlign = "center";
ctx.strokeText(hello(), 200, 100);
