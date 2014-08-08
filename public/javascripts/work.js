//slider functionality (wrapped in my own jQuery function)
(function($) {
  $.fn.mySlider = function() {
    return this.each(function() {
      var slides;
      var amount;
      var i;
      var next;
      var previous;
      var stoptimeout;

      function run() {
        //hiding previous img and showing next
        $(slides[i]).fadeOut(600);
        i++;
        if (i >= amount) i = 0;
        $(slides[i]).fadeIn(600);

        //loop
        myTimeout = setTimeout(run, 5000);
      };

      function nextSlide() {
        $(slides[i]).fadeOut(600);
        i++;
        if (i >= amount) i = 0;
        $(slides[i]).fadeIn(600);
        //need to clear interval too
        clearTimeout(myTimeout);
        myTimeout = setTimeout(run, 5000);
      };

      function previousSlide() {
        $(slides[i]).fadeOut(600);
        i--;
        if (i < 0) i = amount - 1;
        $(slides[i]).fadeIn(600);
        //need to clear interval too
        clearTimeout(myTimeout);
        myTimeout = setTimeout(run, 5000);
      };

      function stopTimeout() {
        clearTimeout(myTimeout);
      };

      slides = $('.active-slider').children();
      amount = slides.length;
      i = 0;
      next = $('.next-button');
      previous = $('.previous-button');
      stoptimeout = $('#close-expanded');

      $(next).click(nextSlide);
      $(previous).click(previousSlide);
      $(stoptimeout).click(stopTimeout);

      myTimeout = setTimeout(run, 5000);
    });
  };
}(jQuery));

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
  $("#close-expanded").on("click", function() {
    $(".project-details").slideUp();
    $(this).closest("#project-expanded").delay(400).fadeOut();
  });

  //expand each project view on a click of a respective button
  $("button#wdfs-button").on("click", function() {
    $("#wdfs-details").delay(400).slideDown();
  });

  $("button#todo-button").on("click", function() {
    $("#todo-details").delay(400).slideDown();
  });

  $("button#postit-button").on("click", function() {
    $("#postit-details").delay(400).slideDown();
  });

  //execute slider
  $('#wdfs-button').click(function() {
    $('.active-slider').removeClass('active-slider');
    $('#wdfs-slideshow').addClass('active-slider');
    $('.active-slider').closest('.project-details').mySlider();
  });

  $('#todo-button').click(function() {
    $('.active-slider').removeClass('active-slider');
    $('#todo-slideshow').addClass('active-slider');
    $('.active-slider').closest('.project-details').mySlider();
  });

  $('#postit-button').click(function() {
    $('.active-slider').removeClass('active-slider');
    $('#postit-slideshow').addClass('active-slider');
    $('.active-slider').closest('.project-details').mySlider();
  });
});