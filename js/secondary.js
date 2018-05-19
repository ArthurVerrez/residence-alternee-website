 $(".button-fill").hover(function () {
    $(this).children(".button-inside").addClass('full');
}, function() {
  $(this).children(".button-inside").removeClass('full');
});


var fixed = $(".scroll_appear").eq(0);
var fixed2 = $(".scroll_appear2").eq(0);
$(window).scroll(function() {
    var top = $(window).scrollTop();
    var opacity = top/($(document).height()/2);
    if(top<5){
    	fixed.css("visibility","hidden");
    	fixed2.css("visibility","hidden");
    }else{
    	fixed.css("visibility","visible");
    	fixed2.css("visibility","visible");
    }
    fixed.css("opacity",opacity);
    fixed2.css("opacity",opacity);
});



$(".navigate_freely").click(function() {
    $('html,body').animate({
        scrollTop: $("#colorlib-practice").offset().top},
        'slow');
});


$(".navigate_freely_button").click(function() {
    $('html,body').animate({
        scrollTop: $("#colorlib-practice").offset().top},
        'slow');
});