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
//   Google Drive Scroll-to-Play
// ========================================================================= //

// ========================================================================= //
//   FIXED Google Drive Scroll-to-Play (Anti-Loop Version)
// ========================================================================= //

$(document).ready(function() {
  const iframes = document.querySelectorAll('iframe.portfolio-video');
  let hasInteracted = false;

  function pauseAll() {
    iframes.forEach(iframe => {
      if (iframe.src.includes('autoplay=1')) {
        iframe.src = iframe.src.replace(/[&?]autoplay=1/, '&autoplay=0');
        iframe.setAttribute('data-is-playing', 'false'); // Reset state
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target;
      
      // Only run if user clicked "Enter" and iframe is visible in the active tab
      if (hasInteracted && iframe.offsetParent !== null) {
        
        if (entry.isIntersecting && entry.intersectionRatio >= 0.80) {
          // GATE: If it's already playing, STOP HERE. No more looping.
          if (iframe.getAttribute('data-is-playing') === 'true') return;
          
          pauseAll(); 
          
          let currentSrc = iframe.src;
          const baseSrc = currentSrc.split('?')[0];
          // Force MUTE - Chrome will block autoplay if sound is on
          iframe.src = `${baseSrc}?autoplay=1&mute=1`; 
          
          iframe.setAttribute('data-is-playing', 'true'); // Mark as playing
          
        } else if (entry.intersectionRatio < 0.2) {
          // Reset state when scrolled away so it can play again later
          if (iframe.getAttribute('data-is-playing') === 'true') {
            iframe.src = iframe.src.replace(/[&?]autoplay=1/, '&autoplay=0');
            iframe.setAttribute('data-is-playing', 'false');
          }
        }
      }
    });
  }, { 
    threshold: [0.2, 0.80] // Dual threshold for better detection
  });

  iframes.forEach(iframe => observer.observe(iframe));

  $('#start-overlay').on('click', function() {
    hasInteracted = true;
    $(this).fadeOut(500);
    setTimeout(() => { window.dispatchEvent(new Event('scroll')); }, 600);
  });
});



// Reset video states when switching tabs to prevent background loading
$('button[data-toggle="tab"]').on('shown.bs.tab', function () {
    const allVideos = document.querySelectorAll('.portfolio-video');
    allVideos.forEach(vid => {
        vid.setAttribute('data-is-playing', 'false');
    });
    window.dispatchEvent(new Event('scroll'));
});
