const secondaryHeader = document.querySelector('.secondary-header');
secondaryHeader.style.height = `${navigation.clientHeight}px`;
window.addEventListener('resize', function() {
  secondaryHeader.style.height = `${navigation.clientHeight}px`;
});
