// Add index.html and css
const http = require("http");
const {readFileSync} = require("fs");

const homePage = readFileSync('./methods-public/index.html');
const homeCSS = readFileSync('./methods-public/styles.css');

const server = http.createServer((req, res) => {
    const url = req.url;
    // Home
    if (url === '/'){
        res.writeHead(200, {'content-type':'text/html'});
        res.end(homePage);
    }
    // Home/CSS
    else if (url === '/styles.css'){
        res.writeHead(200, {'content-type':'text/css'});
        res.end(homeCSS);
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
