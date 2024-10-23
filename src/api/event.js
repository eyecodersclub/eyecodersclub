// Replace with your Google Sheet ID
import {csvToJson} from './csvToJson.js';
const SHEET_URL = `https://script.google.com/macros/s/AKfycbwhacINqTptjo9YOSQWcY-sv31wn_d_7L-Qz_uxywex673xw3lG3RyF_A15t_AGPR-5iw/exec`;

export async function fetchEvents() {
    try {
        // Fetch the CSV data
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        // Convert CSV to JSON
        // csvText=csvText.replaceAll(" GMT+0530 (India Standard Time)"," ");
        const json = csvToJson(csvText);
        console.log("featch data successfully");
        return json
    } catch (error) {
        console.error('Error fetching or processing the on data:', error);
    }
}




