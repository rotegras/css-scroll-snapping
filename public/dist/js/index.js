// handle active class on click
const nav = document.querySelectorAll('a.anchor');

const handleClick = (e) => {
  nav.forEach(node => {
    node.classList.remove('active');
  });
  e.currentTarget.classList.add('active');
}

nav.forEach(node => {
  node.addEventListener('click', handleClick);
})


// handle scroll
let activeIndex = 0;
const container = document.querySelector('.snap-container');
const elements = [...document.querySelectorAll('.snap-item')];

function handleIntersect(entries){
  let entry = entries.find(e => e.isIntersecting);
  if (entry) {
    let index = elements.findIndex(
      e => e === entry.target
    );
    activeIndex = index;

    nav.forEach(node => {
      node.classList.remove('active');
    });
    nav[activeIndex].classList.add('active');

    let activeSection = elements[activeIndex];
    activeSection.querySelector('h2').classList.add('show');
  }
}

const observer = new IntersectionObserver(handleIntersect, {
  root: container,
  rootMargin: "0px",
  threshold: 0.50
});

elements.forEach(el => {
  observer.observe(el);
});

