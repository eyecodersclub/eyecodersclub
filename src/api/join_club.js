import { joinClub } from "../js/config";
export async function sendRequestForJoinClub(jsonData) {
        // Send data to Google Apps Script via POST request
        fetch(`${joinClub.BASE_URL}/${joinClub.API_KEY}/exec`, {
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
            // Close the current window
            window.close();
          })
          .catch(error => {
            console.error("Error:", error); // Handle error
            alert("An error occurred while submitting the form. Please try again.");
          });
        });
}