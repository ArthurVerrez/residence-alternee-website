/*var canvas = document.getElementById('canvas-acteurs');
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
}*/

function initialize_canvas(){
    var canvas = document.getElementById('canvas-acteurs');
    if (canvas.getContext){
        var ctx = canvas.getContext('2d'); 
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
        var R = 150;
        return [ctx,X,Y,R]
    }
}

function circle_arcs(n, ctx, X, Y, R){
    colors=['blue','red','green','yellow',"pink","magenta"];
    ctx.lineWidth = 15;
    for(i=0; i<n; i++){
        ctx.beginPath();
        ctx.arc(X, Y, R, i*(2*Math.PI/n), (i+1)*(2*Math.PI/n), false);
        
        ctx.strokeStyle = colors[i];
        ctx.stroke();
    }

}

var tab = initialize_canvas();

circle_arcs(6,tab[0],tab[1],tab[2],tab[3]);

