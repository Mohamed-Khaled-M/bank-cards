const secondaryHeader = document.querySelector('.secondary-header');
secondaryHeader.style.height = `${navigation.clientHeight}px`;
window.addEventListener('resize', function() {
  secondaryHeader.style.height = `${navigation.clientHeight}px`;
});

// Counter up
const counterContainer = document.querySelector('.counter');
const counters = document.querySelectorAll('.counter__number');
const speed = 700;

function isVisible(element) {
  const elementPosition = element.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;
  if (elementPosition < screenHeight / 1.18) {
    return true;
  }
  return false;
}

for (const counter of counters) {
  const updateCount = () => {
    if (isVisible(counterContainer)) {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        count.innerText = target;
      }
    } else {
      counter.innerText = 0;
    }
  };
  window.addEventListener('scroll', updateCount);
}

// -------------------------------------------------------
// SLIDER
// -------------------------------------------------------
const slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slide');
let index = 1;
let isDragging = false;
let startX;

// Creat clones
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
slider.appendChild(firstClone);
slider.prepend(lastClone);

let slideWidth = slides[index].clientWidth;
slider.style.transform = `translateX(${-slideWidth * index}px)`;
window.addEventListener('resize', () => {
  slideWidth = slides[index].clientWidth;
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
});

// Select all slides and clones
const getSlides = () => document.querySelectorAll('.slide');
// Move slider with translate Css
const moveSlider = () => {
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
};
function moveToNextSlide() {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index += 1;
  moveSlider();
  slider.style.transition = `.3s`;
  isDragging = false;
}
function moveToPrevSlide() {
  slides = getSlides();
  if (index <= 0) return;
  index -= 1;
  moveSlider();
  slider.style.transition = `.3s`;
  isDragging = false;
}

setInterval(() => {
  moveToNextSlide();
}, 5000);
// Return to first slide without transition
slider.addEventListener('transitionend', () => {
  slides = getSlides(); // TO SELECT THE CLONE ELEMENT
  if (slides[index].id === firstClone.id) {
    slider.style.transition = `none`;
    index = 1;
    moveSlider();
  }
  if (slides[index].id === lastClone.id) {
    slider.style.transition = `none`;
    index = slides.length - 2;
    moveSlider();
  }
});
// -----------------------------------------------
// TOUCH SLIDER
// -----------------------------------------------
function getPosition(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}
function touchStart(e) {
  isDragging = true;
  startX = getPosition(e);
}
function touchMove(e) {
  e.preventDefault();
  if (!isDragging) return;
  const x = getPosition(e);
  const walk = x - startX;
  if (walk > 0) {
    moveToPrevSlide();
  } else {
    moveToNextSlide();
  }
}
const touchEnd = () => {
  isDragging = false;
};

slider.addEventListener('mousedown', touchStart);
slider.addEventListener('mouseup', touchEnd);
slider.addEventListener('mouseleave', touchEnd);
slider.addEventListener('mousemove', touchMove);

slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchend', touchEnd);
slider.addEventListener('touchmove', touchMove);
