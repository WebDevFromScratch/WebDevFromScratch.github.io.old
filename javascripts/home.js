$(document).ready(function() {
  $('#fullpage').fullpage({
    navigation: true,
    anchors: ['home', 'about', 'blog', 'work'],
    scrollOverflow: true
  });

  setInterval(function(){ 
    // toggle the class every 1.8 second
    $('.blinking').fadeToggle();
  },1800);

  $('#section2').mouseover(function() {
    $("#toTop").fadeIn();
  });

  $('#section3').mouseover(function() {
    $("#toTop").fadeIn();
  });

  $('#section4').mouseover(function() {
    $("#toTop").fadeIn();
  });

  $('#section1').mouseover(function() {
    $("#toTop").fadeOut();
  });

  $(".thumbnail-photo").on("mouseenter", function() {
    $(this).find(".thumbnail-description").fadeIn();
  }).on("mouseleave", function(){
    $(this).find(".thumbnail-description").fadeOut();
  });
});