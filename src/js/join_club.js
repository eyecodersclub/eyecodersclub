 import {sendRequestForJoinClub} from '../api/join_club.js';
 // Dynamic department list based on selected institute
  document.getElementById('institute').addEventListener('change', function() {
    const department = document.getElementById('department');
    department.innerHTML = ''; // Clear previous options

    if (this.value === 'cspit') {
      const options = ['Select your department','Computer Science And Engineering','Computer Engineering', 'Information Technology'];
      options.forEach(option => {
          let opt = document.createElement('option');
          opt.text = option;
          department.appendChild(opt);
        });
    } else if (this.value === 'depstar') {
    const options = ['Select your department','Computer Science And Engineering','Computer Engineering', 'Information Technology'];
      options.forEach(option => {
        let opt = document.createElement('option');
        opt.text = option;
        department.appendChild(opt);
      });
    }else{
        const options = ['Select your department'];
          options.forEach(option => {
            let opt = document.createElement('option');
            opt.text = option;
            department.appendChild(opt);
          });
    }
  });

  document.getElementById("joinForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission
  
    // Get form data
    const formData = new FormData(this);
    const jsonData = {};
    
    // Convert form data to JSON format
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
  
    sendRequestForJoinClub(jsonData);
    const loadingScreen = document.getElementById('loading-screen');
    
    loadingScreen.style.display = 'flex'; // Hide loading screen
  });


  function addClubRole(id) {
    // Get the container where new divs will be added
    const dynamicSection = document.getElementById('dynamicSection');
  
    // Create a new div for club name and role
    const main = document.createElement('div');
    main.className=`club_card`;
    main.id=`club_card_${id}`
    const newDiv = document.createElement('div');
    newDiv.classList.add('mb-3');  // Maintain form styling
  
    // Create the club name field
    const clubLabel = document.createElement('label');
    clubLabel.setAttribute('for', `clubName_${id}`);
    clubLabel.classList.add('form-label');
    clubLabel.textContent = 'Club Name';
  
    const clubInput = document.createElement('input');
    clubInput.setAttribute('type', 'text');
    clubInput.classList.add('form-control');
    clubInput.setAttribute('name', `clubName_${id}`);
    clubInput.setAttribute('placeholder', 'Enter club name');
  
    // Create the role field
    const roleLabel = document.createElement('label');
    roleLabel.setAttribute('for', `clubRole_${id}`);
    roleLabel.classList.add('form-label');
    roleLabel.textContent = 'Role';
  
    const roleInput = document.createElement('input');
    roleInput.setAttribute('type', 'text');
    roleInput.classList.add('form-control');
    roleInput.setAttribute('name', `clubRole_${id}`);
    roleInput.setAttribute('placeholder', 'Enter your role in the club');
  
    // Append the new inputs to the new div
    newDiv.appendChild(clubLabel);
    newDiv.appendChild(clubInput);
    newDiv.appendChild(roleLabel);
    newDiv.appendChild(roleInput);
    main.appendChild(newDiv);
    // Append the new div to the dynamic section
    dynamicSection.appendChild(main);
  }
  
  // Initially hide the addClubRole button
  document.getElementById('addClubRole').style.display = 'none';
  let count_club=0;
  document.getElementById('part_club').addEventListener('change', function() {
    const dynamicSection = document.getElementById('dynamicSection');
    const addClubButton = document.getElementById('addClubRole');
    dynamicSection.innerHTML = '';  // Clear previous inputs
    
    if (this.value === 'yes') {
      count_club+=1;
      addClubRole(count_club);
      addClubButton.style.display = 'block';
    } else {
      count_club=0;
      addClubButton.style.display = 'none';
    }
  });
  
  document.getElementById('addClubRole').addEventListener('click',function(){
    count_club+=1;
    addClubRole(count_club);
  });

  document.addEventListener('DOMContentLoaded', function(){
    const loadingScreen = document.getElementById('loading-screen');
      
    loadingScreen.style.display = 'none'; // Hide loading screen

  });