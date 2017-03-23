$(document).ready(function() {
    var $window = $(window),
        $body = $('body');

    /*************** check if browser supports svg ***************/
    var supportsSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    if (!supportsSVG) {
        $body.addClass('no-svg');
    }



    /*************** forms ***************/
    $('.form-select').selectize({
      sortField: {
        field: 'text',
        direction: 'asc'
      }
    });



    // notifications
    $body.on('click', '.notifications-show', function(e) {
      e.preventDefault();
      var $parent = $(this).closest('.notifications-wrapper'),
          $notifications = $parent.find('.tooltip');

      $notifications.toggleClass('is-visible');
    });


    // tabs
    $('.tabs-wrapper').each(function(index, element) {
      var $self = $(this),
          $links = $self.find('.tabs-button'),
          $content = $self.find('.tabs-content'),
          currentTypeOfBlocks = $links.filter('.is-active').data('show');

      function checkContent(typeOfBlocks) {
        if (typeOfBlocks == 'all') {
          $content.addClass('is-visible');
          return;
        }

        $content.each(function(index, element) {
          if ($(element).data('show') == typeOfBlocks) {
            $(element).addClass('is-visible');
          } else {
            $(element).removeClass('is-visible');
          }
        });
      }

      checkContent(currentTypeOfBlocks);

      $links.on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('is-active')) {
          return;
        }

        var typeOfBlocks = $(this).data('show');

        $links.removeClass('is-active');
        $(this).addClass('is-active');
        checkContent(typeOfBlocks);
      });
    });



    // popups
    $body.on('click', '.popup-open', function(e) {
      e.preventDefault();
      var target = $(this).data('popup'),
          $target = $('.' + target);

      $target.bPopup({
        closeClass: 'popup-close',
        opacity: 0.8,
        follow: false
      });
    });



    // sliding details
    var detailsSLiderStarted = false;
    function initDetailsSlider() {
      $('.slider-details').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<span class="slider-details-left"></span>',
        nextArrow: '<span class="slider-details-right"></span>'
      });
    }

    $('.slide-down').on('click', function(e) {
      e.preventDefault();
      var $info = $(this).find('.slide-down-info'),
          $self = $(this);

      $self
        .toggleClass('is-opened')
        .closest('.slide-down-container')
        .find('.slide-down-content')
        .stop()
        .slideToggle(700);

      if ($self.hasClass('is-opened')) {
        $info.text('СКРЫТЬ ДЕТАЛИ');
      } else {
        $info.text('ПОКАЗАТЬ ДЕТАЛИ');
      }

      if (!detailsSLiderStarted) {
        detailsSLiderStarted = true;
        initDetailsSlider();
      }
    });



    /*************** js for landing ***************/
    if ( $('.sliderSells').length ) {
      /*************** menu ***************/
      var $topMenu = $('.header-scroll'),
          topMenuHeight = $topMenu.height(),
          topMenuPosition = $topMenu.offset().top,
          scrollTop = 0;

      $window.on('load scroll', function() {
        scrollTop = $window.scrollTop();

        if (scrollTop > topMenuPosition) {
          $topMenu.addClass('is-fixed');
        } else {
          $topMenu.removeClass('is-fixed');
        }
      });

      var $menuLinks = $('.link-scroll'),
          $contentToScroll = $('.content-scroll');

      $menuLinks.on('click', function (e) {
        e.preventDefault();
        var targetBlockIndex = +$(this).data('block'),
            targetBlockTopPosition = $contentToScroll.eq(targetBlockIndex).offset().top;

        $menuLinks.removeClass('is-active');
        $(this).addClass('is-active');

        $('html, body').animate({
          scrollTop: targetBlockTopPosition - topMenuHeight
        }, 1500);
      });

      /*************** toggle blocks ***************/
      $('.tabs-link').on('click', function(e) {
        e.preventDefault();
        if ( $(this).hasClass('is-active') ) {
          return;
        }

        var $parent = $(this).closest('.tabs-wrapper'),
            $content = $parent.find('.tabs-content'),
            targetBlockIndex = +$(this).data('block'),
            $targetBlock = $content.eq(targetBlockIndex);

        $parent.find('.tabs-link').removeClass('is-active');
        $(this).addClass('is-active');

        $content.removeClass('is-active');
        $targetBlock.addClass('is-active');
      });

      /*************** slider who sells ***************/
      $('.sliderSells').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<span class="icon icon--sliderLeft"></span>',
        nextArrow: '<span class="icon icon--sliderRight"></span>'
      });

      /*************** slider how it works ***************/
      $('.slide-arrow-prev').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.slick-slider').slick('slickPrev');
      });

      $('.slide-arrow-next').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.slick-slider').slick('slickNext');
      });

      $('.howSliderLp').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: '',
        nextArrow: ''
      });
    }
});
