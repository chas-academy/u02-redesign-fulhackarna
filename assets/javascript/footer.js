'use strict';

const linkNamesOne = ['phone', 'email', 'forum', 'press'];
const linkNamesTwo = ['share', 'websites', 'about'];
const linkNamesThree = ['address', 'youtube'];
const linkNamesMobile = [
  'phone-s',
  'email-s',
  'forum-s',
  'websites-s',
  'youtube-s',
];
const infoElementsOne = getAllElementsByNames(linkNamesOne);
const infoElementsTwo = getAllElementsByNames(linkNamesTwo);
const infoElementsThree = getAllElementsByNames(linkNamesThree);

addClickEventToElements(linkNamesOne, infoElementsOne);
addClickEventToElements(linkNamesTwo, infoElementsTwo);
addClickEventToElements(linkNamesThree, infoElementsThree);
addClickEventToElementsMobile(linkNamesMobile);

function getAllElementsByNames(names) {
  let elements = new Map();
  names.forEach(name => {
    let element = document.getElementById(`${name}-info`);
    elements.set(name, element);
  });
  return elements;
}

function addClickEventToElements(names, elements) {
  names.forEach(name => {
    document.getElementById(`${name}-link`).onclick = e => {
      e.preventDefault();
      elements.forEach(element => {
        element.classList.remove('footer__card-info--active');
      });
      elements.get(name).classList.add('footer__card-info--active');
    };
  });
}

function addClickEventToElementsMobile(names) {
  names.map(name => {
    document.getElementById(`${name}-link`).onclick = e => {
      e.preventDefault();
    };
  });
}
