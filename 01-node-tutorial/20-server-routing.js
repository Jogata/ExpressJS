// Send static files from NodeJS server
// MIME-TYPES recognize Content-type of the file automatically
// https://www.youtube.com/watch?v=gvbVjJnv-b8&list=PLyuRouwmQCjnr-rRrhbPrS4YQ0brDQ-14&index=12

const http = require('http');
const url = require('url');
const fs = require('fs');

// npm install mime-types
const lookup = require("mime-types").lookup;       // GOTO: 27,28

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
            let mime = lookup(path);      // FROM: 7,8
            res.writeHead(200, {"Content-type": mime});
            res.end(content);
        }
    })
})

server.listen(5000);
