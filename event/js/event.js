import { fetchEvents } from '../../src/api/event.js';



const eventId = new URLSearchParams(window.location.search).get('eventId');
if  (eventId) {
    try {

        const events=await fetchEvents();
        events.forEach(event => {
            if(event["\"Event Id\""]===eventId){
                document.getElementById("event_title").innerHTML=event["\"Title\""];
                document.getElementById("event_description").innerHTML=event["\"Description\""];
                document.getElementById("event_image").src=`https://drive.google.com/thumbnail?id=${event["\"Image ID\""]}&sz=w1000`;
                const loadingScreen = document.getElementById('loading-screen');
                const content = document.getElementById('content');
                
                loadingScreen.style.display = 'none'; // Hide loading screen
                content.style.display = 'block'; // Show content
            }
        });
    } catch (error) {
        console.error('Error loading events:', error);
    }
}else{
    document.getElementById("event_title").innerHTML=`Event Not Exitst`;
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    loadingScreen.style.display = 'none'; // Hide loading screen
    content.style.display = 'block'; // Show content
}