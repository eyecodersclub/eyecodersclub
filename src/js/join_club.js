 import {sendRequestForJoinClub} from '../api/join_club.js';
 // Dynamic department list based on selected institute
  document.getElementById('institute').addEventListener('change', function() {
    const department = document.getElementById('department');
    department.innerHTML = ''; // Clear previous options

    if (this.value === 'cspit') {
      const options = ['Select your department','Computer Science And Engineering','Computer Engineering', 'Information Technology'];
      options.forEach(option => {
          let opt = document.createElement('option');
          opt.value = option.toLowerCase().replace(' ', '-');
          opt.text = option;
          department.appendChild(opt);
        });
    } else if (this.value === 'depstar') {
    const options = ['Select your department','Computer Science And Engineering','Computer Engineering', 'Information Technology'];
      options.forEach(option => {
        let opt = document.createElement('option');
        // opt.value = option.toLowerCase().replace(' ', '-');
        opt.text = option;
        department.appendChild(opt);
      });
    }else{
        const options = ['Select your department'];
          options.forEach(option => {
            let opt = document.createElement('option');
            // opt.value = option.toLowerCase().replace(' ', '-');
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