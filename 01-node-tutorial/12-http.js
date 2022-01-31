const http = require('http');

// ====================   v.1   ====================
// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//       res.end('Welcome to our home page');
//     }
//     if (req.url === '/about') {
//       res.end('Here is our short history');
//     }
//     res.end(`
//     <h1>Oops!</h1>
//       <p>We can't find the page you are looking for</p>
//       <a href="/">back home</a>
//     `)

  // ###################################################
  //  IF YOU GET ERRORS WHILE USING ABOVE SETUP,
  // SWITCH TO IF, ELSE IF, ELSE (BELOW)
  // WE COVER THE CAUSE, LATER IN EXPRESS TUTORIAL
  // ###################################################
  
  // if (req.url === '/') {
  //   res.end('Welcome to our home page');
  // } else if (req.url === '/about') {
  //   res.end('Here is our short history');
  // } else {
  //   res.end(`
  //   <h1>Oops!</h1>
  //   <p>We can't seem to find the page you are looking for</p>
  //   <a href="/">back home</a>
  //   `)
  // }
// })

// ====================   v.2   ====================
const server = http.createServer(function(req, res) {
// Create Headers
  res.setHeader('Content-type', 'text/html');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200);
// Create Some Data for Response
  const dataObj = {'id':123, 'name':'Jogata', 'email':'jogata@work.org'};
// the response MUST be a string, so dataObj MUST be converted to string
  const dataString = JSON.stringify(dataObj);
  res.end(dataString);
})

server.listen(5000)

