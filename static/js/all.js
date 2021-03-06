import "../scss/main.scss"; //Import main stylesheet to compile it.

import $ from "jquery";
import SmoothScroll from "smooth-scroll";
import Slideout from "slideout";
import Flickity from "flickity";
import "featherlight";

$(document).ready(() => {
  const header = document.querySelector(".site-header");
  const scroll = new SmoothScroll('a[href*="#"]');

  $(".hero-video-button").click(function() {
    const video = document.querySelector(".hero-video");
    video.paused ? video.play() : video.pause();
  });

  const heroSlider = document.querySelector("#hero-slider");
  if (heroSlider) {
    const flkty = new Flickity(heroSlider, {
      prevNextButtons: false,
      autoPlay: 3000,
      cellSelector: ".hero-slide-item"
    });
  }

  const slideout = new Slideout({
    panel: document.getElementById("panel"),
    menu: document.getElementById("menu"),
    padding: 320,
    side: "right"
  });
  slideout.on("translate", function(translated) {
    header.style.transform = `translateX(${translated}px)`;
  });
  slideout.on("beforeopen", function() {
    header.style.transition = "transform 300ms ease";
    header.style.transform = "translateX(-320px)";
  });

  slideout.on("beforeclose", function() {
    header.style.transition = "transform 300ms ease";
    header.style.transform = "translateX(0px)";
  });

  slideout.on("close", function() {
    $("#hamburger").removeClass("is-active");
    header.style.transition = "";
  });
  slideout.on("open", function() {
    $("#hamburger").addClass("is-active");
    header.style.transition = "";
  });
  scrollToTop();

  // adminbarMargin();
  toggleSlideOutMenu(slideout);

  businessWorkshopGallery();
});

/**
 * Business Workshop gallery functions
 */
function businessWorkshopGallery() {
  const coverBoxes = $(".services-cover-boxes-inner");

  if (coverBoxes.length) {
    coverBoxes.each(function() {
      let activeElement = 0;
      let dataActiveElement = 1;
      if (
        typeof $(this).data("active-element") !== "undefined" &&
        $(this).data("active-element") !== false
      ) {
        dataActiveElement = parseFloat($(this).data("active-element"));
        activeElement = dataActiveElement - 1;
      }

      const numberOfColumns = 3;

      activeElement = dataActiveElement > numberOfColumns ? 0 : activeElement;

      $(this)
        .find(".services-cover-boxes-item-inner")
        .eq(activeElement)
        .addClass("active");
      const cover_boxed = $(this);

      $(this)
        .find(".services-cover-boxes-item-inner")
        .each(function() {
          $(this).hover(function() {
            $(cover_boxed)
              .find(".services-cover-boxes-item-inner")
              .removeClass("active");
            $(this).addClass("active");
          });
        });
    });
  }
}

/**
 * Add margin-top to header if admin-bar is enabled;
 */
function adminbarMargin() {
  if (
    $(document.body).hasClass("admin-bar") &&
    $(document.body).hasClass("logged-in")
  ) {
    $(".site-header").css({ marginTop: "32px" });
  }
}

/**
 * Show back to top button if scroll > 0
 */
function scrollToTop() {
  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 600) {
      $(document.body).addClass("show-back-to-top");
    } else {
      $(document.body).removeClass("show-back-to-top");
    }
  });
}

/**
 * Initialize slideoutjs and add click events to the menu toggler.
 */
function toggleSlideOutMenu(slideout) {
  $("#hamburger").click(function() {
    if (!$("#hamburger").hasClass("is-active")) {
      $("#hamburger").addClass("is-active");
    }
    slideout.toggle();
  });
}
