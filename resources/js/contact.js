const secondaryHeader = document.querySelector('.secondary-header');
secondaryHeader.style.height = `${navigation.clientHeight}px`;
window.addEventListener('resize', function() {
  secondaryHeader.style.height = `${navigation.clientHeight}px`;
});

const map = document.querySelector('.contact iframe');

darkModeIcon.forEach(icon => {
  icon.addEventListener('click', function() {
    if (document.body.classList.contains('dark-theme')) {
      map.classList.add('map');
    } else {
      map.classList.remove('map');
    }
  });
});
