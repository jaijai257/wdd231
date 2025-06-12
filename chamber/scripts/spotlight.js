// scripts/spotlights.js
// Handles fetching and displaying random 'spotlight' advertisements for Gold/Silver members.

document.addEventListener('DOMContentLoaded', () => {
    const membersJsonUrl = 'data/members.json';
    const spotlightGrid = document.querySelector('.spotlight-grid');

    /**
     * Fetches member data from the JSON file.
     * @returns {Promise<Array<object>>} Resolves with an array of member objects.
     */
    async function fetchMembers() {
        try {
            const response = await fetch(membersJsonUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.members || data;
        } catch (error) {
            console.error('Error fetching members data:', error);
            return [];
        }
    }

    /**
     * Displays random 'spotlight' advertisements.
     */
    async function displaySpotlights() {
        const members = await fetchMembers();
        if (!members || members.length === 0) {
            console.warn('No members data available.');
            if (spotlightGrid) {
                spotlightGrid.innerHTML = '<p>No featured companies available at the moment.</p>';
            }
            return;
        }

        // Filter for Gold or Silver members
        const eligibleMembers = members.filter(member =>
            (member.membershipLevel && (member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'))
        );

        if (eligibleMembers.length < 2) {
            console.warn('Not enough Gold or Silver members to display spotlights (at least 2 required).');
            if (spotlightGrid) {
                spotlightGrid.innerHTML = '<p>No featured companies available at the moment.</p>';
            }
            return;
        }

        // Determine how many spotlights to display (2 or 3)
        const numberOfSpotlightsToDisplay = Math.min(3, eligibleMembers.length);

        // Get random unique indices
        const randomIndices = [];
        while (randomIndices.length < numberOfSpotlightsToDisplay) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }

        if (spotlightGrid) {
            spotlightGrid.innerHTML = ''; // Clear existing content

            // Populate spotlight cards
            for (let i = 0; i < numberOfSpotlightsToDisplay; i++) {
                const member = eligibleMembers[randomIndices[i]];
                
                const cardElement = document.createElement('div');
                cardElement.classList.add('spotlight-card');

                const imageUrl = member.image ? `images/${member.image}` : 'https://placehold.co/150x150/000/FFF?text=No+Image';
                const memberName = member.name || 'N/A';
                const address = member.address || '';
                const phone = member.phone || '';
                const websiteUrl = member.url || member.website || '#';
                const membershipLevel = getMembershipLabel(member.membershipLevel);

                cardElement.innerHTML = `
                    <h3>${memberName}</h3>
                    <img src="${imageUrl}" alt="${memberName} Logo" onerror="this.onerror=null;this.src='https://placehold.co/150x150/000/FFF?text=No+Image';">
                    ${phone ? `<p>Phone: ${phone}</p>` : ''}
                    ${address ? `<p>Address: ${address}</p>` : ''}
                    ${websiteUrl !== '#' ? `<p><strong>Website:</strong> <a href="${websiteUrl}" target="_blank">${websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}</a></p>` : ''}
                    <p><strong>Membership:</strong> ${membershipLevel}</p>
                `;
                spotlightGrid.appendChild(cardElement);
            }
        }
    }

    /**
     * Converts membership level to a readable label.
     * @param {string} level - The raw membership level from JSON.
     * @returns {string} The formatted membership label.
     */
    function getMembershipLabel(level) {
        switch (String(level)) {
            case "Gold": return "Gold Membership";
            case "Silver": return "Silver Membership";
            case "Bronze": return "Bronze Membership";
            case "NP": return "Non-Profit Membership";
            default: return "Basic Membership"; // Fallback for other levels if any
        }
    }

    // Call the function to display spotlights when the DOM is ready
    displaySpotlights();
});
