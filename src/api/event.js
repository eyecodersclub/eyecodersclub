// Replace with your Google Sheet ID

const SHEET_URL = `https://script.google.com/macros/s/AKfycbwhacINqTptjo9YOSQWcY-sv31wn_d_7L-Qz_uxywex673xw3lG3RyF_A15t_AGPR-5iw/exec`;

export async function fetchEvents() {
    try {
        // Fetch the CSV data
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        // Convert CSV to JSON
        // csvText=csvText.replaceAll(" GMT+0530 (India Standard Time)"," ");
        const json = csvToJson(csvText);
        // console.log(json);
        return json
    } catch (error) {
        console.error('Error fetching or processing the CSV:', error);
    }
}


function csvToJson(csv) {
    // Split the CSV into lines
    const lines = csv.split('\n');
    
    // Extract the header (first line)
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Initialize an array to hold the JSON objects
    const jsonArray = [];
    
    // Iterate over the remaining lines
    for (let i = 1; i < lines.length; i++) {
        // Skip empty lines
        if (!lines[i].trim()) continue;

        // Split the line into values, handling quoted values
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === '"') {
                inQuotes = !inQuotes;
            } else if (lines[i][j] === ',' && !inQuotes) {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += lines[i][j];
            }
        }
        values.push(currentValue.trim());
        
        // Create a JSON object for the current line
        const jsonObject = {};
        headers.forEach((header, index) => {
            jsonObject[header] = values[index];
        });
        
        // Add the JSON object to the array
        jsonArray.push(jsonObject);
    }
    
    return jsonArray;
}

