import { fetchAndLoadTeamMembers} from '../api/team.js';


// Function to create a team member card
function createTeamMember(member){
    const memberName = `${member["\"name\""]}`;
    let name = memberName.replace(/\s+/g, '_').toLowerCase(); // Replace all spaces, not just the first one
    const uniqueId = `${name}_${member["\"image\""].substring(0, 6)}`; // Make the ID more unique by adding part of the image ID

    const memberCard = `
        <div class="team-member">
            <div class="member-image" id="member-image_${uniqueId}">
                <span id="initials_${uniqueId}"></span>
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

function loadTeamMembers(teamData, id) {
    const teamContainer = document.getElementById(id);

    if (!teamContainer) {
        console.error('Team container not found');
        return;
    }

    // Clear any existing content
    teamContainer.innerHTML = '';

    // Create an array to hold promises for loading images
    const loadImagePromises = teamData.map(member => {
        const memberCard = createTeamMember(member);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = memberCard; // Temporarily hold the HTML string

        // Extract elements from the temporary div
        const memberImageDiv = tempDiv.querySelector('.member-image');
        const memberName = `${member["\"name\""]}`;
        let name = memberName.replace(/\s+/g, '_').toLowerCase();
        const uniqueId = `${name}_${member["\"image\""].substring(0, 6)}`;

        const imageUrl = `https://drive.google.com/thumbnail?id=${member["\"image\""]}&sz=w1000`;
        const initialsElement = tempDiv.querySelector(`#initials_${uniqueId}`);
        const imgElement = document.createElement('img');
        imgElement.id = `memberImage_${uniqueId}`;
        imgElement.src = imageUrl;

        // Set initials
        const nameParts = memberName.trim().split(' ');
        const initials = nameParts.map(part => part[0]).join('').substring(0, 2);
        initialsElement.textContent = initials;

        // Append the member card to the team container
        teamContainer.appendChild(tempDiv);

        return loadImage(imgElement).then(() => {
            initialsElement.style.display = 'none';
            initialsElement.remove();
            memberImageDiv.appendChild(imgElement); // Append the image to the member image div
        }).catch(() => {
            initialsElement.style.display = 'block';
            imgElement.remove();
            console.log("Error loading image for:", memberName);
        });
    });

    // Wait for all image loading promises to complete
    Promise.all(loadImagePromises)
        .then(() => {
            console.log('All images loaded successfully');
        })
        .catch(() => {
            console.error('One or more images failed to load');
        });
}


// Function to load an image and return a Promise
function loadImage(imgElement) {
    return new Promise((resolve, reject) => {
        imgElement.onload = () => {
            resolve();
        };
        imgElement.onerror = () => {
            reject();
        };
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

// // Load team members on page load
// const json_26_27=await fetchAndLoadTeamMembers("26-27");
// loadTeamMembers(json_26_27,"team_26-27");

// // Load team members on page load
// const json_25_26=await fetchAndLoadTeamMembers("25-26");
// loadTeamMembers(json_25_26,"team_25-26");

// Load team members on page load
const json_24_25=await fetchAndLoadTeamMembers("24-25");
loadTeamMembers(json_24_25,"team_24-25");



// Hide loading screen
const loadingScreen = document.getElementById('loading-screen');
loadingScreen.style.display = 'none'; 