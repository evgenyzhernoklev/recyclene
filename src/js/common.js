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



    // form image
    $('.field-image').on('change', function() {
      var $container = $(this).closest('.fieldWrapper'),
          $preview = $container.find('.fieldWrapper__imgBg'),
          reader  = new FileReader(),
          file = $(this).prop('files')[0];

      reader.onloadend = function () {
        $container.addClass('with-image');
        $preview.attr('src', reader.result);
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        $preview.attr('src', '');
        $container.removeClass('with-image');
      }
    });

    $('.image-delete').on('click', function (e) {
      e.preventDefault();
      var $container = $(this).closest('.fieldWrapper'),
          $preview = $container.find('.fieldWrapper__imgBg');

      $preview.attr('src', '');
      $container.removeClass('with-image');
    });

    $('.add-more-images').on('click', function(e) {
      e.preventDefault();
      $(this).hide();
      $('.container-images').addClass('is-active');
    });



    // avatar
    $('.field-avatar').on('change', function() {
      var $container = $(this).closest('.fieldWrapper'),
          $preview = $container.find('.fieldWrapperAvatar__img'),
          img_src = $preview.data('img'),
          reader  = new FileReader(),
          file = $(this).prop('files')[0];

      reader.onloadend = function () {
        $preview.attr('src', reader.result);
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        $preview.attr('src', img_src);
      }
    });



    // form response
    $('.conditions-more').on('change', 'input', function() {
      $('.conditions-hidden').toggleClass('is-active', $('.conditions-toggle').is(':checked'));
    });



    // form slider
    var $distance = $('.distance-number');

    $('.form-slider').slider({
      value: 60,
      range: "min",
      animate: true,
      create: function(event, ui) {
        $distance.text( $(this).slider("value") );
      },
      slide: function( event, ui ) {
        $distance.text( ui.value );
      }
    });



    // datepicker
    $('.field-date').datepicker({
      dateFormat: "dd.mm.yy",
      showOtherMonths: true,
      selectOtherMonths: true,
      minDate: 0,
      maxDate: "+3M +3D"
    }, $.datepicker.regional[ "ru" ] );

    function checkDate(plusDays) {
      var date = new Date();
      date.setDate(date.getDate() + plusDays);

      var date_date = date.getDate(),
          date_month = date.getMonth() + 1,
          date_year = date.getFullYear(),
          date_format = '';

      if (date_date < 10) {
        date_date = '0' + date_date;
      }

      if (date_month < 10) {
        date_month = '0' + date_month;
      }

      return date_format = date_date + '.' + date_month + '.' + date_year;
    }

    $('.field-date-next').on('click', function(e) {
      e.preventDefault();
      var plusDays = +$(this).data('days'),
          date = checkDate(plusDays);

      $(this)
        .closest('.field-date-container')
        .find('.field-date')
        .val(date);
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



    $('.popup-deal').on('click', function(e) {
      e.preventDefault();
      var $popup = $(this).closest('.popup');

      $popup.removeClass('popup--small');
    });

    $('.slide-toggle-link').on('click', function(e) {
      e.preventDefault();

      $('.slide-toggle-link')
        .closest('.slide-toggle-block')
        .stop()
        .slideToggle(300);
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

    initDetailsSlider();

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
        $('.slider-details').slick('unslick');
        initDetailsSlider();
      }
    });



    // menu
    $('.menuToggle').on('click', function() {
      $body.toggleClass('mobile-menu-opened');
      $('.header .menuWrapper').toggleClass('is-active');
    });



    // menu profile
    $('.menuItemLink').on('click', function() {
      if ($window.width() > 768) {
        return;
      }

      var $menu = $(this).closest('.menu'),
          $menuItems = $menu.find('.menuItem'),
          $menuItemCurrent = $(this).closest('.menuItem'),
          $menuLinks = $menuItems.find('.menuItemLink');

      $menu.toggleClass('is-active');

      if ($menuItemCurrent.hasClass('is-active')) {
        return;
      }

      $menuItems.removeClass('is-active');
      $menuItemCurrent
        .addClass('is-active')
        .insertBefore($menuItems.eq(0));
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

      /*************** slider who sells ***************/
      $('.sliderSells').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<span class="icon icon--sliderLeft"></span>',
        nextArrow: '<span class="icon icon--sliderRight"></span>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              prevArrow: '<span class="icon icon--sliderLeft"></span>',
              nextArrow: '<span class="icon icon--sliderRight"></span>'
            }
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true
            }
          }
        ]
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

      $('.tabs-button').on('click', function() {
        $('.howSliderLp').slick('unslick');

        $('.howSliderLp').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          prevArrow: '',
          nextArrow: ''
        });
      });
    }
});
