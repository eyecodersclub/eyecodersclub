import {csvToJson} from './csvToJson.js';
import { team } from '../js/config.js';
const SHEET_URL = `${team.BASE_URL}/${team.API_KEY}/exec`;

export async function fetchAndLoadTeamMembers(sheetName="24-25") {
    try {
        const sheetUrl = `${SHEET_URL}?sheet=${encodeURIComponent(sheetName)}`;
        const response = await fetch(sheetUrl);
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