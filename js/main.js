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
    strings: ["Video Editor", "Videographer", "Director"],
    typeSpeed: 70,
    backSpeed: 40,      // Smoothly deletes the text
    backDelay: 2000,    // Pause before switching to the next role
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
  // Logic from the video: 80% height is best for mobile stability
  const triggerBottom = window.innerHeight * 0.9; // Trigger earlier (at 90% of screen)
    

  animatedItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;

    // Only trigger if the item is entering the view, don't remove it
    if (itemTop < triggerBottom) {
      item.classList.add('active');
    }
  });
  }
  
    // Header animation: trigger immediately on load
  const HeaderTitles = document.querySelector('.header-content p');
  if (HeaderTitles) {
    // Add the class if it's not in the HTML
    HeaderTitles.classList.add('animate-item');
    HeaderTitles.setAttribute('data-animation', 'fade');
    
    // Trigger after 200ms (faster than 500ms) to sync with Typed.js
    setTimeout(() => {
      HeaderTitles.classList.add('active');
    }, 200); 
  }
  
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); 
});


// ========================================================================= //
//  Contact Form Submission (EmailJS)
// ========================================================================= //
$(document).ready(function() {
  $('#contact-form').on('submit', function(event) {
    event.preventDefault();
    
    const btn = $(this).find('.btn-send');
    const originalText = btn.val();
    btn.val('SENDING...');

    // Use your actual Service ID and the Template ID from your screenshot
    emailjs.sendForm('service_oissmik', 'template_6jqt3na', this)
      .then(() => {
        alert('Message sent! I will get back to you soon.');
        $('#contact-form')[0].reset();
        btn.val(originalText);
      }, (err) => {
        alert('Send failed. Check your Public Key in index.html');
        btn.val(originalText);
      });
  });
});
