// Wind chill logic
const temperature = -1; // Temperature in °C (matching displayed value)
const windSpeed = 5; // Wind speed in km/h (matching displayed value)

// Wind chill calculation function
function calculateWindChill(temp, speed, unit = 'metric') {
    return unit === 'metric' 
        ? (13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16))).toFixed(1)
        : (35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16))).toFixed(1);
}

// Function to display wind chill
function displayWindChill() {
    const weatherSection = document.querySelector('.weather');
    const windChillElement = weatherSection.querySelector('.wind-chill');

    // Check wind chill calculation conditions for metric units
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `Wind Chill: ${windChill}°C`;
    } else {
        windChillElement.textContent = 'Wind Chill: N/A';
    }
}

document.addEventListener('DOMContentLoaded', displayWindChill);