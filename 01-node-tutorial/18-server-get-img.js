// Get file from another server (NASA API) and save it to my server

const https = require('https');
const Stream = require('stream').Transform;
const fs = require('fs');

https
    .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", resp => {
        let dataJSON = "";
    
        // Get JSON Data from NASA API
        resp.on("data", chunk => {
            dataJSON += chunk;
        })
    
        resp.on("end", () => {
        // Convert JSON Data to JS Object (APOD = Astronomy Picture of the Day)
            let APOD = JSON.parse(dataJSON);
        // Get URL for HD version of APOD
            let HDURL = APOD.hdurl;

            // Get the image from NASA
            https.get(HDURL, res => {
                if (
                    res.statusCode === 200 && 
                    res.headers["content-type"] === "image/jpeg"
                    ) {
                        let img = new Stream();

                        res.on("data", chunk => {
                            img.push(chunk);
                        })
    
                        res.on("end", () => {
                            // Create filepath
                            let filename = __dirname + "/apod.jpg";
                            // Save image on my server
                            fs.writeFileSync(filename, img.read());
                        })
                    }
            })
        })
    })
    .on("error", err => {
        console.log("Error: " + err.message);
    })

// server.listen(5000);

/*
Astronomy Picture of the Day (APOD)
https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY_HERE

PARAMS:
    api_key
    hd [Boolean] default: false
    date [YYY-MM-DD] default: taday

RESPONSE PROPERTIES:
    copyright
    date
    explanation: text that describe The Picture of the Day
    title:       title of the photo
    url:         to Get the SD version of The Picture of the Day
    hdurl:       to Get the HD version of The Picture of the Day
    media_type: 'image'
    service_version: 'v1'
*/
