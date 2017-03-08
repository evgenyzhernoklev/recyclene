$(document).ready(function() {
    var $window = $(window),
        $body = $('body');

    /*************** check if browser supports svg ***************/
    var supportsSVG = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    if (!supportsSVG) {
        $body.addClass('no-svg');
    }



    /*************** header scroll ***************/
    // var $topMenu = $('.header_top'),
    //     $bottomMenu = $('.header_bottom'),
    //     topMenuHeight = $topMenu.height(),
    //     scrollTop = 0;
    //
    // function headerScroll() {
    //     if (scrollTop > topMenuHeight) {
    //         $bottomMenu.addClass('is-fixed');
    //         $body.addClass('menu-fixed');
    //     } else {
    //         $bottomMenu.removeClass('is-fixed');
    //         $body.removeClass('menu-fixed');
    //     }
    // }
    //
    // $window.on('load scroll', function() {
    //     topMenuHeight = $topMenu.height();
    //     scrollTop = $window.scrollTop();
    //     headerScroll();
    // });



    /*************** toggle blocks ***************/



    $('.howSliderLp').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true
    });
});
