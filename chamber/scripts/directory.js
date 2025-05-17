// Toggle nav for mobile menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav").querySelector("ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Display current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Display last modified date
document.getElementById("lastModified").textContent = document.lastModified;

const gridBtn = document.getElementById('grid');
const listBtn = document.getElementById('list');
const container = document.querySelector('.product-grid');

gridBtn.addEventListener('click', () => {
  container.classList.add('grid');
  container.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list');
  container.classList.remove('grid');
});


// Fetch and display members/products (replace 'members' with 'products' if relevant)
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json'); // Ensure this JSON path is correct for your data
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading member data:', error);
  }
}

// Create and inject product cards or member cards
function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('product-card'); // Use product-card for styling consistency

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} image" />
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address || ''}</p>
      <p><strong>Phone:</strong> ${member.phone || ''}</p>
      <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
      <p><strong>Membership Level:</strong> ${getMembershipLabel(member.membership)}</p>
    `;

    container.appendChild(card);
  });
}

// Convert membership code to readable label
function getMembershipLabel(level) {
  switch (level) {
    case "1": return "Member";
    case "2": return "Silver";
    case "3": return "Gold";
    default: return "Unknown";
  }
}


// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  fetchMembers();
});
