"use strict";

const phoneInfo = document.getElementById("phone-info");
const emailInfo = document.getElementById("email-info");
const forumInfo = document.getElementById("forum-info");
const pressInfo = document.getElementById("press-info");

document.getElementById("phone-link").onclick = e => {
  e.preventDefault();

  emailInfo.classList.remove("card-info--active");
  forumInfo.classList.remove("card-info--active");
  pressInfo.classList.remove("card-info--active");
  phoneInfo.classList.add("card-info--active");
};

document.getElementById("email-link").onclick = e => {
  e.preventDefault();

  emailInfo.classList.add("card-info--active");
  forumInfo.classList.remove("card-info--active");
  pressInfo.classList.remove("card-info--active");
  phoneInfo.classList.remove("card-info--active");
};

document.getElementById("forum-link").onclick = e => {
  e.preventDefault();

  emailInfo.classList.remove("card-info--active");
  forumInfo.classList.add("card-info--active");
  pressInfo.classList.remove("card-info--active");
  phoneInfo.classList.remove("card-info--active");
};

document.getElementById("press-link").onclick = e => {
  e.preventDefault();

  emailInfo.classList.remove("card-info--active");
  forumInfo.classList.remove("card-info--active");
  pressInfo.classList.add("card-info--active");
  phoneInfo.classList.remove("card-info--active");
};
