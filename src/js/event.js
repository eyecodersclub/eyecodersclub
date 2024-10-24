import {fetchEvents} from '../api/event.js'

// Function to format date and time in a human-readable way
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

function formatDate(dateString) {
    // Split the date string by spaces
    let parts = dateString.split(' ');
    
    // Format the date: 'Oct 21, 2024 10:00:00'
    let formattedDate = `${parts[1]} ${parts[2]}, ${parts[3]} ${parts[4]}`;
    
    return formattedDate;   
}

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
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


// Function to dynamically load the Lottie library
function loadLottieLibrary(callback) {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.6/lottie.min.js";
    script.onload = callback; // Call the callback once the script is loaded
    document.head.appendChild(script);
}

// Function to load the Lottie animation
const loadAnimationAfterContainer = (uniqueId) => {
    const animationContainer = document.getElementById(`animation-container_${uniqueId}`);
    if (animationContainer) { // Check if the container exists
        lottie.loadAnimation({
            container: animationContainer,
            path: './src/image.json',
            loop: true,
            autoplay: true,
        });
    } else {
        console.error(`Animation container with ID animation-container_${uniqueId} not found.`);
    }
};

async function loadEvents() {
    try {
        const response = await fetchEvents();
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        //   }
        const events = response; // Parse the response as JSON
        const eventGrid = document.getElementById('eventGrid');
        
        events.forEach(event => {

            // Create event card for each event
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            
            // Create and populate the event image
            const eventImage = document.createElement('div');
            const container = document.createElement('div');
            eventImage.classList.add('event-image');
            eventImage.id=`${event["\"Event Id\""]}`;
            container.id=`animation-container_${event["\"Event Id\""]}`;
            eventImage.appendChild(container);
            const imageElement = document.createElement('img');

            imageElement.src = `https://drive.google.com/thumbnail?id=${event["\"Image ID\""]}&sz=w1000`;
                // Load Lottie animation
            loadLottieLibrary(() => loadAnimationAfterContainer(event["\"Event Id\""]));
            loadImage(imageElement)
            .then(()=>{
                container.remove();
                container.style.display='none';
                eventImage.appendChild(imageElement);
            })
            .catch(()=>{
                
            });
            
            // Create and populate the event title
            const eventTitle = document.createElement('h1');
            eventTitle.classList.add('event-title');
            eventTitle.textContent = event["\"Title\""];
            
            // Create and populate the event description
            const eventDescription = document.createElement('p');
            eventDescription.classList.add('event-description');
            eventDescription.textContent = event["Description"];
           // Using a regex to remove any GMT offset from the date strings
           // Check if 'Start Date' exists and is a string before replacing
           event["\"Start Date\""] = formatDate(event["\"Start Date\""]);
           event["\"End Date\""] = formatDate(event["\"End Date\""]);
           
            // Create and populate the event dates
            const eventDates = document.createElement('p');
            eventDates.classList.add('event-dates');
            const eventStartDate = new Date(event["\"Start Date\""]);
            const eventEndDate = new Date(event["\"End Date\""]);
            eventDates.textContent = `From: ${formatDateTime(event["\"Start Date\""])} To: ${formatDateTime(event["\"End Date\""])}`;

            // Create countdown container
            const countdownContainer = document.createElement('div');
            countdownContainer.classList.add('countdown');

            const daysDiv = document.createElement('div');
            const hoursDiv = document.createElement('div');
            const minutesDiv = document.createElement('div');
            const secondsDiv = document.createElement('div');

            countdownContainer.appendChild(daysDiv);
            countdownContainer.appendChild(hoursDiv);
            countdownContainer.appendChild(minutesDiv);
            countdownContainer.appendChild(secondsDiv);

            // Countdown update logic
            const updateCountdown = () => {
                const now = new Date().getTime();
                const timeLeft = eventEndDate - now;
                const timeToStart = eventStartDate - now;

                if (eventStartDate > eventEndDate) {
                    eventCard.style.display = 'none';
                    return;
                }

                if (timeLeft <= 0) {
                    // Event has ended
                    eventDescription.innerHTML = "Event has ended.";
                    countdownContainer.classList.add('hidden');
                    
                    if (eventStartDate === eventEndDate) {
                        eventDates.innerHTML = `Event Date: ${formatTime(eventStartDate)} - ${formatTime(eventEndDate)}`;
                    } else {
                        eventDates.innerHTML = `Held from ${formatDateTime(eventStartDate)} to ${formatDateTime(eventEndDate)}`;
                    }
                    eventDates.classList.remove('hidden');
                    return;
                }

                if (now >= eventStartDate && now <= eventEndDate) {
                    // Event is live
                    eventDescription.innerHTML = `Live Now! Ends at ${formatTime(eventEndDate)}`;
                    eventDates.innerHTML = `Ends on: ${formatDateTime(eventEndDate)}`;
                    eventDates.classList.remove('hidden');
                    countdownContainer.classList.remove('hidden');

                    const totalDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
                    const hours = totalHours % 24;
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    
                    daysDiv.innerHTML = `<span>${totalDays < 10 ? '0' + totalDays : totalDays}</span><br>Days`;
                    hoursDiv.innerHTML = `<span>${hours < 10 ? '0' + hours : hours}</span><br>Hours`;
                    minutesDiv.innerHTML = `<span>${minutes < 10 ? '0' + minutes : minutes}</span><br>Minutes`;
                    secondsDiv.innerHTML = `<span>${seconds < 10 ? '0' + seconds : seconds}</span><br>Seconds`;
                } else if (now < eventStartDate) {
                    // Event is upcoming
                    eventDescription.innerHTML = "Upcoming";
                    countdownContainer.classList.remove('hidden');
                    eventDates.classList.remove('hidden');

                    if (eventStartDate === eventEndDate) {
                        eventDates.innerHTML = `Time: ${formatTime(eventStartDate)} - ${formatTime(eventEndDate)}`;
                    } else {
                        eventDates.innerHTML = `Starts: ${formatDateTime(eventStartDate)}<br>Ends: ${formatDateTime(eventEndDate)}`;
                    }

                    // Countdown for upcoming event
                    const totalDays = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
                    const totalHours = Math.floor((timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeToStart % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeToStart % (1000 * 60)) / 1000);

                    daysDiv.innerHTML = `<span>${totalDays < 10 ? '0' + totalDays : totalDays}</span><br>Days`;
                    hoursDiv.innerHTML = `<span>${totalHours < 10 ? '0' + totalHours : totalHours}</span><br>Hours`;
                    minutesDiv.innerHTML = `<span>${minutes < 10 ? '0' + minutes : minutes}</span><br>Minutes`;
                    secondsDiv.innerHTML = `<span>${seconds < 10 ? '0' + seconds : seconds}</span><br>Seconds`;
                }
            };

            // Initial countdown update and interval
            updateCountdown();
            setInterval(updateCountdown, 1000);

            // Append all elements to the event card
            eventCard.appendChild(eventImage);
            eventCard.appendChild(eventTitle);
            eventCard.appendChild(eventDescription);
            eventCard.appendChild(eventDates);
            eventCard.appendChild(countdownContainer);
            eventCard.onclick = () => {
                window.location.href=`./event/?eventId=${event["\"Event Id\""]}`;
            };
            
            if(event["\"Show\""]){
                if((event["\"Show\""].toLowerCase()==='t'||event["\"Show\""].toLowerCase()==="true")&&(event["\"Title\""]!=="" && event["\"Description\""]!=="" && event["\"Image ID\""]!=="" && event["\"Start Date\""]!=="" && event["\"End Date\""]!=="" && event["\"Event Id\""]!=="" )){
                    // Add the event card to the grid
                    eventGrid.appendChild(eventCard);
                }
            }
        });
        const loadingScreen = document.getElementById('loading-screen');
    
        loadingScreen.style.display = 'none'; // Hide loading screen
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Load events on page load
document.addEventListener('DOMContentLoaded', loadEvents);