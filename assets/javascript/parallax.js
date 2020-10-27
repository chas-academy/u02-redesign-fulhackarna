function parallaxEffect() {
  const element = document.querySelectorAll(".parallax"); // Grab element with a classname of "parallax"

  pageWidth = document.documentElement.clientWidth; // Get client page width
  if (pageWidth >= 1500) {
    // Parallax min width
    parallaxSwitch = 1;
  } else {
    parallaxSwitch = 0; // Don't execute parallax if screen is smaller than minimum
  }
  let index = 0,
    length = element.length;
  for (index; index < length; index++) {
    let offsetValue =
      window.pageYOffset * element[index].dataset.speed * parallaxSwitch; // Calculate offset for element
    element[index].style.transform = `translateY(${offsetValue + "px"})`; // Transform element
  }
}

window.addEventListener("scroll", function () {
  // Check for scroll
  parallaxEffect();
});
window.onresize = function () {
  // Check for client window resize
  parallaxEffect();
};
