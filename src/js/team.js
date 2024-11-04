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
            ${member["\"bio\""] ? `
          <svg icon-name="quote" width="24" height="24" stroke="red" stroke-width="2" fill="none" style="center"></svg>
          <p class="member-bio">"${member["\"bio\""]}"</p>`:``}
            
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
    let idParts = id.split("-");
    const mainContainer=document.getElementById("teams");
    const tempDiv = document.createElement('div');
    const content=`<div class="container">
    <section class="team-year" style="text-align: left;">
      <h2>20${idParts[0]}-20${idParts[1]}</h2>
      <div class="team-grid" id="team_${id}">
    </section>
  </div>
</div>`;
    tempDiv.innerHTML=content;
    mainContainer.appendChild(tempDiv);
    const teamContainer = document.getElementById("team_"+id);

    if (!teamContainer) {
        console.error('Team container not found');
        return;
    }

    // Clear any existing content
    teamContainer.innerHTML = '';

    // Create an array to hold promises for loading images
    const loadImagePromises = teamData.map(member => {
        const memberCard = createTeamMember(member);
        loadLucideLibrary(addQuete);
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

async function loadAllTeams() {
    try {
        // Fetch data for all teams concurrently
        const [json_24_25] = await Promise.all([
            fetchAndLoadTeamMembers("24-25")
        ]);

        // Load team members for each container
        loadTeamMembers(json_24_25, "24-25");

        // Hide loading screen once all data is loaded
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.style.display = 'none';
        
    } catch (error) {
        console.error("Error loading team data:", error);
    }
}

await loadAllTeams();
  
  
function loadLucideLibrary(callback) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/lucide@latest";
      script.onload = callback; // Call the callback once the script is loaded
      document.head.appendChild(script);
}
    
function addQuete(){
    lucide.createIcons();
}