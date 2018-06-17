var canvas = document.getElementById('canvas-acteurs-small');

/*
canvas.style.height=window.innerHeight+"px";
canvas.style.width=window.innerHeight+"px";*/







var X = canvas.width / 2;
var Y = canvas.height / 2;
var R = X*(3/4);
var R_points=4;

var R_pcircle=(3/4)*R
var width_arcs=canvas.width/25;
var width_points=canvas.width/25;
var width_connections=8;

var ctx = canvas.getContext('2d');


var noeud_to_highlight = canvas.dataset.noeud;


//Il faut absolument que les acteurs d'une même catégorie se suivent
var cat_acteurs=[ [[0],"Politique","#025889"],[[1,2,3,4],"Scientifiques","#813405"],[[5,6,7,8,9],"Médiation","#48395b"],[[10,11],"Domaine Juridique","#0F1108"],
[[12,13,14,15],"Associations","#9b9679"] ];

//tab_acteurs[[nom,categorie d'acteur]]

var tab_acteurs=[["Philippe Latombe",0],["Bernard Golse",1],["Maurice Berger",1],["Collectif scientifique",1],["CIRA",1],["APMF",2],
["FENAMEF",2],["UNAF",2],["CNAF",2],["CESE",2],["JAF",3],["Valérie Bloch",3],["SOS Papa",4],["Collectif de la Grue Jaune",4],["Osez le Féminisme !",4],["Les Effronté-e-s",4]];



var total_connexions=[[0,1,2,5,6,7,8,9,10],[0,4,12,13,14,15],[0,11,12,13,14,15],[1,2,3,4],[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]];
var connexions=[];



var connexions=[];

function ecrit_acteur(id){
  var object = document.getElementById(id);
  var test = document.getElementById('noeud1')
  object.textContent = "test";

  test.insertAdjacentElement("afterend",object);
  //texte.innerHTML.fontcolor("red");

}

function erase_acteur(id){
  var object = document.getElementById(id);
  object.textContent = ""
}

function place_X(i){
  if (i === 0) {
    return -157;
  } else if (i === 1) {
    return -60;
  } else if (i === 2) {
    return 0;
  } else if (i === 3) {
    return -270;
  } else if (i === 4) {
    return -15;
  }
}

function place_Y(i){
  if (i === 0) {
    return 0;
  } else if (i === 1) {
    return -110;
  } else if (i === 2) {
    return 50;
  } else if (i === 3) {
    return 130;
  } else if (i === 4) {
    return 150;
  }
}

function place_x(i){
  if (i === 0) {
    return -150;
  } else if (i === 1) {
    return -110;
  } else if (i === 2) {
    return -100;
  } else if (i === 3) {
    return -80;
  } else if (i === 4) {
    return -15;
  } else if (i === 5) {
    return -10;
  } else if (i === 6) {
    return 0;
  } else if (i === 7) {
    return 0;
  } else if (i === 8) {
    return -20;
  } else if (i === 9) {
    return 0;
  } else if (i === 10) {
    return 0;
  } else if (i === 11) {
    return -10;
  } else if (i === 12) {
    return -20;
  } else if (i === 13) {
    return -100;
  } else if (i === 14) {
    return -140;
  } else if (i === 15) {
    return -120;
}
}

function place_y(i){
  if (i === 0) {
    return -50;
  } else if (i === 1) {
    return -80;
  } else if (i === 2) {
    return 0;
  } else if (i === 3) {
    return -20;
  } else if (i === 4) {
    return -20;
  } else if (i === 5) {
    return -10;
  } else if (i === 6) {
    return 0;
  } else if (i === 7) {
    return 20;
  } else if (i === 8) {
    return -20;
  } else if (i === 9) {
    return 0;
  } else if (i === 10) {
    return 10;
  } else if (i === 11) {
    return 10;
  } else if (i === 12) {
    return 40;
  } else if (i === 13) {
    return 40;
  } else if (i === 14) {
    return 10;
  } else if (i === 15) {
    return  -10;
}
}

function circle_arcs_center(n,ctx,X,Y,R,i,width_connections){

  ctx.lineWidth = width_connections;

  var angle1 = i*(2*Math.PI/n);

  var X1 = X + R_pcircle*Math.cos(angle1);
  var Y1 = Y + R_pcircle*Math.sin(angle1);
  var X2 = X;
  var Y2 = Y;


  var X3 = X + (R_pcircle/2)*Math.cos(angle1);
  var Y3 = Y + (R_pcircle/2)*Math.sin(angle1);
  var X4 = X;
  var Y4 = Y;


  ctx.beginPath();
  ctx.moveTo(X1,Y1);
  ctx.bezierCurveTo(X3,Y3,X4,Y4,X2,Y2);

  ctx.stroke();
}



function add_place_text(alpha){
  if (alpha > 0 && alpha < Math.PI/2) {
    return [-30,-30];
  } else if (alpha >= Math.PI/2 && alpha < Math.PI) {
    return [30,-30];
  } else if (alpha >= Math.PI && alpha < (3/2)*Math.PI) {
    return [30,30];
  } else {
    return [-30,30];
  }
}


function trace_acteurs(cat_acteurs,tab_acteurs,connexions){



  n=tab_acteurs.length;

    //On affiche d'abord les arcs de cercle et les points

    for(i=0; i<cat_acteurs.length; i++){

//les noms des catégories

      for(j=cat_acteurs[i][0][0]; j<cat_acteurs[i][0][cat_acteurs[i][0].length-1]+1;j++){
        ctx.beginPath();
        ctx.arc(X, Y, R, j*(2*Math.PI/n)-Math.PI/n, (j+1)*(2*Math.PI/n)-Math.PI/n, false);

        ctx.strokeStyle = cat_acteurs[i][2];
        ctx.lineWidth = width_arcs;
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(coordX(n,j), coordY(n,j), R_points, 0, 2*Math.PI, false);
        ctx.fillStyle = cat_acteurs[i][2];

        ctx.fill();
        
        ctx.lineWidth = width_points;

        ctx.stroke();


      }
      //Nom des catégories

      if (cat_acteurs[i][0].length == 1) {

        var angle = cat_acteurs[i][0][0]*(2*Math.PI/n);
        var X1 = X + (4*R/3)*Math.cos(angle) + place_X(i);
        var Y1 = Y + (4*R/3)*Math.sin(angle) + place_Y(i);

        /*
        ctx.beginPath();
        ctx.font = "40px Georgia";
        ctx.fillStyle = cat_acteurs[i][2];
        ctx.fillText(cat_acteurs[i][1],X1,Y1);
        ctx.stroke();
        */


      } else {

        var taille = cat_acteurs[i][0].length -1;
        var angle1 = cat_acteurs[i][0][0]*(2*Math.PI/n);
        var angle2 = cat_acteurs[i][0][taille]*(2*Math.PI/n);
        var bissectrice1 = (angle2 - angle1)/2 + angle1;
        var X1 = X + (4*R/3)*Math.cos(bissectrice1)+ place_X(i);
        var Y1 = Y + (4*R/3)*Math.sin(bissectrice1)+ place_Y(i);

        /*
        ctx.beginPath();
        ctx.font = "40px Georgia";
        ctx.fillStyle = cat_acteurs[i][2];
        ctx.fillText(cat_acteurs[i][1],X1,Y1);
        ctx.stroke();
        */

    }
    }


    ctx.strokeStyle="black";
    for(i=0; i<connexions.length;i++){
      /*

        var Angle = connexions[i]*(2*Math.PI/n);
        var XA = X + (6*R_pcircle/5)*Math.cos(Angle);//+ add_place_text(angle))[0];
        var YA = Y + (6*R_pcircle/5)*Math.sin(Angle);//+ add_place_text(angle))[1];

        ctx.beginPath();
        ctx.font = "20px Georgia";
        ctx.fillStyle = cat_acteurs[tab_acteurs[connexions[i][j]][1]][2];
        ctx.fillText(tab_acteurs[connexions[i][j]][0],XA,YA);
        ctx.stroke();
*/
      circle_arcs_center(n,ctx,X,Y,R,connexions[i],width_connections);


        var Angle = connexions[i]*(2*Math.PI/n);
        var XA = X + (6*R_pcircle/5)*Math.cos(Angle) + place_x(connexions[i]);//+ add_place_text(angle))[0];
        var YA = Y + (6*R_pcircle/5)*Math.sin(Angle) + place_y(connexions[i]);//+ add_place_text(angle))[1];

        /*
        ctx.beginPath();
        ctx.font = "20px Georgia";
        ctx.fillStyle = cat_acteurs[tab_acteurs[connexions[i]][1]][2];
        ctx.fillText(tab_acteurs[connexions[i]][0],XA,YA);
        ctx.stroke();
        */
    }


   // connections_points(ctx,X,Y,R*(3/4),10,10,100,100);

 
    ctx.strokeStyle="black";
    for(i=0; i<connexions.length;i++){
      circle_arcs_center(n,ctx,X,Y,R,connexions[i],width_connections);
      

        var Angle = connexions[i][j]*(2*Math.PI/n);
        var XA = X + (6*R_pcircle/5)*Math.cos(Angle);//+ add_place_text(angle))[0];
        var YA = Y + (6*R_pcircle/5)*Math.sin(Angle);//+ add_place_text(angle))[1];

      }
    }


   // connections_points(ctx,X,Y,R*(3/4),10,10,100,100);



 function coordX(n,i){
  return X+Math.cos(i*2*Math.PI/n)*R_pcircle;
}

function coordY(n,i){
  return Y+Math.sin(i*2*Math.PI/n)*R_pcircle;
}





function clear_acteurs(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



connexions=total_connexions[noeud_to_highlight];
clear_acteurs();
trace_acteurs(cat_acteurs,tab_acteurs,connexions);

