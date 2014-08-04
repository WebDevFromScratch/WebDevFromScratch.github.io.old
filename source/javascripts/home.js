$(document).ready(function() {
  $('#fullpage').fullpage({
    navigation: true,
    anchors: ['home', 'about', 'blog', 'work']
  });

  setInterval(function(){ 
    // toggle the class every 1.8 second
    $('.blinking').fadeToggle();
  },1800);

  $('#section2').mouseover(function() {
    $("#toTop").fadeIn("slow");
  });

  $('#section3').mouseover(function() {
    $("#toTop").fadeIn("slow");
  });

  $('#section4').mouseover(function() {
    $("#toTop").fadeIn("slow");
  });

  $('#section1').mouseover(function() {
    $("#toTop").fadeOut("slow");
  });
});