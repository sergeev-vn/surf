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
    responsive: [
      {
        breakpoint: 1158,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 872,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        }
      },
      {
        breakpoint: 692,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 391,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        }
      }
    ]
  });

  $('.slider-map').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    asNavFor: '.surf-slider',
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        }
      },
      {
        breakpoint: 692,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 626,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 391,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  $('.slider-travel').slick({
    slidesToShow: 1,
    infinite: true,
    fade: true,
    prevArrow: $('.slider-travel__slider-btns .slider-btn--prev'),
    nextArrow: $('.slider-travel__slider-btns .slider-btn--next'),
  });

  $('.slider-sleep').slick({
    slidesToShow: 1,
    infinite: true,
    fade: true,
    prevArrow: $('.slider-sleep__slider-btns .slider-btn--prev'),
    nextArrow: $('.slider-sleep__slider-btns .slider-btn--next'),
  });

  $('.slider-shop').slick({
    slidesToShow: 1,
    infinite: true,
    fade: true,
    prevArrow: $('.shop__slider-btns .slider-btn--prev'),
    nextArrow: $('.shop__slider-btns .slider-btn--next'),
  });

  //increase counter in sleep section
  $('.details__desc').each(function() {
    var spinner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.btn-controls--plus'),
      btnDown = spinner.find('.btn-controls--minus'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

  });

  $('.btn-controls').on('click', function() {
    var parents = $(this).parents('.details');
    let summ = $('.input-details--nights', parents).val() * $('.details__desc-sum', parents).data('nights') + ( $('.input-details--guests', parents).val() - 1) *  $('.details__desc-sum', parents).data('guests') 
    $('.details__desc-sum', parents).html(summ);
  })

  $('.details__desc-input').each(function() {
    var parents = $(this).parents('.details');
    let summ = $('.input-details--nights', parents).val() * $('.details__desc-sum', parents).data('nights') + ( $('.input-details--guests', parents).val() - 1) *  $('.details__desc-sum', parents).data('guests') 
    $('.details__desc-sum', parents).html(summ);
  });
  
  $('.btn-circle').on('click', function() {
    for(let i = 0; i < $('.btn-circle').length; i++) {
      $('.btn-circle')[i].classList.remove('active')
    }
    
    $(this).toggleClass('active');
  })
  
  $('.humbuger-btn').on('click', function() {
    $('.header__menu-humburger').toggleClass('active');
  });
});