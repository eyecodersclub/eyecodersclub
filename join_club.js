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
  
    // Send data to Google Apps Script via POST request
    fetch("https://script.google.com/macros/s/AKfycbyRSGNvAe31g42DE17FsKk-GvLXZpW0hqljKe9-ZRfOe-JlJN_6NwCdEpmQOs4WsDPl/exec", {
      method: "POST",
      mode: "cors", // Cross-origin request (if needed)
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(jsonData).toString() // Convert JSON data to URL-encoded format
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Handle response here
      alert("Form successfully submitted!"); // Show success message to user
      document.getElementById("joinForm").reset(); // Optional: Reset the form
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error("Error:", error); // Handle error
      alert("An error occurred while submitting the form. Please try again.");
    });
  });
  