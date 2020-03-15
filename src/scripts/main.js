$(function(){

  $('.horizontal-slider').slick({
    infinite: true,
    fade: true,
    prevArrow: $('.slider-btn--prev'),
    nextArrow: $('.slider-btn--next'),
    asNavFor: '.slider-dots'
  });

  $('.slider-dots').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.horizontal-slider'
  });
});