const https = require('http');

const baseURL = 'http://sistemjson1.trvrac.com';
const key = 'c8b14555-fc02-436c-8ea6-ecb873fa2f7d';
const user = 'bnawebpl9f03mv1';
const pass = 'jp1rms98pfovt11';

// Test Locations
const locationsUrl = `${baseURL}/JsonLocations.aspx?Key_Hack=${key}&User_Name=${user}&User_Pass=${pass}&Lang=TR`;

http.get(locationsUrl, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("=== LOCATIONS ===");
    console.log(data.substring(0, 500));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
