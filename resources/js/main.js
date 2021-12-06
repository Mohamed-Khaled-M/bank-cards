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
}, 3000);
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

// -----------------------------------------------
// Progress bar
// -----------------------------------------------
const progressBars = document.querySelectorAll('.progress__bar');
const progressTitles = document.querySelectorAll('.progress__title');
const percentSpans = document.querySelectorAll('.progress__title--percent');
for (let i = 0; i < progressBars.length; i += 1) {
  const progressPercent = `${progressBars[i].dataset.percent}%`;
  progressBars[i].style.width = progressPercent;
  progressTitles[i].style.width = progressPercent;
  percentSpans[i].textContent = progressPercent;
}

// -----------------------------------------------
// Progress circle
// -----------------------------------------------
const progressCircle = document.querySelectorAll('.progress-circle');
const progressCirclePercent = document.querySelectorAll(
  '.progress-circle__percent'
);

for (let i = 0; i < progressCircle.length; i += 1) {
  const progressPercent = `${progressCircle[i].dataset.progress}`;
  progressCirclePercent[i].textContent = `${progressPercent}%`;
}

$('.progress-circle .circle').each(function() {
  const progressPercent = this.parentElement.dataset.progress / 100;
  $(this).circleProgress({
    value: progressPercent,
    size: 140,
    thickness: 7,
    startAngle: -1.5,
    fill: {
      color: '#7b59d0',
    },
  });
});
