// Toggle nav for mobile menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav").querySelector("ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Select container for products
const container = document.querySelector('.product-grid');



// Toggle between Grid and List View
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const productGrid = document.querySelector('.product-grid');
gridViewBtn.addEventListener('click', () => {
  productGrid.classList.add('grid');
  productGrid.classList.remove('list');
});
listViewBtn.addEventListener('click', () => {
  productGrid.classList.add('list');
  productGrid.classList.remove('grid');
});


// Final page setup
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  // fetchMembers(); // This call is now handled by fetchAndDisplayProducts in directory.js
  // displayWindChill(); // This is for weather.js, not directory.js
});


