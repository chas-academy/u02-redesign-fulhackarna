const dropDownNav = document.getElementById("normal-nav");
const navBar = document.querySelector(".nav");

window.addEventListener('scroll', function () { // Check for scroll
    let top = window.scrollY;

    if (top >= 10) {
        navBar.classList.add("nav-scrolled")
        document.getElementById("hamburger").style.color = "white";

    } else {
        navBar.classList.remove("nav-scrolled");
        if (dropDownNav.id == "drop") {
            document.getElementById("hamburger").style.color = "white";
        } else {
            document.getElementById("hamburger").style.color = "black";
        }
    }
});

function dropDown() {
    let top = window.scrollY;

    if (dropDownNav.id == "drop") {
        dropDownNav.id = "normal-nav";
        if (top >= 10) {
            document.getElementById("hamburger").style.color = "white";

        } else {
            document.getElementById("hamburger").style.color = "black";
        }
    } else if (dropDownNav.id == "normal-nav") {
        dropDownNav.id = "drop";
        document.getElementById("hamburger").style.color = "white";
    }
}