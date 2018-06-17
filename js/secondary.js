 $(".button-fill").hover(function () {
    $(this).children(".button-inside").addClass('full');
}, function() {
  $(this).children(".button-inside").removeClass('full');
});







//Pour récupérer les informations dans l'URL
function $_GET(param) {
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;  
  }
  return vars;
}





















var afficher_scroll3 = false;
var is_parcours_guide=$_GET("p")
if(is_parcours_guide=="parcours-guide"){
  $("#toggler-1").prop( "checked", true );

  afficher_scroll3=true;
  $("#next_button_container").css("visibility","visible");
  

//On fait en sorte que tous les liens laissent dans le parcours guidé
  
  var all_links=$("a");

  for(i=0;i<all_links.length;i++){
    if(jQuery.inArray(all_links.eq(i).attr("href"), ["bien-etre-de-lenfant.html","nouvelle-legislation.html","opposition-entre-parents.html",
      "procedure-judiciaire.html"])>=0){
        all_links.eq(i).attr("href", all_links.eq(i).attr("href")+"?p=parcours-guide");
    }
  }

  //?p=parcours-guide de longueur 17
  $("#bouton_parcours_menu a").eq(0).attr("href", $("#bouton_parcours_menu a").eq(0).attr("href").slice(0,-17));



}


var fixed = $(".scroll_appear").eq(0);
var fixed2 = $(".scroll_appear2").eq(0);

var fixed3 = $(".scroll_appear3").eq(0);
$(window).scroll(function() {
    var top = $(window).scrollTop();
    var opacity = top/($(window).height()/3);
    if(top<5){

    	fixed.css("visibility","hidden");

      if(afficher_scroll3){
    	 fixed3.css("visibility","hidden");
      }

        fixed2.css("visibility","hidden");
    }else{
    	fixed.css("visibility","visible");



      if(afficher_scroll3){
    	 fixed3.css("visibility","visible");
      }

        fixed2.css("visibility","visible");
    }
    fixed.css("opacity",opacity);

    if(afficher_scroll3){
      fixed3.css("opacity",opacity);
    }

    fixed2.css("opacity",opacity);


});



$(".navigate_freely").click(function() {
    $('html,body').animate({
        scrollTop: $("#contro-practice").offset().top},
        'slow');
});




$(".navigate_freely_button").click(function() {
    $('html,body').animate({
        scrollTop: $("#contro-practice").offset().top},
        'slow');
});

$("#parcours_next").click(function(e){

        $("#transition").show(100);

  });

$(".close_window").click(function(e){

        $("#transition").hide(100);

  });







$("#toggler-1").change(function() {
  if(!$("#toggler-1").prop("checked")){ //si on a unchecked la checkbox


    $(".side-bar-left").hide(500);
    $("#next_button_container").hide(500);


    var is_parcours_guide=$_GET("p");
    if(is_parcours_guide=="parcours-guide"){
      window.history.pushState("", "", window.location.href.slice(0,-17));

      var all_links=$("a");
      

      for(i=0;i<all_links.length;i++){
        if(jQuery.inArray(all_links.eq(i).attr("href"), ["bien-etre-de-lenfant.html?p=parcours-guide","nouvelle-legislation.html?p=parcours-guide",
          "opposition-entre-parents.html?p=parcours-guide",
          "procedure-judiciaire.html?p=parcours-guide"])>=0){
              all_links.eq(i).attr("href", all_links.eq(i).attr("href").slice(0,-17));
            }
        }

      $("#bouton_parcours_menu a").eq(1).attr("href", $("#bouton_parcours_menu a").eq(0).attr("href")+"?p=parcours-guide");


        


    }


    
    
  }

  else{

    $(".scroll_appear2").eq(0).css("visibility","visible");
    $(".scroll_appear1").eq(0).css("visibility","visible");
    $(".scroll_appear3").eq(0).css("visibility","visible");
    $(".scroll_appear3").eq(0).css("opacity",1);
    $(".scroll_appear2").eq(0).css("opacity",1);
    $(".scroll_appear1").eq(0).css("opacity",1);
    $(".side-bar-left").css("visibility","visible");
    $("#next_button_container").css("visibility","visible");

    $(".side-bar-left").show(500);
    $("#next_button_container").show(500);
    var is_parcours_guide=$_GET("p");
    if(is_parcours_guide!="parcours-guide"){
      window.history.pushState("", "", window.location.href+"?p=parcours-guide");

      var all_links=$("a");

      for(i=0;i<all_links.length;i++){
        if(jQuery.inArray(all_links.eq(i).attr("href"), ["bien-etre-de-lenfant.html","nouvelle-legislation.html","opposition-entre-parents.html",
          "procedure-judiciaire.html"])>=0){
            all_links.eq(i).attr("href", all_links.eq(i).attr("href")+"?p=parcours-guide");
        }
      }


      //?p=parcours-guide de longueur 17
      $("#bouton_parcours_menu a").eq(0).attr("href", $("#bouton_parcours_menu a").eq(0).attr("href").slice(0,-17));
    }

    

  }

});



$(".navigate_parcours").click(function() {
    $('html,body').animate({
        scrollTop: $("#contro-practice").offset().top},
        'slow');
    $("#toggler-1").prop("checked",true);
    $("#toggler-1").trigger("change");
});
