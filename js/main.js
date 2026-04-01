/*global $, jQuery, alert*/
$(document).ready(function() {

  'use strict';

  // ========================================================================= //
  //  //SMOOTH SCROLL
  // ========================================================================= //


  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash,
        menu = target;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target.selector;
      $(document).on("scroll", onScroll);
    });
  });


  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // ========================================================================= //
  //  //NAVBAR SHOW - HIDE
  // ========================================================================= //


  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
    }
  });

  // ========================================================================= //
  //  // RESPONSIVE MENU
  // ========================================================================= //

  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // ========================================================================= //
  //  Typed Js
  // ========================================================================= //

  var typed = $(".typed");

  $(function() {
    typed.typed({
      strings: ["John Alfred "],
      typeSpeed: 70,
      loop: true,
    });
  });


  // ========================================================================= //
  //  Owl Carousel Services
  // ========================================================================= //


  $('.services-carousel').owlCarousel({
    autoplay: false,
    loop: false,
    margin: 20,
    dots: true,
    nav: false,
    responsiveClass: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 3 } }
  });

  // ========================================================================= //
  //  magnificPopup
  // ========================================================================= //

  var magnifPopup = function() {
    $('.popup-img').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-with-zoom',
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  };


  // Call the functions
  magnifPopup();

});

// ========================================================================= //
//  Porfolio isotope and filter
// ========================================================================= //
$(window).load(function(){

  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-thumbnail',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on( 'click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

})



// ========================================================================= //
//  about animation
// ========================================================================= //

document.addEventListener('DOMContentLoaded', function () {
  const animatedItems = document.querySelectorAll('.animate-item');

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.65;

    animatedItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        item.classList.add('active');
      }
    });
  }
  //Header animation: trigger immediately without scrolling//
  const HeaderTitles = document.querySelector('.header-content p');
    if(HeaderTitles){
   HeaderTitles.classList.add('animate-item');}
   HeaderTitles.setAttribute('data-animation', 'fade');
   //small delay starts loading//
   setTimeout(() =>{
    HeaderTitles.classList.add('active')}, 500);


  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once to check items already in view
});


// ========================================================================= //
//  Autoplay/Pause Videos on Scroll
// ========================================================================= //

document.addEventListener('DOMContentLoaded', function () {
  const videoIframes = document.querySelectorAll('.embed-responsive-item');

  const options = {
    root: null, // use the viewport
    threshold: 0.6 // 60% of the video must be visible to play
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target;
      let src = iframe.src;

      if (entry.isIntersecting) {
        // Play: Add autoplay parameter if not present
        if (src.indexOf('autoplay=1') === -1) {
          iframe.src = src.indexOf('?') !== -1 ? `${src}&autoplay=1` : `${src}?autoplay=1`;
        }
      } else {
        // Pause: Remove autoplay parameter
        if (src.indexOf('autoplay=1') !== -1) {
          iframe.src = src.replace(/[&?]autoplay=1/, '');
        }
      }
    });
  }, options);

  videoIframes.forEach(video => observer.observe(video));
});


