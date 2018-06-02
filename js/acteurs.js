var canvas = document.getElementById('canvas-acteurs');
canvas.style.height=window.innerHeight+"px";
canvas.style.width=window.innerHeight+"px";
var X = canvas.width / 2;
var Y = canvas.height / 2;
var R = X*(3/4);
var R_points=4;

var R_pcircle=(3/4)*R
var width_arcs=canvas.width/50;
var width_points=canvas.width/50;
var width_connections=5;

var ctx = canvas.getContext('2d');


//Il faut absolument que les acteurs d'une même catégorie se suivent
var cat_acteurs=[[[0,1,2],"Domaine Juridique","#0F1108"], [[3,4],"Politique","#025889"],
[[5,6],"Scientifiques","#813405"],[[7,8],"Associations","#9b9679"], [[9],"Famille","#48395b"]];

//tab_acteurs[[nom,categorie d'acteur]]

var tab_acteurs=[["JAF",0],["Médiation",0],["Avocats",0],["Philippe Latombe",1],["Opposition",1],["Pour la RA",2],["Contre la RA",2],["Associations féministes",3],["Associations de défense des pères",3],["Parents",4]];

var connexions=[];
document.getElementById('noeud3_acteurs').style.background="white";
document.getElementById('noeud3_acteurs').style.opacity=1;


function circle_arcs_2points(n,ctx,X,Y,R,i,j,width_connections){

  ctx.lineWidth = width_connections;

  var angle1 = i*(2*Math.PI/n);
  var angle2 = j*(2*Math.PI/n);
  var X1 = X + R_pcircle*Math.cos(angle1);
  var Y1 = Y + R_pcircle*Math.sin(angle1);
  var X2 = X + R_pcircle*Math.cos(angle2);
  var Y2 = Y + R_pcircle*Math.sin(angle2);
  var X3 = X + (R_pcircle/2)*Math.cos(angle1);
  var Y3 = Y + (R_pcircle/2)*Math.sin(angle1);
  var X4 = X + (R_pcircle/2)*Math.cos(angle2);
  var Y4 = Y + (R_pcircle/2)*Math.sin(angle2);
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
        var X1 = X + (4*R/3)*Math.cos(angle) + add_place_text(angle)[0];
        var Y1 = Y + (4*R/3)*Math.sin(angle) + add_place_text(angle)[1];
        var X1 = X + (5*R/4)*Math.cos(angle);
        var Y1 = Y + (5*R/4)*Math.sin(angle);

        ctx.beginPath();
        ctx.font = "30px Georgia";
        ctx.fillStyle = cat_acteurs[i][2];
        ctx.fillText(cat_acteurs[i][1],X1,Y1);
        ctx.stroke();


      } else {

        var taille = cat_acteurs[i][0].length -1;
        var angle1 = cat_acteurs[i][0][0]*(2*Math.PI/n);
        var angle2 = cat_acteurs[i][0][taille]*(2*Math.PI/n);
        var bissectrice1 = (angle2 - angle1)/2 + angle1;
        var X1 = X + (4*R/3)*Math.cos(bissectrice1)+ add_place_text(bissectrice1)[0];
        var Y1 = Y + (4*R/3)*Math.sin(bissectrice1)+ add_place_text(bissectrice1)[1];
        var X1 = X + (5*R/4)*Math.cos(bissectrice1);
        var Y1 = Y + (5*R/4)*Math.sin(bissectrice1);

        ctx.beginPath();
        ctx.font = "30px Georgia";
        ctx.fillStyle = cat_acteurs[i][2];
        ctx.fillText(cat_acteurs[i][1],X1,Y1);
        ctx.stroke();

    }
    }

    ctx.strokeStyle="black";
    for(i=0; i<connexions.length;i++){
      circle_arcs_2points(n,ctx,X,Y,R,connexions[i][0],connexions[i][1],width_connections);
      for(j=0; j<2;j++){

        var Angle = connexions[i][j]*(2*Math.PI/n);
        var XA = X + (6*R_pcircle/5)*Math.cos(Angle);//+ add_place_text(angle))[0];
        var YA = Y + (6*R_pcircle/5)*Math.sin(Angle);//+ add_place_text(angle))[1];

        ctx.beginPath();
        ctx.font = "20px Georgia";
        ctx.fillStyle = cat_acteurs[tab_acteurs[connexions[i][j]][1]][2];
        ctx.fillText(tab_acteurs[connexions[i][j]][0],XA,YA);
        ctx.stroke();
      }
    }


   // connections_points(ctx,X,Y,R*(3/4),10,10,100,100);

 }


 function coordX(n,i){
  return X+Math.cos(i*2*Math.PI/n)*R_pcircle;
}

function coordY(n,i){
  return Y+Math.sin(i*2*Math.PI/n)*R_pcircle;
}





function clear_acteurs(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



/*var tab = initialize_canvas();
circle_arcs(6,tab[0],tab[1],tab[2],tab[3]);
tab[0].strokeStyle="black";

circle_points(19,tab[0],tab[1],tab[2],tab[3]);

circle_arcs_points(5,tab[0],tab[1],tab[2],tab[3]);*/

trace_acteurs(cat_acteurs,tab_acteurs,connexions);



/*canvas.onmousemove=function(e){

    n=tab_acteurs.length;
    var mx=e.clientX - canvas.getBoundingClientRect().left + window.scrollX;;
    var my=e.clientY - canvas.getBoundingClientRect().top + window.scrollY;
    //console.log(is_on_actor(0,mx,my,n,R_points+width_points));
    //console.log(Math.abs(Math.pow(mx-coordX(n,0,X),2)+Math.pow(my-coordY(n,0,Y),2))-Math.pow(R_points+width_points,2))
    //console.log(is_inside_circle(mx,my,R,X,Y));
    //console.log("Position de la souris :  X=" + (mx-coordX(n,0)) + "   Y="+(my-coordY(n,0)));
}*/

function is_inside_circle(mx,my,rayon,x,y){
  return Math.abs(Math.pow(mx-x,2)+Math.pow(my-y,2))<=Math.pow(rayon,2);
}

function is_on_actor(i,mx,my,n,rayon){
  return is_inside_circle(mx,my,rayon,coordX(n,i),coordY(n,i));
}

var activate4=0;
var activate2=0;
var activate3=0;

document.getElementById('noeud1').onmouseenter=function(e){
  var connexions=[[6,2],[6,3],[6,7]];
  document.getElementById('noeud3_acteurs').style.background="grey";
  clear_acteurs();
  trace_acteurs(cat_acteurs,tab_acteurs,connexions);
};

document.getElementById('noeud1').onclick=function(e){
  if(activate4==0) {
  activate4=1;
  activate2=0;
  activate3=0;
  document.getElementById('noeud1').style.background="black";
  document.getElementById('noeud1').style.opacity=1;
  document.getElementById('noeud3_acteurs').style.background="grey";
  document.getElementById('noeud2').style.background="grey";
  document.getElementById('noeud3').style.background="grey";
} else {
  activate4=0;
  activate2=0;
  activate3=0;
  document.getElementById('noeud1').style.background="grey";
  document.getElementById('noeud1').style.opacity=1;
  clear_acteur();
}
};

document.getElementById('noeud1').onmouseleave=function(e){
  if(activate4==1){
    var connexions=[[6,2],[6,3],[6,7]];
    clear_acteurs();
    trace_acteurs(cat_acteurs,tab_acteurs,connexions);

  }else{
    var connexions=[];
    document.getElementById('noeud3_acteurs').style.background="white";
    clear_acteurs();
    trace_acteurs(cat_acteurs,tab_acteurs,connexions);
  }

};

document.getElementById('noeud2').onmouseenter=function(e){
  var connexions=[[0,2],[0,1],[0,7],[1,5]];

  clear_acteurs();
  trace_acteurs(cat_acteurs,tab_acteurs,connexions);
};

document.getElementById('noeud2').onclick=function(e){
  if (activate2 == 0) {
  activate2=1;
  activate4=0;
  activate3=0;
  document.getElementById('noeud2').style.background="black";
  document.getElementById('noeud2').style.opacity=1;
  document.getElementById('noeud1').style.background="grey";
  document.getElementById('noeud3').style.background="grey";
} else {
  activate2=0;
  activate4=0;
  activate3=0;
  document.getElementById('noeud2').style.background="grey";
  document.getElementById('noeud2').style.opacity=1;
}
};

document.getElementById('noeud2').onmouseleave=function(e){
  if(activate2==1){
    var connexions=[[0,2],[0,1],[0,7],[1,5]];
    clear_acteurs();
    trace_acteurs(cat_acteurs,tab_acteurs,connexions);

  }else{
    var connexions=[];
    clear_acteurs();
    trace_acteurs(cat_acteurs,tab_acteurs,connexions);
  }

};

document.getElementById('noeud3').onmouseenter=function(e){
  var connexions=[[3,0],[4,1],[3,7],[4,9]];

  clear_acteurs();
  trace_acteurs(cat_acteurs,tab_acteurs,connexions);
};

document.getElementById('noeud3').onclick=function(e){
  if(activate3==0){
  activate3 =1;
  activate2=0;
  activate4=0;
  document.getElementById('noeud3').style.background="black";
  document.getElementById('noeud3').style.opacity=1;
  document.getElementById('noeud1').style.background="grey";
  document.getElementById('noeud2').style.background="grey";
} else {
  activate3 =0;
  activate2=0;
  activate4=0;
  document.getElementById('noeud3').style.background="grey";
  document.getElementById('noeud3').style.opacity=1;


}
};

document.getElementById('noeud3').onmouseleave=function(e){
  if(activate3==1){
    var connexions=[[3,0],[4,1],[3,7],[4,9]];
    clear_acteurs();
    trace_acteurs(cat_acteurs,tab_acteurs,connexions);

  }else{
    var connexions=[];
    clear_acteurs();
    trace_acteurs(cat_acteurs,tab_acteurs,connexions);
  }

};
