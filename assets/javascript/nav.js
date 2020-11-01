// Search Icon click
document.querySelector(".searchIcon").addEventListener("click", function () {
    document.querySelector("input").classList.toggle("searchActive");
})

//Scroll
const nav = document.querySelector(".normalNav");

window.onscroll = function () {
    let top = window.scrollY;
    if (top >= 10) {
        nav.classList.add("onScroll")
    } else {
        nav.classList.remove("onScroll");
    }
}

//Responsive

const hamburger = document.getElementById("hamburger");
const nav2 = document.getElementById("nav_options");

hamburger.addEventListener("click", () => {
    nav2.classList.toggle("responsiveShow");
});