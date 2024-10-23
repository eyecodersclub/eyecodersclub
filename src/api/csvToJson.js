export function csvToJson(csv) {
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