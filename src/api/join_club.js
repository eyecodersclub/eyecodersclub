import { BASE_URL, API_KEY} from "../js/config.js";
export async function sendRequestForJoinClub(jsonData) {
        // Send data to Google Apps Script via POST request
        fetch(`${BASE_URL}/${API_KEY}/exec?action=joinClub`, {
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
            if (data === "Data successfully received"){
              alert("Form successfully submitted!"); // Show success message to user
              document.getElementById("joinForm").reset(); // Optional: Reset the form
              // Close the current window
              window.location.href = "./index.html"; 
            }else{
              console.error(data); // Handle error
              alert("An error occurred while submitting the form. Please try again.");
              window.location.href = "./index.html"; 
            }
          })
          .catch(error => {
            console.error("Error:", error); // Handle error
            alert("An error occurred while submitting the form. Please try again.");
            window.location.href = "./index.html"; 
          });
}
