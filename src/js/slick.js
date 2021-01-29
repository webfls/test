  $('.js-slick').slick({
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    arrows: false,

    responsive: [{
      breakpoint: 1920,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
        draggable: true,
        focusOnSelect: true,
        initialSlide: 0,
      }
    }]
  });
