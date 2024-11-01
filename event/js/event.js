import { fetchEvents } from '../../src/api/event.js';
import { API_KEY, BASE_URL } from '../../src/js/config.js';

function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
}

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
const scriptUrl=`${BASE_URL}/${API_KEY}/exec?action=getMarkdownFromDrive`
async function fetchMarkdownFromScript(fileId) {
    try {
        const response = await fetch(scriptUrl+'&id='+fileId);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const markdown = await response.text();
        document.getElementById('content').innerHTML = marked.parse(markdown);
        
    } catch (error) {
        console.error('Error fetching the Markdown file:', error);
    }
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    
    loadingScreen.style.display = 'none'; // Hide loading screen
}
const eventId = new URLSearchParams(window.location.search).get('eventId');
if  (eventId) {
    try {
        let exitst=false;
        const events=await fetchEvents();
        events.forEach(event => {
            if(event["\"Event Id\""]===eventId){
                document.getElementById("event_title").innerHTML=event["\"Title\""];
                fetchMarkdownFromScript(event["\"Markdown File Id\""]);
                exitst=true;
            }
        });
        if(!exitst){
            document.getElementById("event_title").innerHTML=`event not exists`;
        }   
    } catch (error) {
        console.error('Error loading events:', error);
        document.getElementById("event_title").innerHTML=`event not exists`;
        const loadingScreen = document.getElementById('loading-screen');
        const content = document.getElementById('content');
        
        loadingScreen.style.display = 'none'; // Hide loading screen
    }
}else{
    document.getElementById("event_title").innerHTML=`event not exists`;
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    loadingScreen.style.display = 'none'; // Hide loading screen
}