// Send file from NodeJS to the client(browser)

const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    let img = __dirname + "/apod.jpg";

    // Verify that the user has permission to access the file
    // fs.access(img, fs.constants.F_OK, err => {
    //     console.log(`${img} ${err ? "does not exist" : "exist"}`);
    // })

    fs.readFile(img, function (err, content) {
        if (err) {
            res.writeHead(404, { "Content-type": "text/html"});
            res.end("<h1>No such image<h1/>")
        } else {
            res.writeHead(200, { "Content-type": "image/jpg"});
            res.end(content);
        }
    })
})
  

server.listen(5000);
