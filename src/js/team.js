import { fetchAndLoadTeamMembers} from '../api/team.js';
        // Function to create a team member card

function loadTeamMembers(teamData) {
    const teamContainer = document.getElementById('teamGrid');

    if (!teamContainer) {
        console.error('Team container not found');
        return;
    }

    // Clear any existing content
    teamContainer.innerHTML = '';

    // Create cards for each team member
    teamData.forEach(member => {
        const memberCard = `
                <div class="team-member">
                    <div class="member-image">
                        <img src="https://drive.google.com/thumbnail?id=${member["\"image\""]}&sz=w1000" alt="${member["\"name\""]}">
                    </div>
                    <h3 class="member-name">${member["\"name\""]}</h3>
                    <p class="member-role">${member["\"role\""]}</p>
                    <p class="member-bio">${member["\"bio\""]}</p>
                    <div class="social-links">
                        ${member["\"linkedin\""] ?
                `<a href="${member["\"linkedin\""]}" target="_blank">
                                <i class="fab fa-linkedin-in"></i>
                            </a>` : ''
            }
                        ${member["\"github\""] ?
                `<a href="${member["\"github\""]}" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>` : ''
            }
                        ${member["\"instagram\""]?
                `<a href="${member["\"instagram\""]}" target="_blank">
                                <i class="fab fa-instagram"></i>
                            </a>` : ''
            }
                    </div>
                </div>
            `;
        teamContainer.innerHTML += memberCard;
    });
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none'; // Hide loading screen
}

// Add loading animation styles
const styles = `
            .loading {
                text-align: center;
                padding: 20px;
                color: #4a90e2; /* adjust color to match your theme */
            }
            .error {
                text-align: center;
                padding: 20px;
                color: #ff0000; /* adjust color to match your theme */
            }
        `;
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Load team members on page load
const json=await fetchAndLoadTeamMembers();
loadTeamMembers(json);