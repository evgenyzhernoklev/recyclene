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






    // tabs in ads
    $body.on('click', '.tabs-button', function(e) {
      e.preventDefault();
      var $parent = $('.tabs-wrapper'),
          $targetBlocks = $parent.find('.tabs-content'),
          $buttons = $parent.find('.tabs-button'),
          typeOfBlocks = $(this).data('show');

      if ($(this).hasClass('is-active')) {
        return;
      }

      $buttons.removeClass('is-active');
      $(this).addClass('is-active');

      if (typeOfBlocks == 'all') {
        $targetBlocks.removeClass('is-hidden');
        return;
      }

      $targetBlocks.each(function(index, element) {
        if ($(element).data('show') == typeOfBlocks) {
          $(element).removeClass('is-hidden');
        } else {
          $(element).addClass('is-hidden');
        }
      });
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
