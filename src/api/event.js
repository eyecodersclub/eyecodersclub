// Replace with your Google Sheet ID
import {csvToJson} from './csvToJson.js';
import { BASE_URL, API_KEY} from "../js/config.js";
const SHEET_URL = `${BASE_URL}/${API_KEY}/exec?action=getEventData`;

export async function fetchEvents() {
    try {
        // Fetch the CSV data
        const response = await fetch(SHEET_URL,{
            method:'GET'
        });
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




