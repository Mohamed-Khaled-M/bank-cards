const loader = document.querySelector('.loading');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation__links--item');
const searchIcon = document.querySelectorAll('.navigation__search--label');
const darkModeIcon = document.querySelectorAll('.dark-mode');
const responsiveNav = document.querySelector('.responsive-navigation');
const responsiveNavBtn = document.querySelector('.navigation__side-icon');

// Loader
window.addEventListener('load', function() {
  loader.classList.add('hidden');
});

// Add class on clicked link
for (const navLink of navLinks) {
  navLink.addEventListener('click', function() {
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
  });
}
// Search input animation
searchIcon.forEach(label => {
  label.addEventListener('click', function() {
    const searchInput = this.nextElementSibling;
    searchInput.classList.toggle('active');
  });
});

// -----------------------------------------------
// Dark theme class
// -----------------------------------------------
function bgClass(el, theClass) {
  if (document.body.classList.contains('dark-theme') && window.scrollY > 30) {
    el.classList.add(`${theClass}`);
  } else {
    el.classList.remove(`${theClass}`);
  }
}
darkModeIcon.forEach(icon => {
  icon.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    this.children[0].classList.toggle('fa-sun');
    this.children[0].classList.toggle('fa-moon');

    bgClass(navigation, 'bg-white');

    searchIcon.forEach(label => {
      const searchInput = label.nextElementSibling;
      if (document.body.classList.contains('dark-theme')) {
        searchInput.classList.add('bg-gray');
      } else {
        searchInput.classList.remove('bg-gray');
      }
    });
  });
});

// Responsive navigation
responsiveNavBtn.addEventListener('click', function() {
  this.classList.toggle('close');
  responsiveNav.classList.toggle('show');
});

// Add navigation class on scroll
function scrollNavStyle() {
  if (window.scrollY > 30) {
    navigation.classList.add('scroll');
    if (document.body.classList.contains('dark-theme')) {
      navigation.classList.add('bg-white');
    } else {
      navigation.classList.remove('bg-white');
    }
  } else {
    navigation.classList.remove('scroll');
    navigation.classList.remove('bg-white');
  }
}
scrollNavStyle();
window.addEventListener('scroll', scrollNavStyle);

// -----------------------------------------------
// Move to top button
// -----------------------------------------------
const upBtn = document.querySelector('.move-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset >= 200) {
    upBtn.style.display = 'block';
  } else {
    upBtn.style.display = 'none';
  }
});

upBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
