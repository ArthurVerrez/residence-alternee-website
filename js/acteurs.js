var canvas = document.getElementById('canvas-acteurs');
if (canvas.getContext)
{
var ctx = canvas.getContext('2d'); 
var X = canvas.width / 2;
var Y = canvas.height / 2;
var R = 150;
ctx.beginPath();
ctx.arc(X, Y, R, 0, 0.9*Math.PI, false);
ctx.lineWidth = 15;
ctx.strokeStyle = '#000000';
ctx.stroke();
}