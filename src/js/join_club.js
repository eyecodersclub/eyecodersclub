import {sendRequestForJoinClub} from '../api/join_club.js';
import { getStudentInfo } from '../api/getInfo.js';
const departments = ['cs', 'ce', 'it', 'dcs', 'dce', 'dit'];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function extractEmailParts(email) {
  // Define the regex pattern for validation
  const emailPattern = new RegExp(`^(d?\\d{2})([a-zA-Z]+)(\\d{3})@charusat\\.edu\\.in$`, 'i');
  const match = email.match(emailPattern); // Match against the pattern

  if (match) {
      // Extract parts: [full match, year, department, number]
      const year = match[1];           // First capturing group
      const department = match[2];     // Second capturing group
      const number = match[3];         // Third capturing group
      const domain = "@charusat.edu.in"; // Domain part
      
      // Return the extracted parts in an array
      return [year, department, number, domain];
  } else {
      return null; // Return null if the email format is invalid
  }
}

// Mobile Number Validation
document.getElementById("id").addEventListener("input", async function() {
  const idInput = document.getElementById("id");
  const idError = document.getElementById("idError");
  const idPattern = new RegExp(`^(d?\\d{2}(?:${departments.join('|')})\\d{3})`, 'i');
  const institute = document.getElementById('institute');
  const department = document.getElementById('department');
  const semester=document.getElementById('semester');

  const email=document.getElementById('email');

  // Validate id format
  if (!idPattern.test(idInput.value)) {
    idError.style.display = "block";
    idError.textContent="Invalid Collage Id";
    institute.innerHTML='';
    institute.innerHTML=`<option value="">SELECT YOUR INSTITUTE</option>
                          <option value="CSPIT">CSPIT</option>
                          <option value="DEPSTAR">DEPSTAR</option>`;
    department.innerHTML='<option value="">SELECT YOUR DEPARTMENT</option>';
    semester.value="";
    institute.value="";
    department.value="";
    email.value="";

  } else {
    sleep(1000);
    idError.style.display = "none";
    const loadingScreen = document.getElementById('loading-screen');
    const container=document.getElementById('form-container');
    loadingScreen.style.display = 'flex';
    container.style.display='none';
    const data=await getStudentInfo(idInput.value);
    console.log(data);
    if(data){
      if (data.responseCode === "200") {
        idError.style.display = "block";
        idError.textContent=data.studentName;
        const semester=document.getElementById('semester');
        semester.value=data.currentSemester;

  
        let x;
        if (x = extractEmailParts(idInput.value+"@charusat.edu.in")) {
          
          // Convert data[1] to lower case once for efficiency
          const departmentCode = x[1].toLowerCase();
          
    
          //select institute form email
          if (departmentCode === 'cs' || departmentCode === 'ce' || departmentCode === 'it') {
            institute.value = 'CSPIT';
          } else if (departmentCode === 'dcs' || departmentCode === 'dce' || departmentCode === 'dit') {
            institute.value = 'DEPSTAR';
          }
    
          department.innerHTML = ''; // Clear previous options
          
          if (institute.value === 'CSPIT') {
            const options = ['SELECT YOUR DEPARTMENT','COMPUTER SCIENCE AND ENGINEERING','COMPUTER ENGINEERING', 'INFORMATION TECHNOLOGY'];
            options.forEach(option => {
              let opt = document.createElement('option');
              opt.text = option;
              department.appendChild(opt);
            });
          } else if (institute.value === 'DEPSTAR') {
            const options = ['SELECT YOUR DEPARTMENT','COMPUTER SCIENCE AND ENGINEERING','COMPUTER ENGINEERING', 'INFORMATION TECHNOLOGY'];
            options.forEach(option => {
              let opt = document.createElement('option');
              opt.text = option;
              department.appendChild(opt);
            });
          }else{
              const options = ['SELECT YOUR DEPARTMENT'];
              options.forEach(option => {
                let opt = document.createElement('option');
                opt.text = option;
                department.appendChild(opt);
              });
            }
            
            
          //select department form email
          if (departmentCode.includes('cs')) {
              department.value = 'COMPUTER SCIENCE AND ENGINEERING';
          } else if (departmentCode.includes('ce')) {
              department.value = 'COMPUTER ENGINEERING';
          } else if (departmentCode.includes('it')) {
              department.value = 'INFORMATION TECHNOLOGY';
          }
          email.value=idInput.value+"@charusat.edu.in";
      }
      loadingScreen.style.display = 'none';
      container.style.display='block';
    }else{
      idError.style.display = "block";
      idError.textContent=data.error;
      semester.value="";
      institute.value="";
      department.value="";
      email.value="";

      loadingScreen.style.display = 'none';
      container.style.display='block';
      }
      loadingScreen.style.display = 'none';
      container.style.display='block';
    }
  }
  if (idInput.value.trim() === '') {
    idError.style.display = "none";
    institute.innerHTML='';
    institute.innerHTML=`<option value="">SELECT YOUR INSTITUTE</option>
                          <option value="CSPIT">CSPIT</option>
                          <option value="DEPSTAR">DEPSTAR</option>`;
    department.innerHTML='<option value="">SELECT YOUR DEPARTMENT</option>';
    semester.value="";
    institute.value="";
    department.value="";
  }
});
document.getElementById("contact").addEventListener("input", function() {
  const contactInput = document.getElementById("contact");
  const contactError = document.getElementById("contactError");
  const mobilePattern = /^[0-9]{10}$/;

  // Remove non-digit characters
  contactInput.value = contactInput.value.replace(/\D/g, '');
  // Check length and enforce max length of 10 digits
  if (contactInput.value.length > 10) {
    contactInput.value = contactInput.value.slice(0, 10); // Trim to first 10 digits
  }
  // Validate the number length
  if (!mobilePattern.test(contactInput.value)) {
      contactError.style.display = "block";
  } else {
      contactError.style.display = "none";
  }
  if (contactInput.value.trim() === '') {
    contactError.style.display = "none";
  }
});

let suggestionAdded=false;
// Email Validation
document.getElementById("email").addEventListener("input", function() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  // Regex pattern to validate specified formats
  const emailPattern = new RegExp(`^(d?\\d{2}(?:${departments.join('|')})\\d{3})@charusat\\.edu\\.in$`, 'i');


    // Show suggestion if '@' is typed
    let atIndex = emailInput.value.indexOf('@');
    if (atIndex !== -1 && emailInput.value.length === atIndex + 1 && !suggestionAdded) {
        // Add the suggestion only the first time
        emailInput.value += 'charusat.edu.in'; 
        suggestionAdded = true; // Set the flag to true after adding
    }
    if(atIndex===-1){
      suggestionAdded=false;
    }
  
  // Validate email format
  if (!emailPattern.test(emailInput.value)) {
      emailError.style.display = "block";
      emailError.textContent = "Invalid email format. Please use the format: YY[dept]XXX@charusat.edu.in OR DYY[dept]XXX@charusat.edu.in";
    } else {
      emailError.style.display = "none";
    }
  
});


 // Dynamic department list based on selected institute
  document.getElementById('institute').addEventListener('change', function() {
    const department = document.getElementById('department');
    department.innerHTML = ''; // Clear previous options

    if (this.value === 'CSPIT') {
      const options = ['SELECT YOUR DEPARTMENT','COMPUTER SCIENCE AND ENGINEERING','COMPUTER ENGINEERING', 'INFORMATION TECHNOLOGY'];
      options.forEach(option => {
          let opt = document.createElement('option');
          opt.text = option;
          department.appendChild(opt);
        });
    } else if (this.value === 'DEPSTAR') {
    const options = ['SELECT YOUR DEPARTMENT','COMPUTER SCIENCE AND ENGINEERING','COMPUTER ENGINEERING', 'INFORMATION TECHNOLOGY'];
      options.forEach(option => {
        let opt = document.createElement('option');
        opt.text = option;
        department.appendChild(opt);
      });
    }else{
        const options = ['SELECT YOUR DEPARTMENT'];
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
  