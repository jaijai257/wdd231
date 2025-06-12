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
document.addEventListener("DOMContentLoaded", () => {
  // Corrected ID to "year" to match HTML <span id="year">
  const yearElement = document.getElementById("year");
  if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
  }

  // Corrected to only insert the date, assuming "Last Modified: " is in HTML
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
      lastModifiedElement.textContent = document.lastModified;
  }
});


