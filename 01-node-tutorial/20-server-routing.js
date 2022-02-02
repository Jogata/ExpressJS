// Send static files from NodeJS server

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path;
    // remove '/' from the start or the end of the path string
    // path = path.replace(/^\/+|\/+$/g, "");
    if (!path) {
        path = "index.html";
    }

    let filepath = __dirname + "/static/" + path;

    fs.readFile(filepath, function (err, content) {
        if (err) {
            res.writeHead(404);
            res.end("<h1>File Not Found<h1/>")
        } else {
            res.setHeader("X-Content-Type-Options", "nosniff");
            switch (path) {
                case "main.css":
                    res.writeHead(200, { "Content-type": "text/css"});
                    break;
                case "main.js":
                    res.writeHead(200, { "Content-type": "application/javascript"});
                    break;
                case "index.html":
                    res.writeHead(200, { "Content-type": "text/html"});
            }
            res.end(content);
        }
    })
})
  

server.listen(5000);
