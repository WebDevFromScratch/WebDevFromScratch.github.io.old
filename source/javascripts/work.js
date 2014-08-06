$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['about-section'],
    scrollOverflow: true
  });

  //show project details on hover
  $(".thumbnail-photo").on("mouseenter", function() {
    $(this).find(".thumbnail-description").fadeIn();
  }).on("mouseleave", function(){
    $(this).find(".thumbnail-description").fadeOut();
  });

  //project expanded view background
  $("button").on("click", function() {
    $("#project-expanded").fadeIn();
  });

  //close project expanded view
  $("#project-expanded").on("click", function() {
    $(this).fadeOut();
  });
});