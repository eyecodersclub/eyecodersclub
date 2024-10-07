  // Function to write and rewrite the text with a typing effect
  function writeText() {
    const text = "Eye Coders Club";
    const textContainer = document.getElementById('eye_coders_club');
    let cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = '_';
    textContainer.innerHTML = ''; // Clear existing content
    textContainer.appendChild(cursorSpan); // Add cursor initially

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        cursorSpan.remove(); // Remove cursor temporarily
        textContainer.textContent += text[i]; // Add next letter
        textContainer.appendChild(cursorSpan); // Re-add cursor at the end
        i++;
      } else {
        clearInterval(interval);
        setTimeout(removeText, 2000); // Wait for 2 seconds before starting to remove text
      }
    }, 200); // Adjust the typing speed as needed
  }

  // Function to remove the text with the cursor at the end
  function removeText() {
    const textContainer = document.getElementById('eye_coders_club');
    const cursorSpan = document.querySelector('.cursor');
    let text = textContainer.textContent;
    let i = text.length;

    const interval = setInterval(() => {
      if (i > 0) {
        text = text.slice(0, i - 1); // Remove last character
        textContainer.textContent = text; // Update text
        textContainer.appendChild(cursorSpan); // Ensure cursor is always at the end
        i--;
      } else {
        clearInterval(interval);
        setTimeout(writeText, 500); // Wait for 1 second before starting to type again
      }
    }, 10); // Adjust the removal speed as needed
  }


  const texts = ["problem solvers", "developers", "hard works","innovators","creators"];
  const staticText = "We are ";
  let currentTextIndex = 0;

  // Function to write and rewrite the text with a typing effect
  function writeS() {
    const text = texts[currentTextIndex];
    const textContainer = document.getElementById('we_are_text');
    let cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.textContent = ' |';
    textContainer.innerHTML = staticText; // Set static text
    textContainer.appendChild(cursorSpan); // Add cursor initially

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        cursorSpan.remove(); // Remove cursor temporarily
        textContainer.textContent = staticText + text.slice(0, i + 1); // Add next letter
        textContainer.appendChild(cursorSpan); // Re-add cursor at the end
        i++;
      } else {
        clearInterval(interval);
        setTimeout(removeS, 1000); // Wait for 2 seconds before starting to remove text
      }
    }, 200); // Adjust the typing speed as needed
  }

  // Function to remove the text with the cursor at the end
  function removeS() {
    const textContainer = document.getElementById('we_are_text');
    const cursorSpan = document.querySelector('.cursor');
    cursorSpan.textContent = ' |';
    let text = textContainer.textContent;
    let i = text.length;

    const interval = setInterval(() => {
      if (i > staticText.length) {
        text = text.slice(0, i - 1); // Remove last character
        textContainer.textContent = text; // Update text
        textContainer.appendChild(cursorSpan); // Ensure cursor is always at the end
        i--;
      } else {
        clearInterval(interval);
        currentTextIndex = (currentTextIndex + 1) % texts.length; // Move to next text
        setTimeout(writeS, 500); // Wait for 0.5 second before starting to type again
      }
    }, 100); // Adjust the removal speed as needed
  }



  // Initial call to start the animation
  writeText();
  writeS();