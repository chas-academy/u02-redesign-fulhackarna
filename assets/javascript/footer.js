'use strict';

const linkNamesOne = ['phone', 'email', 'forum', 'press'];
const linkNamesTwo = ['share', 'websites', 'about'];
const linkNamesThree = ['address', 'youtube'];
const infoElementsOne = getAllElementsByNames(linkNamesOne);
const infoElementsTwo = getAllElementsByNames(linkNamesTwo);
const infoElementsThree = getAllElementsByNames(linkNamesThree);

addClickEventToElements(linkNamesOne, infoElementsOne);
addClickEventToElements(linkNamesTwo, infoElementsTwo);
addClickEventToElements(linkNamesThree, infoElementsThree);

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
