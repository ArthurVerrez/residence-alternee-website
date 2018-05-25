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
    ctx.lineWidth = 4;
    return [ctx,X,Y,R]
  }
}

function circle_arcs(n, ctx, X, Y, R){
  colors=['black','red','green','yellow',"pink","magenta"];

  for(i=0; i<n; i++){
    ctx.beginPath();
    ctx.arc(X, Y, R, i*(2*Math.PI/n), (i+1)*(2*Math.PI/n), false);
    ctx.strokeStyle = colors[i];
    ctx.stroke();
  }

}

function circle_points(n, ctx, X, Y, R){
  colors=['blue','red','green','yellow',"pink","magenta"];
  R_points=3;
    //ctx.fill();
    R=R*(3/4);
    for(i=0; i<n; i++){
      ctx.beginPath();
      ctx.arc(X+Math.cos(i*2*Math.PI/n)*R, Y+Math.sin(i*2*Math.PI/n)*R, R_points, 0, 2*Math.PI, false);

      ctx.stroke();
    }

  }


  function circle_arcs_points(n,ctx,X,Y,R){
   R=R*(3/4);
   for(i=0; i<n; i++) {
     ctx.beginPath();
     var angle1 = i*(2*Math.PI/n);
     var angle2 = (i+1)*(2*Math.PI/n);
     var angle3 = (i+2)*(2*Math.PI/n);
     var bissectrice1 = (angle2 - angle1)/2 + angle1;
     var bissectrice2 = (angle3 - angle2)/2 + angle2;
     var X1 = X + R*Math.cos(bissectrice1);
     var Y1 = Y + R*Math.sin(bissectrice1);
     var X2 = X + R*Math.cos(bissectrice2);
     var Y2 = Y + R*Math.sin(bissectrice2);
     var X3 = X + (R/2)*Math.cos(bissectrice1);
     var Y3 = Y + (R/2)*Math.sin(bissectrice1);
     var X4 = X + (R/2)*Math.cos(bissectrice2);
     var Y4 = Y + (R/2)*Math.sin(bissectrice2);
     ctx.beginPath();
     ctx.moveTo(X1,Y1);
     ctx.bezierCurveTo(X3,Y3,X4,Y4,X2,Y2);
     ctx.stroke();

   }
 }

//Il faut absolument que les acteurs d'une même catégorie se suivent
var cat_acteurs=[[[0,1,2],"cat1","blue"], [[3,4],"cat2","red"],
[[5],"cat3","magenta"], [[6],"cat4","yellow"], [[7,8],"cat5","green"], [[9],"cat6","grey"]];

//tab_acteurs[[nom,categorie d'acteur]]

var tab_acteurs=["acteur 1","acteur 2","acteur 3","acteur 4","acteur 5","acteur 6","acteur 7","acteur 8","acteur 9","acteur 10"];

var connexions=[[1,2],[6,2],[6,3]];


function connection_points(ctx,X,Y,R,x1,y1,x2,y2){
 angle1 = Math.acos(x1/R);
 angle2 = Math.acos(x2/R);
 ctx.beginPath();
 ctx.moveTo(x1,y1);
 ctx.strokeStyle="black";
 ctx.bezierCurveTo(X + (R/2)*Math.cos(angle1),Y + (R/2)*Math.cos(angle1),X + (R/2)*Math.cos(angle2),Y + (R/2)*Math.cos(angle2),x2,y2);
 ctx.stroke();
}



function trace_acteurs(cat_acteurs,tab_acteurs,connexions){
  var canvas = document.getElementById('canvas-acteurs');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d'); 
    var X = canvas.width / 2;
    var Y = canvas.height / 2;
    var R = 150;
    ctx.lineWidth = 4;
  }


  n=tab_acteurs.length

    //On affiche d'abord les arcs de cercle et les points
    R_points=4;
    for(i=0; i<cat_acteurs.length; i++){
      for(j=cat_acteurs[i][0][0]; j<cat_acteurs[i][0][cat_acteurs[i][0].length-1]+1;j++){
        ctx.beginPath();
        ctx.arc(X, Y, R, j*(2*Math.PI/n)-Math.PI/n, (j+1)*(2*Math.PI/n)-Math.PI/n, false);

        ctx.strokeStyle = cat_acteurs[i][2];
        ctx.stroke();
        ctx.beginPath();

        ctx.arc(X+Math.cos(j*2*Math.PI/n)*R*(3/4), Y+Math.sin(j*2*Math.PI/n)*R*(3/4), R_points, 0, 2*Math.PI, false);
        ctx.fillStyle = cat_acteurs[i][2];
        ctx.fill();
        ctx.stroke();
      }
    }

    //Puis on affiche les connexions

    //Puis on affiche les noms

    text_cercle(ctx,X,Y,R,cat_acteurs);
/*
    for(c in connexions){
      connection_points(ctx,X,Y,R*(3/4),coordX(n,R*(3/4),c[0],X),coordY(n,R*(3/4),c[0],Y),
        coordX(n,R*(3/4),c[1],X),coordY(n,R*(3/4),c[1],Y));
    }
    */

   // connections_points(ctx,X,Y,R*(3/4),10,10,100,100);

 }


 function coordX(n,R,i,X){
  return X+Math.cos(i*2*Math.PI/n)*R;
}

function coordY(n,R,i,X){
  return Y+Math.sin(i*2*Math.PI/n)*R;
}



function text_cercle(ctx,X,Y,R,tab){
  for (i=0; i<tab.length;i++){
    ctx.beginPath();
    var angle1 = i*(2*Math.PI/n);
    var angle2 = (i+1)*(2*Math.PI/n);
    var bissectrice1 = (angle2 - angle1)/2 + angle1;
    var X1 = X + R*Math.cos(bissectrice1);
    var Y1 = Y + R*Math.sin(bissectrice1);
    ctx.font = "30px Arial";
    ctx.fillText(tab[i][1],X1,Y1);
    
  }
}


/*var tab = initialize_canvas();
circle_arcs(6,tab[0],tab[1],tab[2],tab[3]);
tab[0].strokeStyle="black";

circle_points(19,tab[0],tab[1],tab[2],tab[3]);

circle_arcs_points(5,tab[0],tab[1],tab[2],tab[3]);*/

trace_acteurs(cat_acteurs,tab_acteurs,connexions);