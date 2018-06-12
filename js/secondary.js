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

  $(".inside-text").eq(0).text("Sortir");

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


