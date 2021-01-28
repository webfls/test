  $('.js-slick').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 0,
    dots: false,
    arrows: false,
    draggable: true,
    focusOnSelect: true,
    initialSlide: 0,
    responsive: [{
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: true,
      }
    }]
  });
