// Create HTTP Server with Home, About and 404 page
const http = require("http");

const server = http.createServer((req, res) => {
    const url = req.url;
    // Home
    if (url === '/'){
        res.writeHead(200, {'content-type':'text/html'});
        res.end('<h1>Home</h1>');
    }
    // About
    else if (url === '/about'){
        res.writeHead(200, {'content-type':'text/html'});
        res.end('<h1>About</h1>');
    }
    // 404
    else {
        res.writeHead(404, {'content-type':'text/html'});
        res.end('<h1>Not Found</h1>');
    }
})

server.listen(5000);
