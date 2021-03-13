$(document).ready(function () {
  $('.js-slick').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: true,
    arrows: true,

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
});
