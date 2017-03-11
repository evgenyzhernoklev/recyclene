$(document).ready(function() {
    var $window = $(window),
        $body = $('body');

    /*************** check if browser supports svg ***************/
    var supportsSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    if (!supportsSVG) {
        $body.addClass('no-svg');
    }



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
});
