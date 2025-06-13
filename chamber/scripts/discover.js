// scripts/discover.js
// Handles fetching and displaying discovery items, and managing last visit messages.

document.addEventListener('DOMContentLoaded', () => {
    const itemsJsonUrl = 'data/discover.json';
    const itemCardsContainer = document.getElementById('itemCardsContainer');
    const visitMessageElement = document.getElementById('visitMessage');

    /**
     * Calculates the difference in days between two timestamps.
     * @param {number} currentTimestamp - The current timestamp in milliseconds.
     * @param {number} lastVisitTimestamp - The last visit timestamp in milliseconds.
     * @returns {number} The number of full days between the two timestamps.
     */
    function getDaysBetween(currentTimestamp, lastVisitTimestamp) {
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const differenceMs = currentTimestamp - lastVisitTimestamp;
        // Calculate full days, rounding down
        return Math.floor(differenceMs / MS_PER_DAY);
    }

    /**
     * Displays a message about the user's last visit.
     * Uses localStorage to store and retrieve the last visit date.
     */
    function displayLastVisitMessage() {
        const LAST_VISIT_KEY = 'lastVisitDate';
        const currentTime = Date.now(); // Current timestamp in milliseconds

        const lastVisit = localStorage.getItem(LAST_VISIT_KEY);

        if (!lastVisit) {
            // First visit
            visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTime = parseFloat(lastVisit); // Convert stored string back to number
            const daysSinceLastVisit = getDaysBetween(currentTime, lastVisitTime);

            if (daysSinceLastVisit < 1) { // Less than a day (i.e., same day or within 24 hours)
                visitMessageElement.textContent = "Back so soon! Awesome!";
            } else if (daysSinceLastVisit === 1) {
                visitMessageElement.textContent = "You last visited 1 day ago.";
            } else {
                visitMessageElement.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
            }
        }

        // Update the last visit date in localStorage to the current time
        localStorage.setItem(LAST_VISIT_KEY, currentTime.toString());
    }

    /**
     * Fetches item data from JSON and dynamically creates display cards.
     */
    async function fetchAndDisplayItems() {
        try {
            const response = await fetch(itemsJsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const items = data.items || []; // Ensure 'items' array exists

            if (!itemCardsContainer) {
                console.error('Item cards container not found for discover page.');
                return;
            }

            itemCardsContainer.innerHTML = ''; // Clear loading message

            if (items.length === 0) {
                itemCardsContainer.innerHTML = '<p>No discovery items available at the moment.</p>';
                return;
            }

            items.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('item-card');
                card.id = item.id; // Assign ID for potential future use

                // Construct image URL, with a placeholder fallback
                const imageUrl = item.image ? `images/${item.image}` : 'https://placehold.co/300x200/000/FFF?text=No+Image';

                card.innerHTML = `
                    <h2>${item.name || 'Untitled Item'}</h2>
                    <figure>
                        <img src="${imageUrl}" alt="${item.name || 'Item image'}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/300x200/000/FFF?text=No+Image';">
                    </figure>
                    <address>${item.address || 'Address N/A'}</address>
                    <p>${item.description || 'No description available.'}</p>
                    <button class="learn-more-btn">Learn More</button>
                `;
                itemCardsContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching discovery items:', error);
            if (itemCardsContainer) {
                itemCardsContainer.innerHTML = '<p>Failed to load discovery items. Please try again later.</p>';
            }
        }
    }

    // Call functions to initialize content and messages
    displayLastVisitMessage();
    fetchAndDisplayItems();
});
