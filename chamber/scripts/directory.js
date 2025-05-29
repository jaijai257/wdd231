// Toggle nav for mobile menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav").querySelector("ul");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Select container for products
const container = document.querySelector('.product-grid');

// Fetch and display members/products
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading member data:', error);
  }
}

function displayMembers(members) {
  container.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('product-card');
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

function getMembershipLabel(level) {
  switch (level) {
    case "1": return "Member";
    case "2": return "Silver";
    case "3": return "Gold";
    default: return "Unknown";
  }
}

// Wind chill logic
const temperature = -1;
const windSpeed = 5;

function calculateWindChill(temp, speed, unit = 'metric') {
  return unit === 'metric' 
    ? (13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16))).toFixed(1)
    : (35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16))).toFixed(1);
}

function displayWindChill() {
  const weatherSection = document.querySelector('.weather');
  const windChillElement = weatherSection.querySelector('.wind-chill');

  if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `Wind Chill: ${windChill}°C`;
  } else {
    windChillElement.textContent = 'Wind Chill: N/A';
  }
}

// Final page setup
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  fetchMembers();
  displayWindChill();
});
