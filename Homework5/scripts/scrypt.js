jQuery(document).ready(function ($) {
  $(".fa-navicon").on("click", function () {
    $(".mobileMenu").slideToggle();
    $(this).toggleClass("active");
  });
});