import {sendRequestForContect} from '../api/contact.js';

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
      });
    sendRequestForContect(jsonData);
    const loadingScreen = document.getElementById('loading-screen');
    
    loadingScreen.style.display = 'flex'; // Hide loading screen
}); 

document.addEventListener('DOMContentLoaded', function(){
    const loadingScreen = document.getElementById('loading-screen');
      
    loadingScreen.style.display = 'none'; // Hide loading screen

  });