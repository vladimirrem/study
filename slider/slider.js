/**
 * Created by user on 06.01.17.
 */
(function ($) {
  'use strict';
  $.fn.slider = function () {
    function create($el) {
      var $slider = $('<div>', {
        class: 'slider-main'
      });
      var $sliderImg = $('<div>', {
        class: 'slider-main-img'
      });
      var $sliderControl = $('<div>', {
        class: 'slider-main-contol'
      });
      var $images = $('img', $el);
      var i = 1;
      $images.each(function () {
        $(this).addClass('slide-image')
          .attr('id', 'slide-image-' + i)
          .appendTo($sliderImg);

        var $dot = $('<button>', {
          class: 'dot',
          val: i,
          text: i
        });
        $dot.appendTo($sliderControl);
        i++;
      });
      $sliderImg.appendTo($slider);
      $sliderControl.appendTo($slider);
      if ($('.slider-main').length === 0) {
        $slider.appendTo($el);
      }
    }
    var i = 2;
    var a = null;
    function slidePlay() {
      a = setInterval(function () {
        showSlide(i);
        if (i >= $('.slide-image').length) {
          i = 0;
        }
        i++;
      }, 3000);
    }
    function showSlide(id) {
      $('.slide-image').fadeOut(3000);
      $('#slide-image-' + id).fadeIn(3000);
    }

    function buttonClick() {
      $('.dot').click(function () {
        clearInterval(a);
        var id = $(this).attr('value');
        showSlide(id);
        i = parseInt(id) + 1;
        setTimeout(slidePlay, 4000);
      });
    }
    create($(this));
    slidePlay();
    buttonClick();
  };
})(jQuery);
