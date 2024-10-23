import { fetchAndLoadTeamMembers} from '../api/team.js';
// Function to create a team member card
function createTeamMember(member){
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
    return memberCard;
}
function loadTeamMembers(teamData,id) {
    const teamContainer = document.getElementById(id);

    if (!teamContainer) {
        console.error('Team container not found');
        return;
    }

    // Clear any existing content
    teamContainer.innerHTML = '';

    // Create cards for each team member
    teamData.forEach(member => {
        const memberCard=createTeamMember(member);
        teamContainer.innerHTML += memberCard;
    });

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
const json_24_25=await fetchAndLoadTeamMembers("24-25");
loadTeamMembers(json_24_25,"team_24-25");

// // Load team members on page load
// const json_25_26=await fetchAndLoadTeamMembers("25-26");
// loadTeamMembers(json_25_26,"team_25-26");

// // Load team members on page load
// const json_26_27=await fetchAndLoadTeamMembers("26-27");
// loadTeamMembers(json_26_27,"team_26-27");

// Hide loading screen
const loadingScreen = document.getElementById('loading-screen');
loadingScreen.style.display = 'none'; 