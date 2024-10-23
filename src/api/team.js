import {csvToJson} from './csvToJson.js';
const SHEET_URL = `https://script.google.com/macros/s/AKfycbzc08JkM6zz7Zj0Yha1JX5lBWZEA3Scpve6niC417FpQdw8FfZazqoRLbspGTD6zIgybg/exec`;

export async function fetchAndLoadTeamMembers() {
    try {
        const response = await fetch(SHEET_URL);
        // if (!response.ok) {
        //     throw new Error('Failed to fetch team data');
        // }
        const csvText = await response.text();
        const teamData = csvToJson(csvText);
        return teamData;
    } catch (error) {
        console.error('Error loading team members:', error);
        const teamContainer = document.getElementById('teamGrid');
        if (teamContainer) {
            teamContainer.innerHTML = `
                <div class="error">
                    Error loading team members. Please try again later.
                </div>
            `;
        }
    }
}