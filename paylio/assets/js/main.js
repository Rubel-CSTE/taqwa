"use strict";
document.addEventListener("DOMContentLoaded", function () {

  $(function ($) {

    // preloader
    $("#preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $("#preloader").css("display", "none");
    });

    // Accordion Style
    $(".accordion-item").click(function () {
      if ($(".intro")[0]) {
        $(".accordion-item").removeClass("intro");
      }
      $(this).toggleClass("intro");
    });

    // Scroll Top
    var ScrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 500) {
        ScrollTop.removeClass("active");
      } else {
        ScrollTop.addClass("active");
      }
    });
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });

    // Navbar Dropdown
    var dropdown_menu = $(".header-section .dropdown-menu");
    $(window).resize(function () {
      if ($(window).width() < 992) {
        dropdown_menu.removeClass('show');
      }
      else {
        dropdown_menu.addClass('show');
      }
    });
    if ($(window).width() < 992) {
      dropdown_menu.removeClass('show');
    }
    else {
      dropdown_menu.addClass('show');
    }

    // Sticky Header
    var fixed_top = $(".header-section");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      }
      else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }
    });

    // Password Show Hide
    $('.showPass').on('click', function(){
        var passInput=$(".passInput");
        if(passInput.attr('type')==='password'){
          passInput.attr('type','text');
        }else{
          passInput.attr('type','password');
        }
    });

    // stylesheet disabled enabled
    function toggleStylesheet(stylesheet) {
      if (stylesheet === 'rtl') {
        $('#rtl-stylesheet').prop('disabled', false);
        $('#ltr-stylesheet').prop('disabled', true);
        localStorage.setItem('selectedStylesheet', 'rtl');
        $('html, body').addClass('rtl-active');
      } else {
        $('#ltr-stylesheet').prop('disabled', false);
        $('#rtl-stylesheet').prop('disabled', true);
        localStorage.setItem('selectedStylesheet', 'ltr');
        $('html, body').removeClass('rtl-active');
      }
    }
  
    // Check local storage for selected stylesheet
    var selectedStylesheet = localStorage.getItem('selectedStylesheet');
    if (selectedStylesheet) {
      toggleStylesheet(selectedStylesheet);
    }

    // Dragging 
    var isDragging = false;
    var startX, initialLeft;

    // When mouse or touch starts on draggable div
    $('#draggableDiv').on('mousedown touchstart', function(e) {
        isDragging = true;
        if (e.type === 'mousedown') {
            startX = e.pageX;
        } else if (e.type === 'touchstart') {
            var touch = e.originalEvent.touches[0];
            startX = touch.pageX;
        }
        initialLeft = parseFloat($(this).css('left'));
    });

    // When mouse or touch moves while dragging
    $(document).on('mousemove touchmove', function(e) {
        if(isDragging) {
            var moveX;
            if (e.type === 'mousemove') {
                moveX = e.pageX;
            } else if (e.type === 'touchmove') {
                var touch = e.originalEvent.touches[0];
                moveX = touch.pageX;
            }
            var deltaX = moveX - startX;
            var newX = initialLeft + deltaX;
            
            // Calculate main screen boundaries
            var mainScreenWidth = $(window).width();
            
            // Constrain movement within main screen boundaries
            newX = Math.min(Math.max(newX, 0), mainScreenWidth - $('#draggableDiv').outerWidth());
            
            $('#draggableDiv').css({
                left: newX
            });
            
            // Prevent default touchmove behavior (e.g., page scrolling)
            e.preventDefault();
        }
    });

    // When mouse or touch ends
    $(document).on('mouseup touchend', function() {
        isDragging = false;
    });

    // update Margins And Padding
    function updateMarginsAndPadding() {
      const elements = document.querySelectorAll('*:not(.container):not(.container-fluid):not(.row):not(.row > div):not(#draggableDiv):not(.navbar-nav .dropdown-menu):not(.slick-track)');
      elements.forEach(element => {
          const computedStyle = window.getComputedStyle(element);
          const marginLeft = computedStyle.marginLeft;
          const marginRight = computedStyle.marginRight;
          const paddingLeft = computedStyle.paddingLeft;
          const paddingRight = computedStyle.paddingRight;
          const right = computedStyle.right;
          const left = computedStyle.left;
          if (left !== '0px' || left !== '') {
              element.style.left = right !== 'auto' ? right : '';
              element.style.right = left !== 'auto' ? left : '';
          }
          if (right !== '0px' || right !== '') {
              element.style.right = left !== 'auto' ? left : '';
              element.style.left = right !== 'auto' ? right : '';
          }
          if (marginLeft !== '0px') {
              element.style.marginLeft = marginRight;
              element.style.marginRight = marginLeft;
          }
          if (marginRight !== '0px') {
            element.style.marginRight = marginLeft;
            element.style.marginLeft = marginRight;
          }
          if (paddingLeft !== '0px') {
              element.style.paddingLeft = paddingRight;
              element.style.paddingRight = paddingLeft;
          }
          if (paddingRight !== '0px') {
              element.style.paddingRight = paddingLeft;
              element.style.paddingLeft = paddingRight;
          }
      });
    }

    // Button click event handlers
    updateLtrRtlButton();
    $('#btn-ltr').on('click', function() {
      if ($('body').hasClass('rtl-active')) {
        toggleStylesheet('ltr');
        $('html, body').removeClass('rtl-active');
        setTimeout(() => {
          updateMarginsAndPadding();
        }, 1);
        updateLtrRtlButton();
      }
    });
  
    $('#btn-rtl').on('click', function() {
      if (!$('body').hasClass('rtl-active')) {
        toggleStylesheet('rtl');
        $('html, body').addClass('rtl-active');
        setTimeout(() => {
          updateMarginsAndPadding();
        }, 1);
        updateLtrRtlButton();
      }
    });
  
    function updateLtrRtlButton() {
      if ($('body').hasClass('rtl-active')) {
        $('#btn-ltr').prop('disabled', false);
        $('#btn-rtl').prop('disabled', true);
      } else {
        $('#btn-ltr').prop('disabled', true);
        $('#btn-rtl').prop('disabled', false);
      }
    }

    // Button click event handlers
    if ($('body').hasClass('rtl-active')) {
      setTimeout(() => {
        updateMarginsAndPadding();
      }, 1);
    }

    // Current Year
    $(".currentYear").text(new Date().getFullYear());

  });
});