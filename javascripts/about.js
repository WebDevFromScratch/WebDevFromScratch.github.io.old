$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['about-section'],
    scrollOverflow: true
  });

  // showing/hiding description elements with buttons
  // helpers

  var changeClassAndSlideUp = function(id) {
    $(".button-about-sm").removeClass("active");
    $(id).addClass("active");
    $(".description-about").slideUp();
  };

  var delayAndSlideDown = function(id) {
    $(id).delay(400).slideDown();
  };

  var changeClassAndSlideUpCourses = function(id) {
    $(".button-about-lg").removeClass("active");
    $(id).addClass("active");
    $(".description-courses").slideUp();
  };

  //execution

  $("#button-about-me").delay(400).addClass("active");
  delayAndSlideDown("#about-me");

  $("#button-about-me").on("click", function() {
    changeClassAndSlideUp("#button-about-me");
    delayAndSlideDown("#about-me");
  });

  $("#button-about-skills").on("click", function() {
    changeClassAndSlideUp("#button-about-skills");
    delayAndSlideDown("#about-skills");
  });

  $("#button-about-courses").on("click", function() {
    changeClassAndSlideUp("#button-about-courses");
    delayAndSlideDown("#about-courses");
    $(".description-courses").slideUp();
    $("#description-tealeaf").delay(1000).slideDown();
  });

  $("#button-about-previously").on("click", function() {
    changeClassAndSlideUp("#button-about-previously");
    delayAndSlideDown("#about-previously");
  });

  $("#button-about-education").on("click", function() {
    changeClassAndSlideUp("#button-about-education");
    delayAndSlideDown("#about-education");
  });

  $("#button-about-contact").on("click", function() {
    changeClassAndSlideUp("#button-about-contact");
    delayAndSlideDown("#about-contact");
  });

  //courses
  $("#button-courses-tealeaf").delay(400).addClass("active");

  $("#button-courses-tealeaf").on("click", function() {
    changeClassAndSlideUpCourses("#button-courses-tealeaf");
    delayAndSlideDown("#description-tealeaf");
  });

  $("#button-courses-odin").on("click", function() {
    changeClassAndSlideUpCourses("#button-courses-odin");
    delayAndSlideDown("#description-odin");
  });

  $("#button-courses-coursera").on("click", function() {
    changeClassAndSlideUpCourses("#button-courses-coursera");
    delayAndSlideDown("#description-coursera");
  });

  $("#button-courses-codecademy").on("click", function() {
    changeClassAndSlideUpCourses("#button-courses-codecademy");
    delayAndSlideDown("#description-codecademy");
  });
});