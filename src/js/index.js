// handle active class on click
const nav = document.querySelectorAll('a.anchor');

const handleClick = (e) => {
  nav.forEach((node) => {
    node.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
};

nav.forEach((node) => {
  node.addEventListener('click', handleClick);
});

// handle scroll
let activeIndex = 0;
const container = document.querySelector('.snap-container');
const containerHorizontal = document.querySelector('.snap-container-horizontal');
const elements = [...document.querySelectorAll('section.snap-item')];
const elementsHorizontal = [...document.querySelectorAll('div.snap-item-horizontal')];

function handleIntersect(entries) {
  let entry = entries.find((e) => e.isIntersecting);
  if (entry) {
    let index = elements.findIndex((e) => e === entry.target);
    let currentElement = elements[index];

    activeIndex = index;
    let hasHorizontaItems = elements[activeIndex].querySelector('.snap-item-horizontal');

    if (hasHorizontaItems) {
      document.querySelector('.next-frame').classList.add('show');
      currentElement.classList.add('has-horizontal-items');
    } else {
      document.querySelector('.next-frame').classList.remove('show');
    }

    nav.forEach((node) => {
      node.classList.remove('active');
    });
    nav[activeIndex].classList.add('active');

    elements.forEach((element) => {
      if (element.index != activeIndex) {
        element.querySelector('h2').classList.remove('show');
      }
    });
    let activeSection = elements[activeIndex];
    activeSection.querySelector('h2').classList.add('show');
  }
}

const horizontalScrollButton = document.querySelector('a.next-frame__button');

// handle horizontal frames
function handleIntersectHorizontal(entries) {
  let entry = entries.find((e) => e.isIntersecting);
  if (entry) {
    let indexHorizontal = elementsHorizontal.findIndex((e) => e === entry.target);
    activeIndexHorizontal = indexHorizontal;

    let nextHref;
    activeIndexHorizontal < elementsHorizontal.length-1 ?
      nextHref = elementsHorizontal[activeIndexHorizontal + 1].getAttribute('id') :
      nextHref = elementsHorizontal[0].getAttribute('id');

    horizontalScrollButton.setAttribute('href', `#${nextHref}`);
  }
}

const observer = new IntersectionObserver(handleIntersect, {
  root: container,
  rootMargin: '0px',
  threshold: 0.75,
});

const observerHorizontal = new IntersectionObserver(handleIntersectHorizontal, {
  root: containerHorizontal,
  rootMargin: '0px',
  threshold: 0.1
})

elements.forEach((el) => {
  observer.observe(el);
});

elementsHorizontal.forEach((el) => {
  observerHorizontal.observe(el);
})