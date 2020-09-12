$('.burger_nav').on("click", function(e) {
  e.preventDefault(),
  $(".burger_nav").toggleClass("open"),
  $(".header").toggleClass("open"),
  $(".mobile_nav").toggleClass("d-none")
})
// Banner
$('#slick_banner').slick({
  autoplay: false,
  dots: true,
  infinite: true,
  speed: 1000,
  accessibility: false,
  prevArrow: '<button class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
  nextArrow: '<button class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
  fade: true,
  cssEase: 'linear',
  lazyLoad: 'ondemand',
  responsive: [{
    breakpoint: 991,
    settings: {
      arrows: true,
      dots: true
    }
  }]
});
