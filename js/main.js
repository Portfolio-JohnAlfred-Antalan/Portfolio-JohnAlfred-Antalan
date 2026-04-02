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
//   overlay click
// ========================================================================= //


$('#start-overlay').on('click', function() {
  hasInteracted = true;
  $(this).fadeOut(500);
  
  // This "primes" the browser to allow audio from this domain
  const silentContext = new (window.AudioContext || window.webkitAudioContext)();
  silentContext.resume();

  // Manually trigger the observer for the first visible video
  checkIframesInView(); 
});


// ========================================================================= //
//   Google Drive Scroll-to-Play
// ========================================================================= //

$(document).ready(function() {
  const iframes = document.querySelectorAll('iframe[src*="drive.google.com"]');
  let hasInteracted = false;

  // 1. Function to stop all videos (cleans up overlapping audio)
  function pauseAll() {
    iframes.forEach(iframe => {
      if (iframe.src.includes('autoplay=1')) {
        iframe.src = iframe.src.replace(/[&?]autoplay=1/, '');
      }
    });
  }

  // 2. High-Precision Scroll Watcher
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target;
      
      // Only act if the user has clicked "Enter"
      if (hasInteracted) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.60 && entry.intersectionRatio > -.80){
          pauseAll(); // Kill others
          
          let currentSrc = iframe.src;
          // Add autoplay to the one we are looking at
          if (!currentSrc.includes('autoplay=1')) {
            iframe.src = currentSrc.includes('?') ? `${currentSrc}&autoplay=1` : `${currentSrc}?autoplay=1`;
          }
        } else {
          // Remove autoplay when scrolled away to stop the sound
          if (iframe.src.includes('autoplay=1')) {
            iframe.src = iframe.src.replace(/[&?]autoplay=1/, '');
          }
        }
      }
    });
  }, { threshold: [0, 0.60] });

  iframes.forEach(iframe => observer.observe(iframe));

  // 3. THE TRIGGER (The "Click to Enter" fix)
  $('#start-overlay').on('click', function() {
    hasInteracted = true;
    $(this).fadeOut(500); // Hide the splash screen
    
    console.log("Global Interaction Recorded - Videos Primed");

    // Force a scroll check immediately
    window.dispatchEvent(new Event('scroll'));
  });
});

