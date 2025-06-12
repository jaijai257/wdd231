// scripts/style.js
// This script handles general site functionalities like mobile menu toggle and footer dates.

document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav").querySelector("ul");

    // Check if both elements exist before adding event listener
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    } else {
        console.warn("Menu toggle or navigation menu not found. Mobile menu functionality may be affected.");
    }

    // --- Footer Dates (Current Year and Last Modified) ---
    // Update the current year in the footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("Element with ID 'year' not found. Copyright year may not display.");
    }

    // Update the last modified date in the footer
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        // document.lastModified returns a string representing the date the current document was last modified.
        // It's already formatted, so we just set it directly.
        lastModifiedElement.textContent = document.lastModified;
    } else {
        console.warn("Element with ID 'lastModified' not found. Last modified date may not display.");
    }
});
