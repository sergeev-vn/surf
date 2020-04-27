$(function(){

  $('.horizontal-slider').slick({
    infinite: true,
    fade: true,
    prevArrow: $('.header__slider-btns .slider-btn--prev'),
    nextArrow: $('.header__slider-btns .slider-btn--next'),
    asNavFor: '.slider-dots'
  });

  $('.slider-dots').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.horizontal-slider'
  });

  $('.surf-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: $('.surf__slider__slider-btns .slider-btn--prev'),
    nextArrow: $('.surf__slider__slider-btns .slider-btn--next'),
    asNavFor: '.slider-map',
  });

  $('.slider-map').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    asNavFor: '.surf-slider',
    arrows: false,
    focusOnSelect: true
  });

  $('.slider-travel').slick({
    slidesToShow: 1,
    infinite: true,
    fade: true
  });
  

});